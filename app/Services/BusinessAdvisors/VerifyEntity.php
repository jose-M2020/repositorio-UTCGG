<?php

namespace App\Services\BusinessAdvisors;

use App\Enums\BusinessAdvisorAuditAction;
use App\Enums\CatalogReviewStatus;
use App\Models\BusinessAdvisor;
use App\Models\BusinessAdvisorAffiliation;
use App\Models\Company;
use App\Models\User;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\ValidationException;

class VerifyEntity
{
    public function __construct(
        private readonly BusinessAdvisorAuditLogger $auditLogger,
        private readonly ChangeAffiliation $changeAffiliation,
    ) {}

    public function verify(BusinessAdvisor|Company|BusinessAdvisorAffiliation $entity, User $user): void
    {
        if ((int) $entity->created_by === (int) $user->id) {
            throw ValidationException::withMessages([
                'entity' => 'No puedes verificar un registro que tu mismo creaste.',
            ]);
        }

        DB::transaction(function () use ($entity, $user): void {
            $entity->fill([
                'status' => CatalogReviewStatus::Verified->value,
                'verified_by' => $user->id,
                'verified_at' => now(),
            ])->save();

            if ($entity instanceof BusinessAdvisorAffiliation) {
                $this->changeAffiliation->closePreviousOnVerify($entity);
            }

            $this->auditLogger->log(
                BusinessAdvisorAuditAction::Verified,
                $user,
                $entity instanceof BusinessAdvisor
                    ? $entity->id
                    : ($entity instanceof BusinessAdvisorAffiliation ? $entity->business_advisor_id : null),
                null,
                [
                    'entity_type' => $entity::class,
                    'entity_id' => $entity->id,
                ],
            );
        });
    }

    public function reject(
        BusinessAdvisor|Company|BusinessAdvisorAffiliation $entity,
        User $user,
        ?string $reason = null,
    ): void {
        if ((int) $entity->created_by === (int) $user->id) {
            throw ValidationException::withMessages([
                'entity' => 'No puedes rechazar un registro que tu mismo creaste.',
            ]);
        }

        DB::transaction(function () use ($entity, $user, $reason): void {
            $entity->fill([
                'status' => CatalogReviewStatus::Rejected->value,
                'verified_by' => $user->id,
                'verified_at' => now(),
            ])->save();

            $this->auditLogger->log(
                BusinessAdvisorAuditAction::Rejected,
                $user,
                $entity instanceof BusinessAdvisor
                    ? $entity->id
                    : ($entity instanceof BusinessAdvisorAffiliation ? $entity->business_advisor_id : null),
                null,
                [
                    'entity_type' => $entity::class,
                    'entity_id' => $entity->id,
                    'reason' => $reason,
                ],
            );
        });
    }
}
