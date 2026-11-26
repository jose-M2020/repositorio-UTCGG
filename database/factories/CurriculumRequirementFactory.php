<?php

namespace Database\Factories;

use App\Models\Curriculum;
use App\Models\CurriculumRequirement;
use App\Models\ProjectType;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<CurriculumRequirement>
 */
class CurriculumRequirementFactory extends Factory
{
    protected $model = CurriculumRequirement::class;

    public function definition(): array
    {
        return [
            'curriculum_id' => Curriculum::factory(),
            'project_type_id' => ProjectType::factory(),
            'term_number' => fake()->numberBetween(1, 6),
            'is_mandatory' => true,
            'notes' => null,
        ];
    }
}
