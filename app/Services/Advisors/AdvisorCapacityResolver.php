<?php

namespace App\Services\Advisors;

use App\Models\AdvisorPeriodCapacity;
use App\Models\ProjectPeriod;
use App\Models\RepositoryAdvisor;
use App\Models\User;

class AdvisorCapacityResolver
{
    public function effectiveCapacity(ProjectPeriod $period, ?AdvisorPeriodCapacity $capacity): int
    {
        if ($capacity !== null && ! $capacity->is_available) {
            return 0;
        }

        if ($capacity?->max_projects !== null) {
            return (int) $capacity->max_projects;
        }

        return $period->defaultAdvisorCapacity();
    }

    public function effectiveCapacityForUser(ProjectPeriod $period, User $advisor): int
    {
        $capacity = AdvisorPeriodCapacity::query()
            ->where('project_period_id', $period->id)
            ->where('user_id', $advisor->id)
            ->first();

        return $this->effectiveCapacity($period, $capacity);
    }

    public function currentLoad(int $advisorId, int $periodId): int
    {
        return RepositoryAdvisor::query()
            ->where('user_id', $advisorId)
            ->where('project_period_id', $periodId)
            ->whereNull('released_at')
            ->count();
    }

    public function loadRatio(int $load, int $capacity): float
    {
        if ($capacity <= 0) {
            return PHP_FLOAT_MAX;
        }

        return $load / $capacity;
    }
}
