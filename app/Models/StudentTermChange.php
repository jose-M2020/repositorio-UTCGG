<?php

namespace App\Models;

use App\Enums\StudentTermChangeReason;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

/**
 * @property int $id
 * @property int $student_profile_id
 * @property int|null $from_term
 * @property int|null $to_term
 * @property int $academic_period_id
 * @property StudentTermChangeReason $reason
 * @property int|null $from_curriculum_id
 * @property int|null $to_curriculum_id
 * @property string|null $note
 * @property int|null $changed_by
 * @property \Illuminate\Support\Carbon $created_at
 */
#[Fillable([
    'student_profile_id',
    'from_term',
    'to_term',
    'academic_period_id',
    'reason',
    'from_curriculum_id',
    'to_curriculum_id',
    'note',
    'changed_by',
    'created_at',
])]
class StudentTermChange extends Model
{
    public const UPDATED_AT = null;

    protected function casts(): array
    {
        return [
            'from_term' => 'integer',
            'to_term' => 'integer',
            'reason' => StudentTermChangeReason::class,
            'created_at' => 'datetime',
        ];
    }

    public function studentProfile(): BelongsTo
    {
        return $this->belongsTo(StudentProfile::class);
    }

    public function academicPeriod(): BelongsTo
    {
        return $this->belongsTo(AcademicPeriod::class);
    }

    public function fromCurriculum(): BelongsTo
    {
        return $this->belongsTo(Curriculum::class, 'from_curriculum_id');
    }

    public function toCurriculum(): BelongsTo
    {
        return $this->belongsTo(Curriculum::class, 'to_curriculum_id');
    }

    public function changedByUser(): BelongsTo
    {
        return $this->belongsTo(User::class, 'changed_by');
    }
}