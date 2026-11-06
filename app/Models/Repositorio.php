<?php

namespace App\Models;

use Database\Factories\RepositorioFactory;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;

/**
 * @property int $id
 * @property string $nombre_rep
 * @property string $slug
 * @property string $descripcion
 * @property string $tipo_proyecto
 * @property string $nivel_proyecto
 * @property string $palabras_clave
 * @property bool $publico
 * @property string $carrera
 * @property string|null $asesor_externo
 * @property string $empresa
 * @property string $generacion
 * @property string|null $imagenes
 * @property string $created_by
 */
#[Fillable([
    'nombre_rep',
    'slug',
    'descripcion',
    'tipo_proyecto',
    'nivel_proyecto',
    'palabras_clave',
    'publico',
    'carrera',
    'asesor_externo',
    'empresa',
    'generacion',
    'imagenes',
    'created_by',
])]
class Repositorio extends Model
{
    /** @use HasFactory<RepositorioFactory> */
    use HasFactory;

    protected function casts(): array
    {
        return [
            'publico' => 'boolean',
        ];
    }

    public function getRouteKeyName(): string
    {
        return 'slug';
    }

    public function users(): BelongsToMany
    {
        return $this->belongsToMany(User::class)->withTimestamps();
    }

    public function files(): HasMany
    {
        return $this->hasMany(File::class);
    }
}
