<?php

namespace Database\Seeders;

use App\Models\Career;
use App\Models\Curriculum;
use App\Models\EducationLevel;
use App\Models\ProjectType;
use App\Services\Academic\CurriculumService;
use Illuminate\Database\Seeder;

/**
 * Example curriculum for local/dev/tests only. Production plans are configured in the UI.
 */
class DevelopmentCurriculumSeeder extends Seeder
{
    public function run(): void
    {
        $career = Career::query()->where('code', 'TIC')->first();
        $tsu = EducationLevel::query()->where('code', 'TSU')->first();
        $ing = EducationLevel::query()->where('code', 'engineering')->first();
        $integrative = ProjectType::query()->where('code', 'integrative')->first();
        $internship = ProjectType::query()->where('code', 'internship')->first();

        if ($career === null || $tsu === null || $integrative === null || $internship === null) {
            return;
        }

        if (Curriculum::query()->where('career_id', $career->id)->where('name', 'Plan ejemplo 2022')->exists()) {
            return;
        }

        $service = app(CurriculumService::class);
        $curriculum = $service->createCurriculum($career, [
            'name' => 'Plan ejemplo 2022',
            'applies_from' => '2022-09-01',
            'is_active' => true,
        ]);

        $service->addStage($curriculum, [
            'education_level_id' => $tsu->id,
            'total_terms' => 6,
            'degree_title' => 'TSU en Tecnologías de la Información',
        ]);

        if ($ing !== null) {
            $service->addStage($curriculum->fresh(['stages']), [
                'education_level_id' => $ing->id,
                'total_terms' => 6,
                'degree_title' => 'Ingeniería en Tecnologías de la Información',
            ]);
        }

        $curriculum->refresh()->load('stages');

        $service->addRequirement($curriculum, [
            'project_type_id' => $integrative->id,
            'term_number' => 6,
        ]);

        if ($ing !== null) {
            $service->addRequirement($curriculum, [
                'project_type_id' => $integrative->id,
                'term_number' => 9,
            ]);
            $service->addRequirement($curriculum, [
                'project_type_id' => $internship->id,
                'term_number' => 12,
            ]);
        } else {
            $service->addRequirement($curriculum, [
                'project_type_id' => $internship->id,
                'term_number' => 6,
            ]);
        }
    }
}
