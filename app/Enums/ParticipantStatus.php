<?php

namespace App\Enums;

enum ParticipantStatus: string
{
    case Enrolled = 'enrolled';
    case Withdrawn = 'withdrawn';
    case Completed = 'completed';

    public function label(): string
    {
        return match ($this) {
            self::Enrolled => 'Inscrito',
            self::Withdrawn => 'Baja',
            self::Completed => 'Completado',
        };
    }
}
