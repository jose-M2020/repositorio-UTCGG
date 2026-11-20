<?php

namespace App\Services\Advisors;

use App\Enums\UserAccountStatus;
use App\Enums\UserType;
use App\Models\AdvisorPeriodCapacity;
use App\Models\ProjectPeriod;
use App\Models\Repository;
use App\Models\User;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Support\Collection;

class EligibleAdvisorsQuery
{
    public function __construct(
        private readonly AdvisorCapacityResolver $capacityResolver,
    ) {}

    /**
     * @return Collection<int, array{
     *     user: User,
     *     load: int,
     *     capacity: int,
     *     ratio: float,
     *     is_available: bool
     * }>
     */
    public function forRepository(Repository $repository, bool $requireCapacity = true): Collection
    {
        $period = $repository->period;
        $careerId = $repository->career_id;

        if ($period === null || $careerId === null) {
            return collect();
        }

        return $this->forPeriodAndCareer($period, (int) $careerId, $requireCapacity);
    }

    /**
     * @param  list<int>|null  $careerIds
     * @return Collection<int, array{
     *     user: User,
     *     load: int,
     *     capacity: int,
     *     ratio: float,
     *     is_available: bool,
     *     career_ids: list<int>
     * }>
     */
    public function forPeriod(ProjectPeriod $period, ?array $careerIds = null, bool $requireCapacity = true): Collection
    {
        $advisors = $this->baseQuery($period, $careerIds)->get();

        return $this->enrich($period, $advisors, $requireCapacity);
    }

    /**
     * @return Collection<int, array{
     *     user: User,
     *     load: int,
     *     capacity: int,
     *     ratio: float,
     *     is_available: bool,
     *     career_ids: list<int>
     * }>
     */
    public function forPeriodAndCareer(ProjectPeriod $period, int $careerId, bool $requireCapacity = true): Collection
    {
        return $this->forPeriod($period, [$careerId], $requireCapacity);
    }

    /**
     * @param  list<int>|null  $careerIds
     */
    private function baseQuery(ProjectPeriod $period, ?array $careerIds = null): Builder
    {
        return User::query()
            ->where('user_type', UserType::Workforce->value)
            ->where('status', UserAccountStatus::Active->value)
            ->whereHas('teacherProfile', fn (Builder $profile): Builder => $profile->where('can_be_advisor', true))
            ->whereHas('careerAssignments', function (Builder $assignments) use ($period, $careerIds): void {
                $assignments
                    ->whereDate('starts_at', '<=', $period->ends_at->toDateString())
                    ->where(function (Builder $builder) use ($period): void {
                        $builder
                            ->whereNull('ends_at')
                            ->orWhereDate('ends_at', '>=', $period->starts_at->toDateString());
                    });

                if ($careerIds !== null) {
                    $assignments->whereIn('career_id', $careerIds);
                }
            })
            ->with([
                'teacherProfile',
                'careerAssignments' => function ($query) use ($period, $careerIds): void {
                    $query
                        ->whereDate('starts_at', '<=', $period->ends_at->toDateString())
                        ->where(function ($builder) use ($period): void {
                            $builder
                                ->whereNull('ends_at')
                                ->orWhereDate('ends_at', '>=', $period->starts_at->toDateString());
                        });

                    if ($careerIds !== null) {
                        $query->whereIn('career_id', $careerIds);
                    }
                },
            ])
            ->orderBy('id');
    }

    /**
     * @param  Collection<int, User>  $advisors
     * @return Collection<int, array{
     *     user: User,
     *     load: int,
     *     capacity: int,
     *     ratio: float,
     *     is_available: bool,
     *     career_ids: list<int>
     * }>
     */
    private function enrich(ProjectPeriod $period, Collection $advisors, bool $requireCapacity): Collection
    {
        $capacities = AdvisorPeriodCapacity::query()
            ->where('project_period_id', $period->id)
            ->whereIn('user_id', $advisors->pluck('id'))
            ->get()
            ->keyBy('user_id');

        return $advisors
            ->map(function (User $advisor) use ($period, $capacities, $requireCapacity): ?array {
                /** @var AdvisorPeriodCapacity|null $capacity */
                $capacity = $capacities->get($advisor->id);
                $isAvailable = $capacity === null || $capacity->is_available;
                $effective = $this->capacityResolver->effectiveCapacity($period, $capacity);
                $load = $this->capacityResolver->currentLoad((int) $advisor->id, (int) $period->id);

                if (! $isAvailable) {
                    return null;
                }

                if ($requireCapacity && $load >= $effective) {
                    return null;
                }

                return [
                    'user' => $advisor,
                    'load' => $load,
                    'capacity' => $effective,
                    'ratio' => $this->capacityResolver->loadRatio($load, $effective),
                    'is_available' => $isAvailable,
                    'career_ids' => $advisor->careerAssignments
                        ->pluck('career_id')
                        ->map(fn ($id): int => (int) $id)
                        ->unique()
                        ->values()
                        ->all(),
                ];
            })
            ->filter()
            ->sortBy([
                ['ratio', 'asc'],
                ['load', 'asc'],
                fn (array $row): int => (int) $row['user']->id,
            ])
            ->values();
    }
}
