<?php

namespace App\Enums;

enum CareerPosition: string
{
    case Teacher = 'teacher';
    case CareerDirector = 'career_director';
    case Coordinator = 'coordinator';

    public function label(): string
    {
        return match ($this) {
            self::Teacher => 'Docente',
            self::CareerDirector => 'Director de carrera',
            self::Coordinator => 'Coordinador',
        };
    }
}
