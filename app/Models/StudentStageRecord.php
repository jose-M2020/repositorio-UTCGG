<?php

namespace App\Models;

use App\Enums\StudentStageStatus;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

/**
 * @property int $id
 * @property int $student_profile_id
 * @property int $curriculum_stage_id
 * @property int $started_academic_period_id
 * @property StudentStageStatus $status
 * @property int|null $graduated_academic_period_id
 * @property \Illuminate\Support\Carbon|null $graduated_at
 * @property \Illuminate\Support\Carbon|null $titled_at
 */
#[Fillable([
    'student_profile_id',
    'curriculum_stage_id',
    'started_academic_period_id',
    'status',
    'graduated_academic_period_id',
    'graduated_at',
    'titled_at',
])]
class StudentStageRecord extends Model
{
    protected function casts(): array
    {
        return [
            'status' => StudentStageStatus::class,
            'graduated_at' => 'datetime',
            'titled_at' => 'datetime',
        ];
    }

    public function studentProfile(): BelongsTo
    {
        return $this->belongsTo(StudentProfile::class);
    }

    public function curriculumStage(): BelongsTo
    {
        return $this->belongsTo(CurriculumStage::class);
    }

    public function startedAcademicPeriod(): BelongsTo
    {
        return $this->belongsTo(AcademicPeriod::class, 'started_academic_period_id');
    }

    public function graduatedAcademicPeriod(): BelongsTo
    {
        return $this->belongsTo(AcademicPeriod::class, 'graduated_academic_period_id');
    }

    public function scopeInProgress(Builder $query): Builder
    {
        return $query->where('status', StudentStageStatus::InProgress);
    }
}