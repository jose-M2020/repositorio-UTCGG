<?php

namespace App\Enums;

enum UserType: string
{
    case Student = 'student';
    case Teacher = 'teacher';
    case Staff = 'staff';

    public function label(): string
    {
        return match ($this) {
            self::Student => 'Alumno',
            self::Teacher => 'Docente',
            self::Staff => 'Personal',
        };
    }
}
