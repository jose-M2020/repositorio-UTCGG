<?php

namespace App\Enums;

enum CatalogSource: string
{
    case User = 'user';
    case LegacyImport = 'legacy_import';

    public function label(): string
    {
        return match ($this) {
            self::User => 'Usuario',
            self::LegacyImport => 'Importacion legada',
        };
    }
}
