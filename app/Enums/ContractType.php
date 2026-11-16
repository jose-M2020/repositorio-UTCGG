<?php

namespace App\Enums;

enum ContractType: string
{
    case FullTime = 'full_time';
    case PartTime = 'part_time';
    case Hourly = 'hourly';

    public function label(): string
    {
        return match ($this) {
            self::FullTime => 'Tiempo completo',
            self::PartTime => 'Medio tiempo',
            self::Hourly => 'Por horas',
        };
    }
}
