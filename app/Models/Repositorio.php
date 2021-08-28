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
        'nombre_alumno',
        'nombre_rep',
        'descripcion',
        'tipo_proyecto',
        'nivel_proyecto'
    ];

}
