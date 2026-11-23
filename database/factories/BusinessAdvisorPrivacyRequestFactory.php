<?php

namespace Database\Factories;

use App\Enums\PrivacyRequestStatus;
use App\Enums\PrivacyRequestType;
use App\Models\BusinessAdvisor;
use App\Models\BusinessAdvisorPrivacyRequest;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<BusinessAdvisorPrivacyRequest>
 */
class BusinessAdvisorPrivacyRequestFactory extends Factory
{
    protected $model = BusinessAdvisorPrivacyRequest::class;

    /**
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'business_advisor_id' => BusinessAdvisor::factory(),
            'type' => PrivacyRequestType::Access->value,
            'message' => fake()->optional()->sentence(),
            'status' => PrivacyRequestStatus::Open->value,
            'handled_by' => null,
            'handled_at' => null,
        ];
    }
}
