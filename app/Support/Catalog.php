<?php

namespace App\Support;

final class Catalog
{
    /**
     * @return array<string, string>
     */
    public static function careers(): array
    {
        return [
            'TIC' => 'Tecnologías de la Información y Comunicación',
            'G' => 'Gastronomía',
            'MM' => 'Metal Mecánica',
            'ER' => 'Energías Renovables',
            'PA' => 'Procesos Alimentarios',
            'LI' => 'Logística Internacional',
            'MI' => 'Mantenimiento Industrial',
            'GCH' => 'Gestión del Capital Humano',
            'GDT' => 'Gestión y Desarrollo Turístico',
        ];
    }

    /**
     * @return array<string, string>
     */
    public static function academicDegrees(): array
    {
        return [
            'TSU' => 'Técnico Superior Universitario',
            'Ingeniería' => 'Ingeniería',
        ];
    }

    /**
     * @return list<string>
     */
    public static function projectTypes(): array
    {
        return ['Integradora', 'Estadía', 'Proyecto Especial'];
    }
}
