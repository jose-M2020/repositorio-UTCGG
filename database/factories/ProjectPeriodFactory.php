<?php

namespace Database\Factories;

use App\Enums\ProjectPeriodStatus;
use App\Models\ProjectPeriod;
use App\Models\ProjectType;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<ProjectPeriod>
 */
class ProjectPeriodFactory extends Factory
{
    protected $model = ProjectPeriod::class;

    /**
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $startsAt = now()->startOfMonth();

        return [
            'project_type_id' => ProjectType::factory(),
            'name' => fake()->unique()->sentence(3),
            'starts_at' => $startsAt->toDateString(),
            'ends_at' => $startsAt->copy()->addMonths(4)->toDateString(),
            'status' => ProjectPeriodStatus::Draft->value,
            'advisor_default_capacity' => null,
            'created_by' => null,
        ];
    }

    public function open(): static
    {
        return $this->state(fn (): array => [
            'status' => ProjectPeriodStatus::Open->value,
        ]);
    }

    public function closed(): static
    {
        return $this->state(fn (): array => [
            'status' => ProjectPeriodStatus::Closed->value,
        ]);
    }
}
