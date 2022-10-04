<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Models\Repositorio;
use App\Models\Repositorio_usuario;

class RepositorioUsuarioController extends Controller
{
    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request, Repositorio $repositorio)
    {
        $repositorioId = $repositorio->id;
        
        foreach ($request->user as $id) {
            $usersRep[] = [
                'repositorio_id' => $repositorioId,
                'usuario_id' => $id
            ];
        }

        Repositorio_usuario::insert($usersRep);

        return redirect()->route('repositorios.user.show', $repositorio->slug)
                         ->with('status', 'Miembros agregados!');
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(Repositorio $repositorio, $usuario)
    {
        $item = Repositorio_usuario::where('repositorio_id', $repositorio->id)
                                   ->where('usuario_id', $usuario)
                                   ->delete();
    
        return redirect()->route('repositorios.user.show', $repositorio->slug)
                         ->with('status', 'Miembro removido!');
    }
}
