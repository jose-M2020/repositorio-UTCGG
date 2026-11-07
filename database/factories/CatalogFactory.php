<?php

namespace Database\Factories;

use App\Models\Catalog;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Catalog>
 */
class CatalogFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'type' => fake()->randomElement([
                Catalog::TYPE_CAREER,
                Catalog::TYPE_PROJECT,
                Catalog::TYPE_ACADEMIC_DEGREE,
            ]),
            'code' => strtoupper(fake()->bothify('??##')),
            'name' => fake()->words(3, true),
            'sort_order' => fake()->numberBetween(1, 20),
            'is_active' => true,
            'meta' => null,
        ];
    }
}
