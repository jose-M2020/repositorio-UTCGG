<?php

namespace App\Enums;

enum AcademicPeriodStatus: string
{
    case Planned = 'planned';
    case Current = 'current';
    case Closed = 'closed';

    public function label(): string
    {
        return match ($this) {
            self::Planned => 'Planificado',
            self::Current => 'Actual',
            self::Closed => 'Cerrado',
        };
    }
}
