<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Docente;
use Illuminate\Support\Facades\Hash;

class DocenteController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $docentes = Docente::orderBy('id', 'desc')->paginate(10, ['id', 'nombre', 'email', 'created_at']);
        // foreach($asesorados as $alumno){
        //     echo($alumno->nombre.'<br>');
        // }

        return view('docente.index', compact('docentes'));
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        return view('docente.create');
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $request->validate([
            'nombre' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:docentes',
            'contraseña' => ['required', 'confirmed'],
        ]);
        
        $user = Docente::create([
            'nombre' => $request->nombre,
            'email' => $request->email,
            'password' => Hash::make($request->contraseña)
        ]);

        return redirect('/docentes/create')
                ->with('status', 'Docente registrado exitosamente!');
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
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Docente $docente)
    {
        $request->validate([
            'nombre' => 'required|string|max:255',
            'email' => 'required|string|email|max:255'
        ]);

        $docente->nombre = $request->nombre;
        $docente->email = $request->email;

        if($docente->isDirty('email')){
            // El email ha sido cambiado
            $request->validate(['email' => 'unique:docentes']);
        }
        $docente->save();

        return redirect()->route('docentes.index')
            ->with('status','Docente actualizado exitosamente!');
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(Docente $docente)
    {
        $docente->delete();
        return redirect()->route('docentes.index')
            ->with('status','Docente eliminado exitosamente!');
    }
}
