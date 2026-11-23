<?php

namespace Database\Factories;

use App\Enums\CatalogReviewStatus;
use App\Enums\CatalogSource;
use App\Models\BusinessAdvisor;
use App\Services\BusinessAdvisors\NameNormalizer;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<BusinessAdvisor>
 */
class BusinessAdvisorFactory extends Factory
{
    protected $model = BusinessAdvisor::class;

    /**
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $firstName = fake()->firstName();
        $lastName = fake()->lastName();
        $secondLastName = fake()->optional()->lastName();

        return [
            'first_name' => $firstName,
            'last_name' => $lastName,
            'second_last_name' => $secondLastName,
            'name_normalized' => NameNormalizer::normalizePersonName($firstName, $lastName, $secondLastName),
            'status' => CatalogReviewStatus::PendingReview->value,
            'source' => CatalogSource::User->value,
            'merged_into_id' => null,
            'created_by' => null,
            'verified_by' => null,
            'verified_at' => null,
        ];
    }

    public function verified(): static
    {
        return $this->state(fn (): array => [
            'status' => CatalogReviewStatus::Verified->value,
            'verified_at' => now(),
        ]);
    }
}
