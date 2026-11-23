<?php

namespace App\Services\BusinessAdvisors;

use App\Enums\BusinessAdvisorAuditAction;
use App\Models\RepositoryBusinessAdvisor;
use App\Models\User;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\ValidationException;

class ReleaseBusinessAdvisor
{
    public function __construct(
        private readonly BusinessAdvisorAuditLogger $auditLogger,
    ) {}

    public function handle(RepositoryBusinessAdvisor $assignment, User $actor): void
    {
        if ($assignment->released_at !== null) {
            throw ValidationException::withMessages([
                'business_advisor' => 'El asesor ya fue liberado.',
            ]);
        }

        DB::transaction(function () use ($assignment, $actor): void {
            $assignment->update(['released_at' => now()]);

            if ($assignment->is_primary) {
                $nextPrimary = RepositoryBusinessAdvisor::query()
                    ->where('repository_id', $assignment->repository_id)
                    ->active()
                    ->whereKeyNot($assignment->id)
                    ->latest('assigned_at')
                    ->first();

                if ($nextPrimary !== null) {
                    $nextPrimary->update(['is_primary' => true]);
                    $assignment->repository?->update([
                        'company_id' => $nextPrimary->company_id
                            ?? (is_array($nextPrimary->snapshot) ? ($nextPrimary->snapshot['company']['id'] ?? null) : null),
                    ]);
                } else {
                    $assignment->repository?->update(['company_id' => null]);
                }
            }

            $this->auditLogger->log(
                BusinessAdvisorAuditAction::Released,
                $actor,
                $assignment->business_advisor_id,
                $assignment->repository_id,
                ['assignment_id' => $assignment->id],
            );
        });
    }
}
