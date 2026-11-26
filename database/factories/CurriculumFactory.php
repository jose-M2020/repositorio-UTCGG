<?php

namespace Database\Factories;

use App\Models\Career;
use App\Models\Curriculum;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Curriculum>
 */
class CurriculumFactory extends Factory
{
    protected $model = Curriculum::class;

    public function definition(): array
    {
        return [
            'career_id' => Career::factory(),
            'name' => 'Plan '.fake()->unique()->numberBetween(2018, 2030),
            'applies_from' => fake()->optional()->date(),
            'is_active' => true,
        ];
    }
}
