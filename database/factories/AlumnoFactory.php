<?php

namespace Database\Factories;

use App\Models\Alumno;
use Illuminate\Database\Eloquent\Factories\Factory;

class AlumnoFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Alumno::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        $firstName = $this->faker->unique()->firstname();
        
        return [
            'nombre' => $firstName,
            'apellido' => $this->faker->lastname(),
            'email' => $firstName.'@gmail.com',
            'password' => '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi',
            'carrera' => $this->faker->randomElement(['TIC', 'G', 'MM', 'ER', 'PA', 'LI', 'MI', 'GCH', 'GDT']),
            'cuatrimestre' => $this->faker->randomElement([3, 5, 6, 11])
        ];
    }
}
