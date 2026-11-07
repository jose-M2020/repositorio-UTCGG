<?php

namespace Database\Seeders;

use App\Models\Catalog;
use Illuminate\Database\Seeder;

class CatalogSeeder extends Seeder
{
    public function run(): void
    {
        $catalogs = [
            [Catalog::TYPE_CAREER, 'TIC', 'Tecnologías de la Información y Comunicación', 10, true, ['image' => '/img/carrerasBG/TI.jpg', 'show_on_home' => true]],
            [Catalog::TYPE_CAREER, 'G', 'Gastronomía', 20, true, ['image' => '/img/carrerasBG/G.jpg', 'show_on_home' => true]],
            [Catalog::TYPE_CAREER, 'MM', 'Metal Mecánica', 30, true, ['image' => '/img/carrerasBG/MM.jpg', 'show_on_home' => true]],
            [Catalog::TYPE_CAREER, 'ER', 'Energías Renovables', 40, true, ['image' => '/img/carrerasBG/ER.jpg', 'show_on_home' => true]],
            [Catalog::TYPE_CAREER, 'PA', 'Procesos Alimentarios', 50, true, ['image' => '/img/carrerasBG/PA.jpg', 'show_on_home' => false]],
            [Catalog::TYPE_CAREER, 'LI', 'Logística Internacional', 60, true, ['image' => '/img/carrerasBG/DIE.jpg', 'show_on_home' => true]],
            [Catalog::TYPE_CAREER, 'MI', 'Mantenimiento Industrial', 70, true, ['image' => '/img/carrerasBG/MI.jpg', 'show_on_home' => true]],
            [Catalog::TYPE_CAREER, 'GCH', 'Gestión del Capital Humano', 80, true, ['image' => '/img/carrerasBG/GCH.jpg', 'show_on_home' => false]],
            [Catalog::TYPE_CAREER, 'GDT', 'Gestión y Desarrollo Turístico', 90, true, ['image' => '/img/carrerasBG/GDT.jpg', 'show_on_home' => false]],
            [Catalog::TYPE_ACADEMIC_DEGREE, 'TSU', 'Técnico Superior Universitario', 10, true, null],
            [Catalog::TYPE_ACADEMIC_DEGREE, 'Ingeniería', 'Ingeniería', 20, true, null],
            [Catalog::TYPE_PROJECT, 'Integradora', 'Integradora', 10, true, null],
            [Catalog::TYPE_PROJECT, 'Estadía', 'Estadía', 20, true, null],
            [Catalog::TYPE_PROJECT, 'Proyecto Especial', 'Proyecto Especial', 30, true, null],
        ];

        foreach ($catalogs as [$type, $code, $name, $sortOrder, $isActive, $meta]) {
            Catalog::query()->updateOrCreate(
                ['type' => $type, 'code' => $code],
                [
                    'name' => $name,
                    'sort_order' => $sortOrder,
                    'is_active' => $isActive,
                    'meta' => $meta,
                ],
            );
        }
    }
}
