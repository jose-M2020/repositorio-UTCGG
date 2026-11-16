<?php

namespace App\Enums;

enum Shift: string
{
    case Morning = 'morning';
    case Afternoon = 'afternoon';
    case Mixed = 'mixed';

    public function label(): string
    {
        return match ($this) {
            self::Morning => 'Matutino',
            self::Afternoon => 'Vespertino',
            self::Mixed => 'Mixto',
        };
    }
}
