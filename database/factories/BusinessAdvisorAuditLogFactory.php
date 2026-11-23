<?php

namespace Database\Factories;

use App\Enums\BusinessAdvisorAuditAction;
use App\Models\BusinessAdvisorAuditLog;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<BusinessAdvisorAuditLog>
 */
class BusinessAdvisorAuditLogFactory extends Factory
{
    protected $model = BusinessAdvisorAuditLog::class;

    /**
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'user_id' => null,
            'business_advisor_id' => null,
            'repository_id' => null,
            'action' => BusinessAdvisorAuditAction::Attached->value,
            'metadata' => null,
            'ip' => '127.0.0.1',
            'created_at' => now(),
        ];
    }
}
