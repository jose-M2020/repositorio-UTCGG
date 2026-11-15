<?php

namespace Database\Seeders;

use App\Models\Career;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class CareerSeeder extends Seeder
{
    public function run(): void
    {
        $careers = [
            ['TIC', 'Tecnologías de la Información y Comunicación', 10, true, '/img/carrerasBG/TI.jpg', true],
            ['G', 'Gastronomía', 20, true, '/img/carrerasBG/G.jpg', true],
            ['MM', 'Metal Mecánica', 30, true, '/img/carrerasBG/MM.jpg', true],
            ['ER', 'Energías Renovables', 40, true, '/img/carrerasBG/ER.jpg', true],
            ['PA', 'Procesos Alimentarios', 50, true, '/img/carrerasBG/PA.jpg', false],
            ['LI', 'Logística Internacional', 60, true, '/img/carrerasBG/DIE.jpg', true],
            ['MI', 'Mantenimiento Industrial', 70, true, '/img/carrerasBG/MI.jpg', true],
            ['GCH', 'Gestión del Capital Humano', 80, true, '/img/carrerasBG/GCH.jpg', false],
            ['GDT', 'Gestión y Desarrollo Turístico', 90, true, '/img/carrerasBG/GDT.jpg', false],
        ];

        $usedSlugs = Career::query()->pluck('slug')->flip()->all();

        foreach ($careers as [$code, $name, $sortOrder, $isActive, $imagePath, $showOnHome]) {
            $existing = Career::query()->where('code', $code)->first();

            $attributes = [
                'name' => $name,
                'sort_order' => $sortOrder,
                'is_active' => $isActive,
                'show_on_home' => $showOnHome,
            ];

            if ($existing === null) {
                $attributes['slug'] = $this->uniqueSlug($name, $usedSlugs);
                $attributes['image_path'] = $imagePath;
            } elseif ($existing->image_path === null || $existing->image_path === '') {
                $attributes['image_path'] = $imagePath;
            }

            Career::query()->updateOrCreate(
                ['code' => $code],
                $attributes,
            );
        }
    }

    /**
     * @param  array<string, mixed>  $usedSlugs
     */
    private function uniqueSlug(string $name, array &$usedSlugs): string
    {
        $base = Str::slug($name) ?: 'career';
        $slug = $base;
        $suffix = 2;

        while (isset($usedSlugs[$slug])) {
            $slug = "{$base}-{$suffix}";
            $suffix++;
        }

        $usedSlugs[$slug] = true;

        return $slug;
    }
}