<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class File extends Model
{
    use HasFactory;
    protected $fillable = [
        'repositorio_id',
        'alumno_id',
        'original_name',
        'file_type',
        'file_path',
        'is_public'
    ];
}
