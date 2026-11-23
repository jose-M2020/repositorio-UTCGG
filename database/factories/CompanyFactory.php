<?php

namespace Database\Factories;

use App\Enums\CatalogReviewStatus;
use App\Enums\CatalogSource;
use App\Models\Company;
use App\Services\BusinessAdvisors\NameNormalizer;
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
        $name = fake()->company();

        return [
            'name' => $name,
            'name_normalized' => NameNormalizer::normalizeCompanyName($name),
            'rfc' => null,
            'sector' => fake()->optional()->word(),
            'phone' => fake()->optional()->numerify('##########'),
            'email' => fake()->optional()->companyEmail(),
            'address_id' => null,
            'notes' => null,
            'status' => CatalogReviewStatus::PendingReview->value,
            'source' => CatalogSource::User->value,
            'merged_into_id' => null,
            'created_by' => null,
            'verified_by' => null,
            'verified_at' => null,
        ];
    }

    public function withAddress(): static
    {
        return $this->state(fn (): array => [
            'address_id' => \App\Models\Address::factory(),
        ]);
    }

    public function verified(): static
    {
        return $this->state(fn (): array => [
            'status' => CatalogReviewStatus::Verified->value,
            'verified_at' => now(),
        ]);
    }
}
