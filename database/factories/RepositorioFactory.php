<?php

namespace Database\Factories;

use App\Models\Repositorio;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;
use App\Models\Docente;
use App\Models\Usuario;

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
        // static $students_id = [];
        $student = Usuario::
                        //  whereNotIn('id',$students_id)
                         inRandomOrder()
                         ->get(['id', 'nombre'])
                         ->first();
        // array_push($students_id, $student);

        // $docentes_id = Docente::pluck('id')->all();

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
        $keyword = implode(',',$careers[$career]);

        $title = $this->faker->sentence(5);

        return [
            // 'alumno' => json_encode([$this->faker->name()]),

            // ----Campos añadidos----------------
            // 'docente_id' => $this->faker->randomElement($docentes_id),
            'carrera' => $career,
            'asesor_externo' => $this->faker->name(),
            'empresa' => $this->faker->company(),
            // ------------------------------------

            'nombre_rep' => $title,
            'slug' => Str::slug($title, '-'),
            'descripcion' => $this->faker->text(600) ,
            'tipo_proyecto' => $this->faker->randomElement(['Integradora', 'Estadía', 'Proyecto Especial']),
            'nivel_proyecto' => $this->faker->randomElement(['TSU', 'Ingeniería']),

            // ----Campos añadidos----------------
            'palabras_clave' => $keyword,
            'publico' => 1,
            'generacion' => $this->faker->randomElement(['2018-2021', '2015-2018', '2013-2015', '2010-2013']),
            'imagenes' => json_encode(['https://source.unsplash.com/1600x900/?'.$keyword]),
            // ------------------------------------

            'created_by' => $student->nombre
        ];
    }
}
