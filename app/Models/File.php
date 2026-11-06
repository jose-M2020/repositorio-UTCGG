<?php

namespace App\Models;

use Database\Factories\FileFactory;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

/**
 * @property int $id
 * @property int $repositorio_id
 * @property string $original_name
 * @property string $file_type
 * @property string $file_path
 * @property bool $is_public
 */
#[Fillable([
    'repositorio_id',
    'original_name',
    'file_type',
    'file_path',
    'is_public',
])]
class File extends Model
{
    /** @use HasFactory<FileFactory> */
    use HasFactory;

    protected function casts(): array
    {
        return [
            'is_public' => 'boolean',
        ];
    }

    public function repositorio(): BelongsTo
    {
        return $this->belongsTo(Repositorio::class);
    }
}
