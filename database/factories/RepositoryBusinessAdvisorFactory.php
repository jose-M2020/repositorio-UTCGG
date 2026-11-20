<?php

namespace Database\Factories;

use App\Enums\BusinessAdvisorAcceptanceStatus;
use App\Models\Company;
use App\Models\Repository;
use App\Models\RepositoryBusinessAdvisor;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<RepositoryBusinessAdvisor>
 */
class RepositoryBusinessAdvisorFactory extends Factory
{
    protected $model = RepositoryBusinessAdvisor::class;

    /**
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'repository_id' => Repository::factory(),
            'company_id' => Company::factory(),
            'first_name' => fake()->firstName(),
            'last_name' => fake()->lastName(),
            'second_last_name' => fake()->optional()->lastName(),
            'email' => fake()->optional()->safeEmail(),
            'phone' => fake()->optional()->numerify('##########'),
            'job_title' => fake()->optional()->jobTitle(),
            'department' => fake()->optional()->word(),
            'is_primary' => true,
            'acceptance_status' => BusinessAdvisorAcceptanceStatus::Confirmed->value,
            'document_path' => null,
            'notes' => null,
            'created_by' => null,
            'assigned_at' => now(),
            'released_at' => null,
        ];
    }
}
