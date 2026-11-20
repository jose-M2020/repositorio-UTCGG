<?php

namespace Database\Factories;

use App\Models\AdvisorPeriodCapacity;
use App\Models\ProjectPeriod;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<AdvisorPeriodCapacity>
 */
class AdvisorPeriodCapacityFactory extends Factory
{
    protected $model = AdvisorPeriodCapacity::class;

    /**
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'project_period_id' => ProjectPeriod::factory(),
            'user_id' => User::factory()->teacher(),
            'max_projects' => null,
            'is_available' => true,
            'notes' => null,
        ];
    }

    public function unavailable(): static
    {
        return $this->state(fn (): array => [
            'is_available' => false,
        ]);
    }
}
