<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;

class Alumno extends Authenticatable
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'nombre',
        'email',
        'password',
        'carrera',
        'cuatrimestre',
        'created_at'
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    // protected $casts = [
    //     'email_verified_at' => 'datetime',
    // ];

    public function asesores()
    {
        return $this->hasManyThrough(Docente::class, Repositorio::class);
        // return $this->belongsToMany(Docente::class, 'alumnos_repositorios');
    }

    public function repositorios()
    {
        return $this->belongsToMany(Repositorio::class, 'alumnos_repositorios');
    }
}
