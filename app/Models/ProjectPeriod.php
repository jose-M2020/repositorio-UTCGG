<?php

namespace App\Models;

use App\Enums\ProjectPeriodStatus;
use Database\Factories\ProjectPeriodFactory;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Carbon\CarbonInterface;
use Illuminate\Support\Carbon;

/**
 * @property int $id
 * @property int $project_type_id
 * @property int $academic_period_id
 * @property string|null $name
 * @property Carbon|null $starts_at
 * @property Carbon|null $ends_at
 * @property Carbon|null $enrollment_opens_at
 * @property Carbon|null $enrollment_closes_at
 * @property ProjectPeriodStatus $status
 * @property int|null $advisor_default_capacity
 * @property int|null $created_by
 * @property-read string $display_name
 * @property-read CarbonInterface|null $effective_starts_at
 * @property-read CarbonInterface|null $effective_ends_at
 */
#[Fillable([
    'project_type_id',
    'academic_period_id',
    'name',
    'starts_at',
    'ends_at',
    'enrollment_opens_at',
    'enrollment_closes_at',
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
            'enrollment_opens_at' => 'date',
            'enrollment_closes_at' => 'date',
            'status' => ProjectPeriodStatus::class,
            'advisor_default_capacity' => 'integer',
        ];
    }

    protected function displayName(): Attribute
    {
        return Attribute::get(function (): string {
            $this->loadMissing('projectType', 'academicPeriod');

            $typeName = $this->projectType?->name;
            $academicName = $this->academicPeriod?->name;

            if ($typeName !== null && $academicName !== null) {
                return "{$typeName} · {$academicName}";
            }

            return (string) ($this->name ?? '');
        });
    }

    protected function effectiveStartsAt(): Attribute
    {
        return Attribute::get(function (): ?CarbonInterface {
            $this->loadMissing('academicPeriod');

            return $this->starts_at ?? $this->academicPeriod?->starts_at;
        });
    }

    protected function effectiveEndsAt(): Attribute
    {
        return Attribute::get(function (): ?CarbonInterface {
            $this->loadMissing('academicPeriod');

            return $this->ends_at ?? $this->academicPeriod?->ends_at;
        });
    }

    public function projectType(): BelongsTo
    {
        return $this->belongsTo(ProjectType::class);
    }

    public function academicPeriod(): BelongsTo
    {
        return $this->belongsTo(AcademicPeriod::class);
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