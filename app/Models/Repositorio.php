<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Repositorio extends Model
{
    use HasFactory;

    // protected $table = 'repositorios';
    protected $fillable = [
        'alumno_id',
        'alumno',

        'carrera',
        'asesor_academico',
        'asesor_externo',
        'empresa',

        'nombre_rep',
        'slug',
        'descripcion',
        'tipo_proyecto',
        'nivel_proyecto',

        'palabras_clave',
        'generacion',
        'imagenes',
        'created_by'
    ];

    public function getFile()
    {
        return $this->hasMany(File::class, 'repositorio_id');
    }

    public function find_by_career($career)
    {
        return $this->belongsToMany(Alumno::class, 'alumnos_repositorios')
                    ->wherePivot('carrera', $career);
    }

    public function getRouteKeyName()
    {
        return 'slug';
    }
}
