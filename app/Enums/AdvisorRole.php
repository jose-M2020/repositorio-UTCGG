<?php

namespace App\Enums;

enum AdvisorRole: string
{
    case Primary = 'primary';
    case CoAdvisor = 'co_advisor';

    public function label(): string
    {
        return match ($this) {
            self::Primary => 'Asesor principal',
            self::CoAdvisor => 'Co-asesor',
        };
    }
}
