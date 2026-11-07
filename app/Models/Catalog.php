<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;

/**
 * @property int $id
 * @property string $type
 * @property string $code
 * @property string $name
 * @property int $sort_order
 * @property bool $is_active
 * @property array<string, mixed>|null $meta
 */
#[Fillable(['type', 'code', 'name', 'sort_order', 'is_active', 'meta'])]
class Catalog extends Model
{
    /** @use HasFactory<\Database\Factories\CatalogFactory> */
    use HasFactory;

    public const TYPE_CAREER = 'career';

    public const TYPE_PROJECT = 'project_type';

    public const TYPE_ACADEMIC_DEGREE = 'academic_degree';

    protected function casts(): array
    {
        return [
            'is_active' => 'boolean',
            'meta' => 'array',
        ];
    }

    public function scopeOfType(Builder $query, string $type): Builder
    {
        return $query->where('type', $type);
    }

    public function scopeActive(Builder $query): Builder
    {
        return $query->where('is_active', true);
    }
}
