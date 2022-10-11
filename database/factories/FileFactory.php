<?php

namespace Database\Factories;

use App\Models\File;
use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\Repositorio;

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
        static $repositories_id = [];
        $repository_id = Repositorio::whereNotIn('id',$repositories_id)
                                    ->inRandomOrder()
                                    ->get('id')
                                    ->first()
                                    ->id;
        array_push($repositories_id, $repository_id);

        return [
            'repositorio_id' => $repository_id,
            'original_name' => 'Documentación',
            'file_type' => 'pdf',
            'file_path' => 'files/test/Documentación.pdf',
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
