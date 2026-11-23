<?php

namespace App\Enums;

enum PrivacyRequestStatus: string
{
    case Open = 'open';
    case Resolved = 'resolved';
    case Rejected = 'rejected';

    public function label(): string
    {
        return match ($this) {
            self::Open => 'Abierta',
            self::Resolved => 'Resuelta',
            self::Rejected => 'Rechazada',
        };
    }
}
