<?php

namespace Database\Factories;

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

        return [
            'nombre_rep' => $nombre,
            'slug' => Str::slug($nombre),
            'descripcion' => fake()->paragraph(),
            'tipo_proyecto' => fake()->randomElement(['Estadía', 'Proyecto', 'Investigación']),
            'nivel_proyecto' => fake()->randomElement(['TSU', 'Ingeniería']),
            'palabras_clave' => implode(', ', fake()->words(4)),
            'publico' => true,
            'carrera' => fake()->randomElement(['TI', 'ER', 'MM', 'MI']),
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
