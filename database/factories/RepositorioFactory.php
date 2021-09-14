<?php

namespace Database\Factories;

use App\Models\Repositorio;
use Illuminate\Database\Eloquent\Factories\Factory;

class RepositorioFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Repositorio::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {   static $number = 1;

        return [
            'alumno_id' => $number++,
            'nombre_alumno' => $this->faker->name(),

            'nombre_rep' => $this->faker->sentence(5),
            'descripcion' => $this->faker->paragraph(),
            'tipo_proyecto' => $this->faker->randomElement(['Integradora', 'Estadía', 'Proyecto Especial']),
            'nivel_proyecto' => $this->faker->randomElement(['TSU', 'Ingeniería']),

        ];
    }
}
