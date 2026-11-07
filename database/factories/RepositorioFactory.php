<?php

namespace Database\Factories;

use App\Models\Catalog;
use App\Models\Repositorio;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

/**
 * @extends Factory<Repositorio>
 */
class RepositorioFactory extends Factory
{
    /**
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $nombre = fake()->unique()->sentence(3);
        $careerCode = fake()->randomElement(['TIC', 'ER', 'MM', 'MI', 'G', 'LI', 'PA', 'GCH', 'GDT']);
        $projectTypeCode = fake()->randomElement(['Integradora', 'Estadía', 'Proyecto Especial']);
        $academicDegreeCode = fake()->randomElement(['TSU', 'Ingeniería']);

        return [
            'nombre_rep' => $nombre,
            'slug' => Str::slug($nombre),
            'descripcion' => fake()->paragraph(),
            'tipo_proyecto' => $projectTypeCode,
            'nivel_proyecto' => $academicDegreeCode,
            'palabras_clave' => implode(', ', fake()->words(4)),
            'publico' => true,
            'carrera' => $careerCode,
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
            'asesor_externo' => fake()->optional()->name(),
            'empresa' => fake()->company(),
            'generacion' => (string) fake()->numberBetween(2020, 2026),
            'created_by' => fake()->firstName(),
        ];
    }

    public function private(): static
    {
        return $this->state(fn (): array => ['publico' => false]);
    }
}
