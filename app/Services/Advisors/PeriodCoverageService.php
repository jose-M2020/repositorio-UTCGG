<?php

namespace App\Services\Advisors;

use App\Enums\AdvisorRole;
use App\Enums\ParticipantStatus;
use App\Models\Career;
use App\Models\ProjectPeriod;
use App\Models\Repository;
use App\Models\RepositoryAdvisor;

class PeriodCoverageService
{
    public function __construct(
        private readonly EligibleAdvisorsQuery $eligibleAdvisorsQuery,
        private readonly AdvisorCapacityResolver $capacityResolver,
    ) {}

    /**
     * @return array{
     *     by_career: list<array<string, mixed>>,
     *     by_advisor: list<array<string, mixed>>,
     *     suggested_capacity: int,
     *     alerts: list<string>
     * }
     */
    public function summarize(ProjectPeriod $period): array
    {
        $period->loadMissing('projectType');
        $isTeamProject = (bool) $period->projectType?->is_team_project;

        $participants = $period->participants()
            ->where('status', ParticipantStatus::Enrolled->value)
            ->get(['id', 'career_id', 'user_id']);

        $repositories = Repository::query()
            ->where('project_period_id', $period->id)
            ->get(['id', 'career_id']);

        $assignments = RepositoryAdvisor::query()
            ->where('project_period_id', $period->id)
            ->where('role', AdvisorRole::Primary->value)
            ->whereNull('released_at')
            ->get(['id', 'repository_id', 'user_id', 'override_reason']);

        $reposWithAdvisor = $assignments->pluck('repository_id')->unique();

        $careerIds = $participants->pluck('career_id')
            ->merge($repositories->pluck('career_id'))
            ->filter()
            ->unique()
            ->values();

        $careers = Career::query()->whereIn('id', $careerIds)->get()->keyBy('id');

        $eligible = $this->eligibleAdvisorsQuery->forPeriod($period, null, requireCapacity: false);

        $byCareer = [];
        foreach ($careerIds as $careerId) {
            $careerId = (int) $careerId;
            $demand = $isTeamProject
                ? $repositories->where('career_id', $careerId)->count()
                : $participants->where('career_id', $careerId)->count();

            $created = $repositories->where('career_id', $careerId)->count();
            $withAdvisor = $repositories
                ->where('career_id', $careerId)
                ->filter(fn (Repository $repo): bool => $reposWithAdvisor->contains($repo->id))
                ->count();

            $byCareer[] = [
                'career_id' => $careerId,
                'career_name' => $careers->get($careerId)?->name ?? (string) $careerId,
                'demand' => $demand,
                'repositories' => $created,
                'with_advisor' => $withAdvisor,
                'without_advisor' => max(0, $created - $withAdvisor),
                'eligible_advisors' => $eligible
                    ->filter(fn (array $row): bool => in_array($careerId, $row['career_ids'], true))
                    ->count(),
            ];
        }

        $byAdvisor = $eligible->map(function (array $row) use ($assignments): array {
            $user = $row['user'];
            $overrideCount = $assignments
                ->where('user_id', $user->id)
                ->filter(fn (RepositoryAdvisor $a): bool => filled($a->override_reason))
                ->count();

            return [
                'user_id' => (int) $user->id,
                'name' => $user->fullName(),
                'capacity' => (int) $row['capacity'],
                'load' => (int) $row['load'],
                'ratio' => (float) $row['ratio'],
                'is_available' => (bool) $row['is_available'],
                'career_ids' => $row['career_ids'],
                'override_count' => $overrideCount,
            ];
        })->values()->all();

        $totalDemand = collect($byCareer)->sum('demand');
        $distinctAdvisors = $eligible->count();
        $suggestedCapacity = $distinctAdvisors > 0
            ? (int) ceil($totalDemand / $distinctAdvisors)
            : (int) config('projects.default_advisor_capacity');

        $alerts = [];
        $totalCapacity = $eligible->sum(fn (array $row): int => (int) $row['capacity']);
        if ($totalCapacity < $totalDemand) {
            $alerts[] = 'La capacidad total de asesores es menor que la demanda del periodo.';
        }

        foreach ($byCareer as $career) {
            if ($career['eligible_advisors'] === 0 && $career['demand'] > 0) {
                $alerts[] = sprintf('La carrera %s no tiene asesores elegibles.', $career['career_name']);
            }
        }

        $overridden = collect($byAdvisor)->sum('override_count');
        if ($overridden > 0) {
            $alerts[] = sprintf('Hay %d asignaciones con excepcion de capacidad.', $overridden);
        }

        $withoutAdvisor = collect($byCareer)->sum('without_advisor');
        if ($withoutAdvisor > 0) {
            $alerts[] = sprintf('Hay %d repositorios sin asesor academico.', $withoutAdvisor);
        }

        return [
            'by_career' => $byCareer,
            'by_advisor' => $byAdvisor,
            'suggested_capacity' => $suggestedCapacity,
            'alerts' => $alerts,
        ];
    }
}
