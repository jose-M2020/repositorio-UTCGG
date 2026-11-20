<?php

namespace App\Models;

use App\Enums\ProjectPeriodStatus;
use Database\Factories\ProjectPeriodFactory;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Support\Carbon;

/**
 * @property int $id
 * @property int $project_type_id
 * @property string $name
 * @property Carbon $starts_at
 * @property Carbon $ends_at
 * @property ProjectPeriodStatus $status
 * @property int|null $advisor_default_capacity
 * @property int|null $created_by
 */
#[Fillable([
    'project_type_id',
    'name',
    'starts_at',
    'ends_at',
    'status',
    'advisor_default_capacity',
    'created_by',
])]
class ProjectPeriod extends Model
{
    /** @use HasFactory<ProjectPeriodFactory> */
    use HasFactory;

    /**
     * @var array<string, mixed>
     */
    protected $attributes = [
        'status' => ProjectPeriodStatus::Draft->value,
    ];

    protected function casts(): array
    {
        return [
            'starts_at' => 'date',
            'ends_at' => 'date',
            'status' => ProjectPeriodStatus::class,
            'advisor_default_capacity' => 'integer',
        ];
    }

    public function projectType(): BelongsTo
    {
        return $this->belongsTo(ProjectType::class);
    }

    public function createdBy(): BelongsTo
    {
        return $this->belongsTo(User::class, 'created_by');
    }

    public function participants(): HasMany
    {
        return $this->hasMany(ProjectPeriodParticipant::class);
    }

    public function capacities(): HasMany
    {
        return $this->hasMany(AdvisorPeriodCapacity::class);
    }

    public function repositories(): HasMany
    {
        return $this->hasMany(Repository::class);
    }

    public function advisorAssignments(): HasMany
    {
        return $this->hasMany(RepositoryAdvisor::class);
    }

    public function scopeOpen(Builder $query): Builder
    {
        return $query->where('status', ProjectPeriodStatus::Open->value);
    }

    public function defaultAdvisorCapacity(): int
    {
        return $this->advisor_default_capacity
            ?? (int) config('projects.default_advisor_capacity');
    }
}
