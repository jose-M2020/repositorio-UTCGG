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
    {   
        static $number = 1;

        $careers = [
            'TIC' => ['software', 'arduino', 'iot', 'webpage', 'app', 'electronic', 'raspberrypi', 'robotic', 'bot', 'system'],
            'G' => ['food', 'restaurant', 'drinks', 'desserts', 'cakes'],
            'MM' => ['car', 'mechanics', 'motor', 'motorcycles'],
            'ER' => ['solar', 'renewable', 'windmill', 'turbine', 'energy'],
            'PA' => ['food', 'aperitif', 'drinks'],
            'LI' => ['logistic', 'warehouse', 'freight', 'companies', 'shipping', 'freight'],
            'MI' => ['hydraulics', 'industrial', 'pneumatics'],
            'GCH' => ['statistics', 'accounting', 'report', 'money'],
            'GDT' => ['hotel', 'hospitality']
        ];

        $career = $this->faker->randomElement(array_keys($careers));
        $keyword = $this->faker->randomElement($careers[$career]);
        
        return [
            'alumno_id' => $number++,
            'alumno' => $this->faker->name(),

            // ----Campos añadidos----------------
            'carrera' => $career,
            'asesor_academico' => $this->faker->name(),
            'asesor_externo' => $this->faker->name(),
            'empresa' => $this->faker->company(),
            // ------------------------------------

            'nombre_rep' => $this->faker->sentence(5),
            'descripcion' => $this->faker->paragraph(),
            'tipo_proyecto' => $this->faker->randomElement(['Integradora', 'Estadía', 'Proyecto Especial']),
            'nivel_proyecto' => $this->faker->randomElement(['TSU', 'Ingeniería']),

            // ----Campos añadidos----------------
            'palabras_clave' => $keyword,
            // 'palabras_clave' = $this->faker->randomElement(['arduino', 'electronica', 'informatica', 'web', 'IOT', 'comida', 'hotel', 'auto', 'mecanica', 'automotriz', 'solar', 'administracion', 'banco', 'energias', 'reciclar', 'Gastronomía', 'mobliario', 'robotica', 'restaurante']),
            'generacion' => $this->faker->randomElement(['2018-2021', '2015-2018', '2013-2015', '2010-2013']),
            'imagenes' => 'https://source.unsplash.com/1600x900/?'.$keyword
            // ------------------------------------
        ];
    }
}


