<?php

namespace App\Models;

use Database\Factories\CurriculumFactory;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

/**
 * @property int $id
 * @property int $career_id
 * @property string $name
 * @property \Illuminate\Support\Carbon|null $applies_from
 * @property bool $is_active
 * @property-read int $total_terms
 * @property-read int $last_term_number
 */
#[Fillable([
    'career_id',
    'name',
    'applies_from',
    'is_active',
])]
class Curriculum extends Model
{
    /** @use HasFactory<CurriculumFactory> */
    use HasFactory;

    protected function casts(): array
    {
        return [
            'applies_from' => 'date',
            'is_active' => 'boolean',
        ];
    }

    public function career(): BelongsTo
    {
        return $this->belongsTo(Career::class);
    }

    public function stages(): HasMany
    {
        return $this->hasMany(CurriculumStage::class)->orderBy('position');
    }

    public function requirements(): HasMany
    {
        return $this->hasMany(CurriculumRequirement::class)->orderBy('term_number');
    }

    public function studentProfiles(): HasMany
    {
        return $this->hasMany(StudentProfile::class);
    }

    protected function totalTerms(): Attribute
    {
        return Attribute::get(fn (): int => (int) $this->stages->sum('total_terms'));
    }

    protected function lastTermNumber(): Attribute
    {
        return Attribute::get(function (): int {
            $lastStage = $this->stages->sortByDesc('position')->first();

            return $lastStage?->last_term_number ?? 0;
        });
    }

    public function scopeActive(Builder $query): Builder
    {
        return $query->where('is_active', true);
    }

    public function hasAssignedStudents(): bool
    {
        return $this->studentProfiles()->exists();
    }
}
