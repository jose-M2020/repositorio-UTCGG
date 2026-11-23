<?php

namespace App\Services\BusinessAdvisors;

use App\Enums\BusinessAdvisorAuditAction;
use App\Models\BusinessAdvisorAuditLog;
use App\Models\User;
use Illuminate\Http\Request;

class BusinessAdvisorAuditLogger
{
    /**
     * @param  array<string, mixed>|null  $metadata
     */
    public function log(
        BusinessAdvisorAuditAction $action,
        ?User $user = null,
        ?int $businessAdvisorId = null,
        ?int $repositoryId = null,
        ?array $metadata = null,
        ?Request $request = null,
    ): BusinessAdvisorAuditLog {
        return BusinessAdvisorAuditLog::query()->create([
            'user_id' => $user?->id,
            'business_advisor_id' => $businessAdvisorId,
            'repository_id' => $repositoryId,
            'action' => $action,
            'metadata' => $this->sanitizeMetadata($metadata),
            'ip' => $request?->ip(),
            'created_at' => now(),
        ]);
    }

    /**
     * @param  array<string, mixed>|null  $metadata
     * @return array<string, mixed>|null
     */
    private function sanitizeMetadata(?array $metadata): ?array
    {
        if ($metadata === null) {
            return null;
        }

        unset(
            $metadata['email'],
            $metadata['phone'],
            $metadata['contact'],
            $metadata['snapshot'],
        );

        return $metadata;
    }
}
