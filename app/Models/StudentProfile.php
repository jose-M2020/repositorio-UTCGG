<?php

namespace App\Models;

use App\Enums\AcademicStatus;
use App\Enums\Shift;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

/**
 * @property int $id
 * @property int $user_id
 * @property string|null $student_number
 * @property int $career_id
 * @property int|null $curriculum_id
 * @property int|null $entry_academic_period_id
 * @property int|null $term_academic_period_id
 * @property int|null $status_since_academic_period_id
 * @property int|null $education_level_id
 * @property int|null $admission_year
 * @property string|null $generation
 * @property int|null $current_term
 * @property string|null $group
 * @property Shift|null $shift
 * @property AcademicStatus $academic_status
 * @property \Illuminate\Support\Carbon|null $admission_date
 * @property \Illuminate\Support\Carbon|null $graduation_date
 * @property string|null $curp
 */
#[Fillable([
    'user_id',
    'student_number',
    'career_id',
    'curriculum_id',
    'entry_academic_period_id',
    'term_academic_period_id',
    'status_since_academic_period_id',
    'education_level_id',
    'admission_year',
    'generation',
    'current_term',
    'group',
    'shift',
    'academic_status',
    'admission_date',
    'graduation_date',
    'curp',
])]
class StudentProfile extends Model
{
    /** @use HasFactory<\Database\Factories\StudentProfileFactory> */
    use HasFactory;

    /**
     * @var array<string, mixed>
     */
    protected $attributes = [
        'academic_status' => AcademicStatus::Active->value,
    ];

    protected function casts(): array
    {
        return [
            'admission_year' => 'integer',
            'current_term' => 'integer',
            'shift' => Shift::class,
            'academic_status' => AcademicStatus::class,
            'admission_date' => 'date',
            'graduation_date' => 'date',
            'curp' => 'encrypted',
        ];
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function career(): BelongsTo
    {
        return $this->belongsTo(Career::class);
    }

    public function curriculum(): BelongsTo
    {
        return $this->belongsTo(Curriculum::class);
    }

    public function educationLevel(): BelongsTo
    {
        return $this->belongsTo(EducationLevel::class);
    }

    public function entryAcademicPeriod(): BelongsTo
    {
        return $this->belongsTo(AcademicPeriod::class, 'entry_academic_period_id');
    }

    public function termAcademicPeriod(): BelongsTo
    {
        return $this->belongsTo(AcademicPeriod::class, 'term_academic_period_id');
    }

    public function statusSinceAcademicPeriod(): BelongsTo
    {
        return $this->belongsTo(AcademicPeriod::class, 'status_since_academic_period_id');
    }

    public function stageRecords(): HasMany
    {
        return $this->hasMany(StudentStageRecord::class);
    }

    public function termChanges(): HasMany
    {
        return $this->hasMany(StudentTermChange::class)->orderByDesc('created_at');
    }

    public function scopeRegisteredInPlan(Builder $query): Builder
    {
        return $query->whereNotNull('curriculum_id');
    }
}