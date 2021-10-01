<?php

namespace Database\Factories;

use App\Models\Alumno_repositorio;
use Illuminate\Database\Eloquent\Factories\Factory;

class Alumno_repositorioFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Alumno_repositorio::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        static $number = 1;

        return [
            'alumno_id' => $number,
            'repositorio_id' => $number++,
            'docente_id' => $this->faker->randomElement([1,2,3]),
        ];
    }
}
