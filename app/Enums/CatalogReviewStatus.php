<?php

namespace App\Enums;

enum CatalogReviewStatus: string
{
    case PendingReview = 'pending_review';
    case Verified = 'verified';
    case Rejected = 'rejected';
    case Merged = 'merged';
    case Inactive = 'inactive';

    public function label(): string
    {
        return match ($this) {
            self::PendingReview => 'Pendiente de validar',
            self::Verified => 'Validado',
            self::Rejected => 'Rechazado',
            self::Merged => 'Fusionado',
            self::Inactive => 'Inactivo',
        };
    }
}
