<?php

namespace App\Models;

use Database\Factories\RepositoryFactory;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;

/**
 * @property int $id
 * @property string $title
 * @property string $slug
 * @property string $description
 * @property string $keywords
 * @property bool $is_public
 * @property int|null $career_id
 * @property int|null $project_type_id
 * @property int|null $education_level_id
 * @property string|null $external_advisor
 * @property string|null $company
 * @property string $generation
 * @property string|null $images
 * @property string $created_by
 */
#[Fillable([
    'title',
    'slug',
    'description',
    'keywords',
    'is_public',
    'career_id',
    'project_type_id',
    'education_level_id',
    'external_advisor',
    'company',
    'generation',
    'images',
    'created_by',
])]
class Repository extends Model
{
    /** @use HasFactory<RepositoryFactory> */
    use HasFactory;

    protected $table = 'repositories';

    protected function casts(): array
    {
        return [
            'is_public' => 'boolean',
        ];
    }

    public function getRouteKeyName(): string
    {
        return 'slug';
    }

    public function users(): BelongsToMany
    {
        return $this->belongsToMany(User::class, 'repository_user')->withTimestamps();
    }

    public function files(): HasMany
    {
        return $this->hasMany(File::class);
    }

    public function career(): BelongsTo
    {
        return $this->belongsTo(Career::class);
    }

    public function projectType(): BelongsTo
    {
        return $this->belongsTo(ProjectType::class);
    }

    public function educationLevel(): BelongsTo
    {
        return $this->belongsTo(EducationLevel::class);
    }
}