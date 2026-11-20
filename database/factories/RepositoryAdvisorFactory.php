<?php

namespace Database\Factories;

use App\Enums\AdvisorRole;
use App\Models\ProjectPeriod;
use App\Models\Repository;
use App\Models\RepositoryAdvisor;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<RepositoryAdvisor>
 */
class RepositoryAdvisorFactory extends Factory
{
    protected $model = RepositoryAdvisor::class;

    /**
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'repository_id' => Repository::factory(),
            'user_id' => User::factory()->teacher(),
            'project_period_id' => ProjectPeriod::factory(),
            'role' => AdvisorRole::Primary->value,
            'assigned_by' => null,
            'assigned_at' => now(),
            'released_at' => null,
            'override_reason' => null,
        ];
    }

    public function released(): static
    {
        return $this->state(fn (): array => [
            'released_at' => now(),
        ]);
    }
}
