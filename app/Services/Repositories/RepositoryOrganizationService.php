<?php

namespace App\Services\Repositories;

use App\Models\Repository;
use App\Models\RepositoryBusinessAdvisor;
use App\Models\User;
use App\Services\BusinessAdvisors\AttachBusinessAdvisor;
use App\Services\BusinessAdvisors\ReleaseBusinessAdvisor;
use Illuminate\Support\Facades\DB;

class RepositoryOrganizationService
{
    public function __construct(
        private readonly AttachBusinessAdvisor $attachBusinessAdvisor,
        private readonly ReleaseBusinessAdvisor $releaseBusinessAdvisor,
    ) {}

    /**
     * @param  array{
     *     name?: string|null,
     *     rfc?: string|null,
     *     sector?: string|null,
     *     phone?: string|null,
     *     email?: string|null,
     *     notes?: string|null,
     *     address?: array<string, mixed>|null,
     *     existing_company_id?: int|null
     * }|null  $companyData
     * @param  array{
     *     first_name?: string|null,
     *     last_name?: string|null,
     *     second_last_name?: string|null,
     *     email?: string|null,
     *     phone?: string|null,
     *     job_title?: string|null,
     *     department?: string|null,
     *     notes?: string|null,
     *     existing_affiliation_id?: int|null,
     *     existing_advisor_id?: int|null
     * }|null  $advisorData
     */
    public function sync(
        Repository $repository,
        ?array $companyData,
        ?array $advisorData,
        ?User $actor = null,
    ): void {
        if ($actor === null) {
            return;
        }

        DB::transaction(function () use ($repository, $companyData, $advisorData, $actor): void {
            $firstName = trim((string) ($advisorData['first_name'] ?? ''));
            $lastName = trim((string) ($advisorData['last_name'] ?? ''));
            $existingAffiliationId = $advisorData['existing_affiliation_id'] ?? null;
            $existingAdvisorId = $advisorData['existing_advisor_id'] ?? null;

            $hasAdvisor = $existingAffiliationId
                || $existingAdvisorId
                || ($firstName !== '' && $lastName !== '');

            $activePrimary = RepositoryBusinessAdvisor::query()
                ->where('repository_id', $repository->id)
                ->active()
                ->primary()
                ->lockForUpdate()
                ->first();

            if (! $hasAdvisor) {
                if ($activePrimary !== null) {
                    $this->releaseBusinessAdvisor->handle($activePrimary, $actor);
                }

                $companyName = trim((string) ($companyData['name'] ?? ''));
                if ($companyName === '' && empty($companyData['existing_company_id'])) {
                    $repository->update(['company_id' => null]);
                }

                return;
            }

            if ($activePrimary !== null) {
                $this->releaseBusinessAdvisor->handle($activePrimary, $actor);
            }

            $this->attachBusinessAdvisor->handle($repository, $actor, [
                'existing_affiliation_id' => $existingAffiliationId,
                'existing_advisor_id' => $existingAdvisorId,
                'existing_company_id' => $companyData['existing_company_id'] ?? null,
                'advisor' => [
                    'first_name' => $firstName,
                    'last_name' => $lastName,
                    'second_last_name' => $advisorData['second_last_name'] ?? null,
                ],
                'company' => $companyData,
                'affiliation' => [
                    'job_title' => $advisorData['job_title'] ?? null,
                    'department' => $advisorData['department'] ?? null,
                    'email' => $advisorData['email'] ?? null,
                    'phone' => $advisorData['phone'] ?? null,
                ],
                'notes' => $advisorData['notes'] ?? null,
                'is_primary' => true,
                'send_confirmation' => false,
            ]);
        });
    }
}
