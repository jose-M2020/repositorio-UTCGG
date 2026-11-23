<?php

namespace Database\Factories;

use App\Enums\BusinessAdvisorAcceptanceStatus;
use App\Models\BusinessAdvisor;
use App\Models\BusinessAdvisorAffiliation;
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
        $advisor = BusinessAdvisor::factory()->create();
        $company = Company::factory()->create();
        $affiliation = BusinessAdvisorAffiliation::factory()->create([
            'business_advisor_id' => $advisor->id,
            'company_id' => $company->id,
        ]);

        $snapshot = [
            'first_name' => $advisor->first_name,
            'last_name' => $advisor->last_name,
            'second_last_name' => $advisor->second_last_name,
            'company' => [
                'id' => $company->id,
                'name' => $company->name,
                'rfc' => $company->rfc,
            ],
            'job_title' => $affiliation->job_title,
            'department' => $affiliation->department,
            'email' => $affiliation->email,
            'phone' => $affiliation->phone,
            'captured_at' => now()->toIso8601String(),
        ];

        return [
            'repository_id' => Repository::factory(),
            'business_advisor_id' => $advisor->id,
            'business_advisor_affiliation_id' => $affiliation->id,
            'snapshot' => $snapshot,
            'company_id' => $company->id,
            'first_name' => $advisor->first_name,
            'last_name' => $advisor->last_name,
            'second_last_name' => $advisor->second_last_name,
            'email' => $affiliation->email,
            'phone' => $affiliation->phone,
            'job_title' => $affiliation->job_title,
            'department' => $affiliation->department,
            'is_primary' => true,
            'acceptance_status' => BusinessAdvisorAcceptanceStatus::Pending->value,
            'document_path' => null,
            'notes' => null,
            'created_by' => null,
            'assigned_at' => now(),
            'released_at' => null,
        ];
    }
}
