<?php

namespace App\Enums;

enum PrivacyRequestType: string
{
    case Access = 'access';
    case Rectification = 'rectification';
    case Cancellation = 'cancellation';
    case Opposition = 'opposition';

    public function label(): string
    {
        return match ($this) {
            self::Access => 'Acceso',
            self::Rectification => 'Rectificacion',
            self::Cancellation => 'Cancelacion',
            self::Opposition => 'Oposicion',
        };
    }
}
