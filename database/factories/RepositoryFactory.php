<?php

namespace Database\Factories;

use App\Models\Career;
use App\Models\Company;
use App\Models\EducationLevel;
use App\Models\ProjectType;
use App\Models\Repository;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

/**
 * @extends Factory<Repository>
 */
class RepositoryFactory extends Factory
{
    protected $model = Repository::class;

    /**
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $title = fake()->unique()->sentence(3);
        $careerCode = fake()->randomElement(['TIC', 'ER', 'MM', 'MI', 'G', 'LI', 'PA', 'GCH', 'GDT']);
        $projectTypeCode = fake()->randomElement(['integrative', 'internship', 'special_project']);
        $academicDegreeCode = fake()->randomElement(['TSU', 'engineering']);

        $careerId = Career::query()->where('code', $careerCode)->value('id');
        $projectTypeId = ProjectType::query()->where('code', $projectTypeCode)->value('id');
        $educationLevelId = EducationLevel::query()->where('code', $academicDegreeCode)->value('id');

        return [
            'title' => $title,
            'slug' => Str::slug($title),
            'description' => fake()->paragraph(),
            'keywords' => implode(', ', fake()->words(4)),
            'is_public' => true,
            'career_id' => $careerId,
            'project_type_id' => $projectTypeId,
            'education_level_id' => $educationLevelId,
            'company_id' => null,
            'generation' => (string) fake()->numberBetween(2020, 2026),
            'created_by' => fake()->firstName(),
        ];
    }

    public function withCompany(): static
    {
        return $this->state(fn (): array => [
            'company_id' => Company::factory(),
        ]);
    }

    public function private(): static
    {
        return $this->state(fn (): array => ['is_public' => false]);
    }
}
