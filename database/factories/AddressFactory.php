<?php

namespace Database\Factories;

use App\Models\Address;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Address>
 */
class AddressFactory extends Factory
{
    protected $model = Address::class;

    /**
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'street_line' => fake()->streetAddress(),
            'street_line_2' => null,
            'neighborhood' => fake()->optional()->citySuffix(),
            'city' => fake()->city(),
            'state' => fake()->state(),
            'postal_code' => fake()->postcode(),
            'country' => 'MX',
            'references' => null,
        ];
    }
}
