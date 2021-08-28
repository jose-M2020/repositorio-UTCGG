<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Alumno;
use Illuminate\Support\Facades\Hash;

class AlumnoController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $alumnos = Alumno::paginate(10, ['id', 'nombre', 'email', 'carrera', 'cuatrimestre']);

        // $docente = Alumno::findOrFail(1)->asesor;
        // print_r($docente->nombre);
        return view('alumno.index', compact('alumnos'));
    }

    public function fetch_data(Request $request){
        if($request->ajax()){
            $query = $request->get('query');
            $query = str_replace(" ", "%", $query);

            $alumnos = Alumno::where('nombre', 'like', '%'.$query.'%')->paginate(10, ['id', 'nombre', 'email', 'carrera', 'cuatrimestre']);
            return view('components.rowTables', compact('alumnos'))->render();
         }
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        return view('alumno.create');
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
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:alumnos',
            'password' => ['required', 'confirmed'],
            'carrera' => 'required|string|max:20',
            'cuatrimestre' => 'required|integer|max:11'
        ]);

        $user = Alumno::create([
            'nombre' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'carrera' => $request->carrera,
            'cuatrimestre' => $request->cuatrimestre
        ]);

        return redirect('/alumnos/registrar')
                ->with('success', 'Alumno registrado exitosamente!');
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
        return view('alumno.edit', [
            'alumno' => Alumno::findOrFail($id)
        ]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255',
            'carrera' => 'required|string|max:20',
            'cuatrimestre' => 'required|integer|max:11'
        ]);

        Alumno::where('id', $id)->update([
            'nombre' => $request->name,
            'email' => $request->email,
            'carrera' => $request->carrera,
            'cuatrimestre' => $request->cuatrimestre
        ]);
        // $id->update($request->all());

        return redirect()->route('alumnos')
            ->with('success','Alumno actualizado exitosamente!');
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        Alumno::where('id', $id)->delete();

        return redirect()->route('alumnos')
            ->with('success','Alumno eliminado exitosamente!');
    }

    public function search(Request $request){
        if($request->ajax()){
            $query = $request->get('query');
            $query = str_replace(" ", "%", $query);
            if($query != ''){
                $alumnos = Alumno::where('nombre', 'like', '%'.$query.'%')->paginate(10, ['id', 'nombre']);
                return compact('alumnos');
            }
         }
    }
}
