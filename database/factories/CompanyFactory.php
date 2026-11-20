<?php

namespace Database\Factories;

use App\Models\Company;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Company>
 */
class CompanyFactory extends Factory
{
    protected $model = Company::class;

    /**
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name' => fake()->company(),
            'rfc' => null,
            'sector' => fake()->optional()->word(),
            'phone' => fake()->optional()->numerify('##########'),
            'email' => fake()->optional()->companyEmail(),
            'address_id' => null,
            'notes' => null,
        ];
    }

    public function withAddress(): static
    {
        return $this->state(fn (): array => [
            'address_id' => \App\Models\Address::factory(),
        ]);
    }
}
