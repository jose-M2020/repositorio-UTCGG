<?php

namespace App\Services\BusinessAdvisors;

use App\Enums\BusinessAdvisorAuditAction;
use App\Enums\CatalogReviewStatus;
use App\Enums\CatalogSource;
use App\Models\BusinessAdvisor;
use App\Models\BusinessAdvisorAffiliation;
use App\Models\Company;
use App\Models\Repository;
use App\Models\RepositoryBusinessAdvisor;
use App\Models\User;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\ValidationException;

class ChangeAffiliation
{
    public function __construct(
        private readonly AttachBusinessAdvisor $attachBusinessAdvisor,
        private readonly BusinessAdvisorAuditLogger $auditLogger,
    ) {}

    /**
     * Creates a pending affiliation for an existing advisor and attaches it to the repository.
     *
     * @param  array{
     *     existing_company_id?: int|null,
     *     company?: array{name?: string, rfc?: string|null}|null,
     *     affiliation?: array{job_title?: string|null, department?: string|null, email?: string|null, phone?: string|null},
     *     notes?: string|null,
     *     is_primary?: bool,
     *     send_confirmation?: bool
     * }  $input
     */
    public function handle(
        Repository $repository,
        BusinessAdvisor $advisor,
        User $actor,
        array $input,
    ): RepositoryBusinessAdvisor {
        return DB::transaction(function () use ($repository, $advisor, $actor, $input): RepositoryBusinessAdvisor {
            $assignment = $this->attachBusinessAdvisor->handle($repository, $actor, [
                'existing_advisor_id' => $advisor->id,
                'existing_company_id' => $input['existing_company_id'] ?? null,
                'company' => $input['company'] ?? null,
                'affiliation' => $input['affiliation'] ?? [],
                'notes' => $input['notes'] ?? null,
                'is_primary' => $input['is_primary'] ?? true,
                'send_confirmation' => $input['send_confirmation'] ?? true,
            ]);

            $this->auditLogger->log(
                BusinessAdvisorAuditAction::ChangeAffiliation,
                $actor,
                $advisor->id,
                $repository->id,
                ['assignment_id' => $assignment->id],
            );

            return $assignment;
        });
    }

    public function closePreviousOnVerify(BusinessAdvisorAffiliation $affiliation): void
    {
        $previous = BusinessAdvisorAffiliation::query()
            ->where('business_advisor_id', $affiliation->business_advisor_id)
            ->where('company_id', $affiliation->company_id)
            ->whereKeyNot($affiliation->id)
            ->current()
            ->lockForUpdate()
            ->get();

        foreach ($previous as $row) {
            $row->update([
                'ends_at' => $affiliation->starts_at?->toDateString() ?? now()->toDateString(),
            ]);
        }

        // Also close other current affiliations only for the same company (rule from MD).
        // Different companies may remain current for consultants.
    }

    /**
     * @param  array{name?: string, rfc?: string|null}  $companyData
     */
    public function resolveOrCreateCompany(User $actor, ?int $existingCompanyId, array $companyData): Company
    {
        if ($existingCompanyId !== null) {
            return Company::query()->findOrFail($existingCompanyId);
        }

        $name = trim((string) ($companyData['name'] ?? ''));
        if ($name === '') {
            throw ValidationException::withMessages([
                'company.name' => 'El nombre de la empresa es obligatorio.',
            ]);
        }

        $rfc = NameNormalizer::normalizeRfc($companyData['rfc'] ?? null);

        return Company::query()->create([
            'name' => $name,
            'name_normalized' => NameNormalizer::normalizeCompanyName($name),
            'rfc' => $rfc,
            'status' => CatalogReviewStatus::PendingReview->value,
            'source' => CatalogSource::User->value,
            'created_by' => $actor->id,
        ]);
    }
}
