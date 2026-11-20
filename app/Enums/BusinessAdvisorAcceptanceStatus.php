<?php

namespace App\Enums;

enum BusinessAdvisorAcceptanceStatus: string
{
    case Pending = 'pending';
    case Confirmed = 'confirmed';
    case Rejected = 'rejected';

    public function label(): string
    {
        return match ($this) {
            self::Pending => 'Pendiente',
            self::Confirmed => 'Confirmado',
            self::Rejected => 'Rechazado',
        };
    }
}
