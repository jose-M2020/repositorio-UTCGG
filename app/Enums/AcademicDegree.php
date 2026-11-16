<?php

namespace App\Enums;

enum AcademicDegree: string
{
    case Bachelor = 'bachelor';
    case Master = 'master';
    case Doctorate = 'doctorate';
    case Other = 'other';

    public function label(): string
    {
        return match ($this) {
            self::Bachelor => 'Licenciatura',
            self::Master => 'Maestría',
            self::Doctorate => 'Doctorado',
            self::Other => 'Otro',
        };
    }
}
