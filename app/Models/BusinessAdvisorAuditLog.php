<?php

namespace App\Models;

use App\Enums\BusinessAdvisorAuditAction;
use Database\Factories\BusinessAdvisorAuditLogFactory;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Support\Carbon;

/**
 * @property int $id
 * @property int|null $user_id
 * @property int|null $business_advisor_id
 * @property int|null $repository_id
 * @property BusinessAdvisorAuditAction $action
 * @property array<string, mixed>|null $metadata
 * @property string|null $ip
 * @property Carbon $created_at
 */
#[Fillable([
    'user_id',
    'business_advisor_id',
    'repository_id',
    'action',
    'metadata',
    'ip',
    'created_at',
])]
class BusinessAdvisorAuditLog extends Model
{
    /** @use HasFactory<BusinessAdvisorAuditLogFactory> */
    use HasFactory;

    public $timestamps = false;

    protected function casts(): array
    {
        return [
            'action' => BusinessAdvisorAuditAction::class,
            'metadata' => 'array',
            'created_at' => 'datetime',
        ];
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function businessAdvisor(): BelongsTo
    {
        return $this->belongsTo(BusinessAdvisor::class);
    }

    public function repository(): BelongsTo
    {
        return $this->belongsTo(Repository::class);
    }
}
