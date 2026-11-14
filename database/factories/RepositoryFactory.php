<?php

namespace Database\Factories;

use App\Models\Catalog;
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

        return [
            'title' => $title,
            'slug' => Str::slug($title),
            'description' => fake()->paragraph(),
            'keywords' => implode(', ', fake()->words(4)),
            'is_public' => true,
            'career_catalog_id' => Catalog::query()
                ->where('type', Catalog::TYPE_CAREER)
                ->where('code', $careerCode)
                ->value('id'),
            'project_type_catalog_id' => Catalog::query()
                ->where('type', Catalog::TYPE_PROJECT)
                ->where('code', $projectTypeCode)
                ->value('id'),
            'academic_degree_catalog_id' => Catalog::query()
                ->where('type', Catalog::TYPE_ACADEMIC_DEGREE)
                ->where('code', $academicDegreeCode)
                ->value('id'),
            'external_advisor' => fake()->optional()->name(),
            'company' => fake()->company(),
            'generation' => (string) fake()->numberBetween(2020, 2026),
            'created_by' => fake()->firstName(),
        ];
    }

    public function private(): static
    {
        return $this->state(fn (): array => ['is_public' => false]);
    }
}
