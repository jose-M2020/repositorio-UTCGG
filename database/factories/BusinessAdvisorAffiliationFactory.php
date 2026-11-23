<?php

namespace Database\Factories;

use App\Enums\CatalogReviewStatus;
use App\Enums\CatalogSource;
use App\Models\BusinessAdvisor;
use App\Models\BusinessAdvisorAffiliation;
use App\Models\Company;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<BusinessAdvisorAffiliation>
 */
class BusinessAdvisorAffiliationFactory extends Factory
{
    protected $model = BusinessAdvisorAffiliation::class;

    /**
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'business_advisor_id' => BusinessAdvisor::factory(),
            'company_id' => Company::factory(),
            'job_title' => fake()->optional()->jobTitle(),
            'department' => fake()->optional()->word(),
            'email' => fake()->unique()->safeEmail(),
            'phone' => fake()->optional()->numerify('##########'),
            'starts_at' => now()->toDateString(),
            'ends_at' => null,
            'status' => CatalogReviewStatus::PendingReview->value,
            'source' => CatalogSource::User->value,
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
