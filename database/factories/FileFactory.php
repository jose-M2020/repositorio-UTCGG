<?php

namespace Database\Factories;

use App\Models\File;
use Illuminate\Database\Eloquent\Factories\Factory;

class FileFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = File::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {       
        static $number = 1;
        
        return [
            // 'repositorio_id' => $this->faker->unique()->numberBetween(1, 30),
            'repositorio_id' => $number++,
            // 'alumno_id' => $number++,
            'original_name' => 'Documentación',
            'file_type' => 'pdf',
            'file_path' => 'files/test/Proyecto Repositorio-UT.pdf',
            'is_public' => '1'
        ];
    }

    public function random_number()
    {
        $numbers = range(1, 30);
        shuffle($numbers);

        for($i = 0; $i < sizeof($numbers); $i++){
            echo $i;
        }
    }
}
