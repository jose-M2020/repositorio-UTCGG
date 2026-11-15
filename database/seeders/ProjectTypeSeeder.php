<?php

namespace Database\Seeders;

use App\Models\ProjectType;
use Illuminate\Database\Seeder;

class ProjectTypeSeeder extends Seeder
{
    public function run(): void
    {
        $projectTypes = [
            [
                'code' => 'integrative',
                'name' => 'Integradora',
                'sort_order' => 10,
                'is_active' => true,
                'is_team_project' => true,
                'requires_term' => false,
                'requires_internship_flow' => false,
                'requires_business_advisor' => false,
            ],
            [
                'code' => 'internship',
                'name' => 'Estadía',
                'sort_order' => 20,
                'is_active' => true,
                'is_team_project' => false,
                'requires_term' => false,
                'requires_internship_flow' => true,
                'requires_business_advisor' => true,
            ],
            [
                'code' => 'special_project',
                'name' => 'Proyecto Especial',
                'sort_order' => 30,
                'is_active' => true,
                'is_team_project' => false,
                'requires_term' => false,
                'requires_internship_flow' => false,
                'requires_business_advisor' => false,
            ],
        ];

        foreach ($projectTypes as $projectType) {
            $code = $projectType['code'];
            unset($projectType['code']);

            ProjectType::query()->updateOrCreate(
                ['code' => $code],
                $projectType,
            );
        }
    }
}