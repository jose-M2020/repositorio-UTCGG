<?php

namespace App\Models;

use Database\Factories\CurriculumStageFactory;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

/**
 * @property int $id
 * @property int $curriculum_id
 * @property int $education_level_id
 * @property int $position
 * @property int $first_term_number
 * @property int $total_terms
 * @property string|null $degree_title
 * @property-read int $last_term_number
 */
#[Fillable([
    'curriculum_id',
    'education_level_id',
    'position',
    'first_term_number',
    'total_terms',
    'degree_title',
])]
class CurriculumStage extends Model
{
    /** @use HasFactory<CurriculumStageFactory> */
    use HasFactory;

    protected function casts(): array
    {
        return [
            'position' => 'integer',
            'first_term_number' => 'integer',
            'total_terms' => 'integer',
        ];
    }

    public function curriculum(): BelongsTo
    {
        return $this->belongsTo(Curriculum::class);
    }

    public function educationLevel(): BelongsTo
    {
        return $this->belongsTo(EducationLevel::class);
    }

    public function studentStageRecords(): HasMany
    {
        return $this->hasMany(StudentStageRecord::class);
    }

    protected function lastTermNumber(): Attribute
    {
        return Attribute::get(
            fn (): int => $this->first_term_number + $this->total_terms - 1,
        );
    }

    public function containsTerm(int $termNumber): bool
    {
        return $termNumber >= $this->first_term_number
            && $termNumber <= $this->last_term_number;
    }
}
