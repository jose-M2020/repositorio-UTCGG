<?php

namespace App\Enums;

enum UserAccountStatus: string
{
    case PendingActivation = 'pending_activation';
    case Active = 'active';
    case Inactive = 'inactive';

    public function label(): string
    {
        return match ($this) {
            self::PendingActivation => 'Pendiente',
            self::Active => 'Activo',
            self::Inactive => 'Inactivo',
        };
    }

    public function canLogin(): bool
    {
        return $this === self::Active;
    }

    public function canToggleActive(): bool
    {
        return $this === self::Active || $this === self::Inactive;
    }
}
