<?php

namespace App\Enums;

enum ProjectPeriodStatus: string
{
    case Draft = 'draft';
    case Open = 'open';
    case Closed = 'closed';

    public function label(): string
    {
        return match ($this) {
            self::Draft => 'Borrador',
            self::Open => 'Abierto',
            self::Closed => 'Cerrado',
        };
    }
}
