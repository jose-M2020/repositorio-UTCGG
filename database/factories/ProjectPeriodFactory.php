<?php

namespace Database\Factories;

use App\Enums\ProjectPeriodStatus;
use App\Models\AcademicPeriod;
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
            'academic_period_id' => AcademicPeriod::factory()->state([
                'starts_at' => $startsAt->toDateString(),
                'ends_at' => $startsAt->copy()->addMonths(4)->toDateString(),
            ]),
            'name' => fake()->unique()->sentence(3),
            'starts_at' => $startsAt->toDateString(),
            'ends_at' => $startsAt->copy()->addMonths(4)->toDateString(),
            'enrollment_opens_at' => null,
            'enrollment_closes_at' => null,
            'status' => ProjectPeriodStatus::Draft->value,
            'advisor_default_capacity' => null,
            'created_by' => null,
        ];
    }

    public function forAcademicPeriod(AcademicPeriod $academicPeriod): static
    {
        return $this->state(fn (): array => [
            'academic_period_id' => $academicPeriod->id,
            'starts_at' => null,
            'ends_at' => null,
        ]);
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