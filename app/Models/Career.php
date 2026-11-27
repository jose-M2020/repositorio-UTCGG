<?php

namespace App\Models;

use App\Support\Media;
use Database\Factories\CareerFactory;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

/**
 * @property int $id
 * @property string $code
 * @property string $name
 * @property string $slug
 * @property string|null $description
 * @property string|null $image_path
 * @property bool $show_on_home
 * @property int $sort_order
 * @property bool $is_active
 */
#[Fillable([
    'code',
    'name',
    'slug',
    'description',
    'image_path',
    'show_on_home',
    'sort_order',
    'is_active',
])]
class Career extends Model
{
    /** @use HasFactory<CareerFactory> */
    use HasFactory;

    protected function casts(): array
    {
        return [
            'show_on_home' => 'boolean',
            'is_active' => 'boolean',
            'sort_order' => 'integer',
        ];
    }

    public function studentProfiles(): HasMany
    {
        return $this->hasMany(StudentProfile::class);
    }

    public function careerAssignments(): HasMany
    {
        return $this->hasMany(CareerAssignment::class);
    }

    public function curricula(): HasMany
    {
        return $this->hasMany(Curriculum::class);
    }

    public function scopeActive(Builder $query): Builder
    {
        return $query->where('is_active', true);
    }

    public function scopeOrdered(Builder $query): Builder
    {
        return $query->orderBy('sort_order')->orderBy('name');
    }

    public function scopeForHome(Builder $query): Builder
    {
        return $query
            ->active()
            ->where('show_on_home', true)
            ->whereNotNull('image_path');
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
     * @return list<array{id: int, code: string, name: string}>
     */
    public static function formOptions(): array
    {
        return static::query()
            ->active()
            ->ordered()
            ->get(['id', 'code', 'name'])
            ->map(fn (self $career): array => [
                'id' => (int) $career->id,
                'code' => $career->code,
                'name' => $career->name,
            ])
            ->values()
            ->all();
    }

    /**
     * @return list<array{code: string, name: string, image: string}>
     */
    public static function homeCards(): array
    {
        return static::query()
            ->forHome()
            ->ordered()
            ->get(['code', 'name', 'image_path'])
            ->map(fn (self $career): array => [
                'code' => $career->code,
                'name' => $career->name,
                'image' => Media::url($career->image_path),
            ])
            ->values()
            ->all();
    }
}
