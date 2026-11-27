<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Validation\ValidationException;

/**
 * @property int $id
 * @property int $repository_id
 * @property int $career_id
 */
#[Fillable([
    'repository_id',
    'career_id',
])]
class RepositoryCareer extends Model
{
    protected static function booted(): void
    {
        static::saving(function (RepositoryCareer $link): void {
            $repository = $link->relationLoaded('repository')
                ? $link->repository
                : Repository::query()->find($link->repository_id);

            if (
                $repository !== null
                && (int) $link->career_id === (int) $repository->career_id
            ) {
                throw ValidationException::withMessages([
                    'career_id' => 'La carrera principal del repositorio no puede repetirse en carreras adicionales.',
                ]);
            }
        });
    }

    public function repository(): BelongsTo
    {
        return $this->belongsTo(Repository::class);
    }

    public function career(): BelongsTo
    {
        return $this->belongsTo(Career::class);
    }
}