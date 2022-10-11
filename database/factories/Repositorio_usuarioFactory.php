<?php

namespace Database\Factories;

use App\Models\Repositorio_usuario;
use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\Repositorio;
use App\Models\Docente;
use App\Models\Usuario;

class Repositorio_usuarioFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Repositorio_usuario::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {   
        // TODO: insert multuple users with role alumno and once with role docente

        static $idReps = [];

        $repositorio = Repositorio::whereNotIn('id',$idReps)
                                  ->inRandomOrder()
                                  ->get(['id', 'created_by'])
                                  ->first();

        array_push($idReps, $repositorio->id);
        
        $usuario_id = Usuario::inRandomOrder()
                             ->role(['alumno'])
                             ->value('id');

        // $usuario_id = Usuario::doesntHave('repositories')->inRandomOrder()->get()->first();

        return [
            'usuario_id' => $usuario_id,
            'repositorio_id' => $repositorio->id
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
