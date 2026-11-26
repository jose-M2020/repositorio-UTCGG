<?php

namespace Database\Factories;

use App\Models\Curriculum;
use App\Models\CurriculumStage;
use App\Models\EducationLevel;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<CurriculumStage>
 */
class CurriculumStageFactory extends Factory
{
    protected $model = CurriculumStage::class;

    public function definition(): array
    {
        return [
            'curriculum_id' => Curriculum::factory(),
            'education_level_id' => EducationLevel::factory(),
            'position' => 1,
            'first_term_number' => 1,
            'total_terms' => 6,
            'degree_title' => fake()->optional()->sentence(3),
        ];
    }
}
