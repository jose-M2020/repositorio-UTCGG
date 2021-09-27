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
        'descripcion',
        'tipo_proyecto',
        'nivel_proyecto',

        'palabras_clave',
        'generacion',
        'imagenes'
    ];

    public function getFile()
    {
        return $this->hasMany(File::class, 'repositorio_id');
    }
}
