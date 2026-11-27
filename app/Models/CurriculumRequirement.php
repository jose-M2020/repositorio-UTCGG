<?php

namespace App\Models;

use Database\Factories\CurriculumRequirementFactory;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

/**
 * @property int $id
 * @property int $curriculum_id
 * @property int $project_type_id
 * @property int $term_number
 * @property bool $is_mandatory
 * @property string|null $notes
 */
#[Fillable([
    'curriculum_id',
    'project_type_id',
    'term_number',
    'is_mandatory',
    'notes',
])]
class CurriculumRequirement extends Model
{
    /** @use HasFactory<CurriculumRequirementFactory> */
    use HasFactory;

    protected function casts(): array
    {
        return [
            'term_number' => 'integer',
            'is_mandatory' => 'boolean',
        ];
    }

    public function curriculum(): BelongsTo
    {
        return $this->belongsTo(Curriculum::class);
    }

    public function projectType(): BelongsTo
    {
        return $this->belongsTo(ProjectType::class);
    }
}
