<?php

namespace App\Services\BusinessAdvisors;

use App\Enums\BusinessAdvisorAuditAction;
use App\Enums\CatalogReviewStatus;
use App\Models\BusinessAdvisor;
use App\Models\BusinessAdvisorAffiliation;
use App\Models\Company;
use App\Models\Repository;
use App\Models\RepositoryBusinessAdvisor;
use App\Models\User;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\ValidationException;

class MergeEntities
{
    public function __construct(
        private readonly BusinessAdvisorAuditLogger $auditLogger,
    ) {}

    public function mergeAdvisors(BusinessAdvisor $source, BusinessAdvisor $target, User $user): void
    {
        $this->assertMergeable($source, $target);

        DB::transaction(function () use ($source, $target, $user): void {
            $source = BusinessAdvisor::query()->whereKey($source->id)->lockForUpdate()->firstOrFail();
            $target = BusinessAdvisor::query()->whereKey($target->id)->lockForUpdate()->firstOrFail();

            BusinessAdvisorAffiliation::query()
                ->where('business_advisor_id', $source->id)
                ->update(['business_advisor_id' => $target->id]);

            RepositoryBusinessAdvisor::query()
                ->where('business_advisor_id', $source->id)
                ->update(['business_advisor_id' => $target->id]);

            $source->update([
                'status' => CatalogReviewStatus::Merged->value,
                'merged_into_id' => $target->id,
            ]);

            $this->auditLogger->log(
                BusinessAdvisorAuditAction::Merged,
                $user,
                $target->id,
                null,
                ['source_id' => $source->id, 'target_id' => $target->id, 'entity' => 'business_advisor'],
            );
        });
    }

    public function mergeCompanies(Company $source, Company $target, User $user): void
    {
        $this->assertMergeable($source, $target);

        DB::transaction(function () use ($source, $target, $user): void {
            $source = Company::query()->whereKey($source->id)->lockForUpdate()->firstOrFail();
            $target = Company::query()->whereKey($target->id)->lockForUpdate()->firstOrFail();

            BusinessAdvisorAffiliation::query()
                ->where('company_id', $source->id)
                ->update(['company_id' => $target->id]);

            Repository::query()
                ->where('company_id', $source->id)
                ->update(['company_id' => $target->id]);

            RepositoryBusinessAdvisor::query()
                ->where('company_id', $source->id)
                ->update(['company_id' => $target->id]);

            $source->update([
                'status' => CatalogReviewStatus::Merged->value,
                'merged_into_id' => $target->id,
            ]);

            $this->auditLogger->log(
                BusinessAdvisorAuditAction::Merged,
                $user,
                null,
                null,
                ['source_id' => $source->id, 'target_id' => $target->id, 'entity' => 'company'],
            );
        });
    }

    private function assertMergeable(BusinessAdvisor|Company $source, BusinessAdvisor|Company $target): void
    {
        if ($source->is($target)) {
            throw ValidationException::withMessages([
                'merge' => 'No se puede fusionar un registro consigo mismo.',
            ]);
        }

        if ($source->status === CatalogReviewStatus::Merged || $target->status === CatalogReviewStatus::Merged) {
            throw ValidationException::withMessages([
                'merge' => 'No se puede fusionar un registro ya fusionado.',
            ]);
        }

        if ($target->merged_into_id !== null || $source->merged_into_id !== null) {
            throw ValidationException::withMessages([
                'merge' => 'No se permiten cadenas circulares de fusion.',
            ]);
        }
    }
}
