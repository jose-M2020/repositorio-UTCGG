<?php

namespace App\Enums;

enum AcademicStatus: string
{
    case Active = 'active';
    case TemporaryLeave = 'temporary_leave';
    case Dropped = 'dropped';
    case Graduated = 'graduated';
    case Titled = 'titled';

    public function label(): string
    {
        return match ($this) {
            self::Active => 'Activo',
            self::TemporaryLeave => 'Baja temporal',
            self::Dropped => 'Baja definitiva',
            self::Graduated => 'Egresado',
            self::Titled => 'Titulado',
        };
    }
}
