<?php

namespace App\Services\Advisors;

use App\Enums\AdvisorRole;
use App\Models\ProjectPeriod;
use App\Models\Repository;
use App\Models\User;
use App\Support\Permissions;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\DB;
use Throwable;

class AdvisorDistributionService
{
    public function __construct(
        private readonly EligibleAdvisorsQuery $eligibleAdvisorsQuery,
        private readonly AdvisorAssignmentService $assignmentService,
    ) {}

    /**
     * @param  list<int>|null  $careerIds
     * @return Collection<int, array{
     *     repository_id: int,
     *     advisor_id: int|null,
     *     career_id: int|null,
     *     uncovered: bool
     * }>
     */
    public function propose(ProjectPeriod $period, User $actor, ?array $careerIds = null): Collection
    {
        $scopedCareerIds = $this->scopedCareerIds($actor, $careerIds);

        $pending = Repository::query()
            ->where('project_period_id', $period->id)
            ->when(
                $scopedCareerIds !== null,
                fn ($query) => $query->whereIn('career_id', $scopedCareerIds),
            )
            ->whereDoesntHave('advisors', function ($query): void {
                $query
                    ->where('role', AdvisorRole::Primary->value)
                    ->whereNull('released_at');
            })
            ->orderBy('career_id')
            ->orderBy('id')
            ->get(['id', 'career_id']);

        $eligible = $this->eligibleAdvisorsQuery->forPeriod($period, $scopedCareerIds, requireCapacity: false);

        /** @var array<int, array{load: int, capacity: int, career_ids: list<int>}> $simulated */
        $simulated = [];
        foreach ($eligible as $row) {
            $simulated[(int) $row['user']->id] = [
                'load' => (int) $row['load'],
                'capacity' => (int) $row['capacity'],
                'career_ids' => $row['career_ids'],
            ];
        }

        $byCareer = $pending->groupBy(fn (Repository $repo): int => (int) ($repo->career_id ?? 0));

        $careerOrder = $byCareer
            ->map(function (Collection $repos, int $careerId) use ($simulated): array {
                $freeCapacity = collect($simulated)
                    ->filter(fn (array $advisor): bool => in_array($careerId, $advisor['career_ids'], true))
                    ->sum(fn (array $advisor): int => max(0, $advisor['capacity'] - $advisor['load']));

                $demand = $repos->count();
                $scarcity = $freeCapacity > 0 ? $demand / $freeCapacity : PHP_FLOAT_MAX;

                return [
                    'career_id' => $careerId,
                    'scarcity' => $scarcity,
                ];
            })
            ->sortByDesc('scarcity')
            ->pluck('career_id')
            ->all();

        $proposal = collect();

        foreach ($careerOrder as $careerId) {
            /** @var Collection<int, Repository> $repos */
            $repos = $byCareer->get($careerId, collect())->sortBy('id');

            foreach ($repos as $repository) {
                $candidates = collect($simulated)
                    ->filter(function (array $advisor, int $advisorId) use ($careerId): bool {
                        return in_array($careerId, $advisor['career_ids'], true)
                            && $advisor['load'] < $advisor['capacity'];
                    })
                    ->map(function (array $advisor, int $advisorId): array {
                        $ratio = $advisor['capacity'] > 0
                            ? ($advisor['load'] + 1) / $advisor['capacity']
                            : PHP_FLOAT_MAX;

                        return [
                            'advisor_id' => $advisorId,
                            'ratio' => $ratio,
                            'load' => $advisor['load'],
                        ];
                    })
                    ->sortBy([
                        ['ratio', 'asc'],
                        ['load', 'asc'],
                        ['advisor_id', 'asc'],
                    ])
                    ->values();

                $chosen = $candidates->first();

                if ($chosen === null) {
                    $proposal->push([
                        'repository_id' => (int) $repository->id,
                        'advisor_id' => null,
                        'career_id' => $repository->career_id !== null ? (int) $repository->career_id : null,
                        'uncovered' => true,
                    ]);

                    continue;
                }

                $advisorId = (int) $chosen['advisor_id'];
                $simulated[$advisorId]['load']++;

                $proposal->push([
                    'repository_id' => (int) $repository->id,
                    'advisor_id' => $advisorId,
                    'career_id' => $repository->career_id !== null ? (int) $repository->career_id : null,
                    'uncovered' => false,
                ]);
            }
        }

        return $proposal->values();
    }

    /**
     * @param  Collection<int, array{repository_id: int, advisor_id: int|null, uncovered?: bool}>  $proposal
     * @return array{applied: list<int>, failed: list<array{repository_id: int, message: string}>}
     */
    public function apply(Collection $proposal, User $actor): array
    {
        $applied = [];
        $failed = [];

        DB::transaction(function () use ($proposal, $actor, &$applied, &$failed): void {
            foreach ($proposal as $row) {
                $repositoryId = (int) ($row['repository_id'] ?? 0);
                $advisorId = isset($row['advisor_id']) ? (int) $row['advisor_id'] : null;

                if ($advisorId === null || ($row['uncovered'] ?? false)) {
                    continue;
                }

                try {
                    $repository = Repository::query()->findOrFail($repositoryId);
                    $advisor = User::query()->findOrFail($advisorId);
                    $this->assignmentService->assign($repository, $advisor, $actor);
                    $applied[] = $repositoryId;
                } catch (Throwable $exception) {
                    $failed[] = [
                        'repository_id' => $repositoryId,
                        'message' => $exception->getMessage(),
                    ];
                }
            }
        });

        return [
            'applied' => $applied,
            'failed' => $failed,
        ];
    }

    /**
     * @param  list<int>|null  $careerIds
     * @return list<int>|null
     */
    private function scopedCareerIds(User $actor, ?array $careerIds): ?array
    {
        if ($actor->can(Permissions::USERS_CAREER_ANY)) {
            return $careerIds;
        }

        $managed = $actor->managedCareerIds()->all();

        if ($careerIds === null) {
            return $managed;
        }

        return array_values(array_intersect($managed, $careerIds));
    }
}
