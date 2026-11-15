<?php

namespace Database\Factories;

use App\Enums\CareerPosition;
use App\Models\Career;
use App\Models\CareerAssignment;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<CareerAssignment>
 */
class CareerAssignmentFactory extends Factory
{
    protected $model = CareerAssignment::class;

    /**
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'user_id' => User::factory(),
            'career_id' => Career::factory(),
            'position' => CareerPosition::Teacher,
            'starts_at' => now()->toDateString(),
            'ends_at' => null,
            'created_by' => null,
        ];
    }
}
