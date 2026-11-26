<?php

namespace Database\Factories;

use App\Enums\AcademicPeriodStatus;
use App\Models\AcademicPeriod;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<AcademicPeriod>
 */
class AcademicPeriodFactory extends Factory
{
    protected $model = AcademicPeriod::class;

    public function definition(): array
    {
        $year = fake()->unique()->numberBetween(2018, 2035);
        $n = fake()->numberBetween(1, 3);
        $dates = AcademicPeriod::defaultDateRange($year, $n);

        return [
            'code' => AcademicPeriod::makeCode($year, $n),
            'name' => AcademicPeriod::defaultName($year, $n),
            'sequence' => fake()->unique()->numberBetween(1, 500),
            'starts_at' => $dates['starts_at'],
            'ends_at' => $dates['ends_at'],
            'status' => AcademicPeriodStatus::Planned,
        ];
    }

    public function current(): static
    {
        return $this->state(fn (): array => [
            'status' => AcademicPeriodStatus::Current,
        ]);
    }

    public function closed(): static
    {
        return $this->state(fn (): array => [
            'status' => AcademicPeriodStatus::Closed,
        ]);
    }

    public function forSlot(int $year, int $n, int $sequence): static
    {
        $dates = AcademicPeriod::defaultDateRange($year, $n);

        return $this->state(fn (): array => [
            'code' => AcademicPeriod::makeCode($year, $n),
            'name' => AcademicPeriod::defaultName($year, $n),
            'sequence' => $sequence,
            'starts_at' => $dates['starts_at'],
            'ends_at' => $dates['ends_at'],
        ]);
    }
}
