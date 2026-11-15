<?php

namespace Database\Seeders;

use App\Models\EducationLevel;
use Illuminate\Database\Seeder;

class EducationLevelSeeder extends Seeder
{
    public function run(): void
    {
        $levels = [
            ['TSU', 'Técnico Superior Universitario', 10, true],
            ['engineering', 'Ingeniería', 20, true],
        ];

        foreach ($levels as [$code, $name, $sortOrder, $isActive]) {
            EducationLevel::query()->updateOrCreate(
                ['code' => $code],
                [
                    'name' => $name,
                    'sort_order' => $sortOrder,
                    'is_active' => $isActive,
                ],
            );
        }
    }
}