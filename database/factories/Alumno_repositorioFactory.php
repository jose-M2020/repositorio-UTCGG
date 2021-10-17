<?php

namespace Database\Factories;

use App\Models\Alumno_repositorio;
use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\Repositorio;
use App\Models\Docente;
use App\Models\Alumno;

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
        static $students_name = [];
        $repositorio = Repositorio::whereNotIn('created_by',$students_name)
                                    ->inRandomOrder()
                                    ->get(['id', 'created_by'])
                                    ->first();
        array_push($students_name, $repositorio->created_by);
        $alumno_id = Alumno::where('nombre', $repositorio->created_by)
                            ->value('id');

        // $repositorio = Repositorio::all()->random();
        // $a = $
        // $alumno_id = Alumno::where('nombre', $repositorio->created_by)->value('id');

        return [
            'alumno_id' => $alumno_id,
            'repositorio_id' => $repositorio->id,
            'docente_id' => Docente::all()->random()->id,
        ];
    }

    public function get_repositorio()
    {   
        // static $repositorios = Repositorio::pluck('created_by', 'id')->toArray();
        // $rep_id = array_rand($repositorios);
        // $rep_name = $repositorios[$id_rep];
        // unset($repositorios[$rep_id])



        // $alumno = Alumno::all()->random();
        // $repositorio_id = Repositorio::where('created_by', $alumno->nombre)->value('id');

        // if(!$repositorio_id){
        //     self::get_repositorio();
        // }else{
        //     return [$alumno->id, $repositorio_id];
        // }
    }
}
