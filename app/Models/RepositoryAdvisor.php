<?php

namespace App\Models;

use App\Enums\AdvisorRole;
use Database\Factories\RepositoryAdvisorFactory;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Support\Carbon;

/**
 * @property int $id
 * @property int $repository_id
 * @property int $user_id
 * @property int $project_period_id
 * @property AdvisorRole $role
 * @property int|null $assigned_by
 * @property Carbon $assigned_at
 * @property Carbon|null $released_at
 * @property string|null $override_reason
 */
#[Fillable([
    'repository_id',
    'user_id',
    'project_period_id',
    'role',
    'assigned_by',
    'assigned_at',
    'released_at',
    'override_reason',
])]
class RepositoryAdvisor extends Model
{
    /** @use HasFactory<RepositoryAdvisorFactory> */
    use HasFactory;

    /**
     * @var array<string, mixed>
     */
    protected $attributes = [
        'role' => AdvisorRole::Primary->value,
    ];

    protected function casts(): array
    {
        return [
            'role' => AdvisorRole::class,
            'assigned_at' => 'datetime',
            'released_at' => 'datetime',
        ];
    }

    public function repository(): BelongsTo
    {
        return $this->belongsTo(Repository::class);
    }

    public function advisor(): BelongsTo
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    public function period(): BelongsTo
    {
        return $this->belongsTo(ProjectPeriod::class, 'project_period_id');
    }

    public function assignedBy(): BelongsTo
    {
        return $this->belongsTo(User::class, 'assigned_by');
    }

    public function scopeActive(Builder $query): Builder
    {
        return $query->whereNull('released_at');
    }
}
