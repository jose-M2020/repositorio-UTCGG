<?php

namespace App\Models;

use App\Enums\ParticipantStatus;
use Database\Factories\ProjectPeriodParticipantFactory;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

/**
 * @property int $id
 * @property int $project_period_id
 * @property int $user_id
 * @property int $career_id
 * @property ParticipantStatus $status
 * @property int|null $term_number
 * @property int|null $curriculum_requirement_id
 * @property string|null $override_reason
 */
#[Fillable([
    'project_period_id',
    'user_id',
    'career_id',
    'status',
    'term_number',
    'curriculum_requirement_id',
    'override_reason',
])]
class ProjectPeriodParticipant extends Model
{
    /** @use HasFactory<ProjectPeriodParticipantFactory> */
    use HasFactory;

    /**
     * @var array<string, mixed>
     */
    protected $attributes = [
        'status' => ParticipantStatus::Enrolled->value,
    ];

    protected function casts(): array
    {
        return [
            'status' => ParticipantStatus::class,
        ];
    }

    public function period(): BelongsTo
    {
        return $this->belongsTo(ProjectPeriod::class, 'project_period_id');
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function career(): BelongsTo
    {
        return $this->belongsTo(Career::class);
    }

    public function curriculumRequirement(): BelongsTo
    {
        return $this->belongsTo(CurriculumRequirement::class);
    }
}
