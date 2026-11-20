<?php

namespace App\Models;

use Database\Factories\ProjectTypeFactory;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

/**
 * @property int $id
 * @property string $code
 * @property string $name
 * @property string|null $description
 * @property bool $is_team_project
 * @property bool $requires_term
 * @property bool $requires_internship_flow
 * @property bool $requires_business_advisor
 * @property bool $requires_academic_advisor
 * @property int $sort_order
 * @property bool $is_active
 */
#[Fillable([
    'code',
    'name',
    'description',
    'is_team_project',
    'requires_term',
    'requires_internship_flow',
    'requires_business_advisor',
    'requires_academic_advisor',
    'sort_order',
    'is_active',
])]
class ProjectType extends Model
{
    /** @use HasFactory<ProjectTypeFactory> */
    use HasFactory;

    protected function casts(): array
    {
        return [
            'is_team_project' => 'boolean',
            'requires_term' => 'boolean',
            'requires_internship_flow' => 'boolean',
            'requires_business_advisor' => 'boolean',
            'requires_academic_advisor' => 'boolean',
            'is_active' => 'boolean',
            'sort_order' => 'integer',
        ];
    }

    public function periods(): HasMany
    {
        return $this->hasMany(ProjectPeriod::class);
    }

    public function scopeActive(Builder $query): Builder
    {
        return $query->where('is_active', true);
    }

    public function scopeOrdered(Builder $query): Builder
    {
        return $query->orderBy('sort_order')->orderBy('name');
    }

    /**
     * @return array<string, string>
     */
    public static function optionsByCode(): array
    {
        return static::query()
            ->active()
            ->ordered()
            ->pluck('name', 'code')
            ->all();
    }

    /**
     * @return list<string>
     */
    public static function activeCodes(): array
    {
        return static::query()
            ->active()
            ->ordered()
            ->pluck('code')
            ->values()
            ->all();
    }
}
