<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Alumno;
use Illuminate\Support\Facades\Hash;
use \Carbon\Carbon;

class AlumnoController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $filters = $request->all();
        $date_range = $request->rango_fecha;
        // unset($filters['date']);
        $alumnos = Alumno::orderBy('id', 'desc')
            ->when($request->carrera, function ($query, $carrera){
                return $query->whereIn('carrera', $carrera);
            })
            ->when($request->cuatrimestre, function ($query, $cuatrimestre){
                return $query->whereIn('cuatrimestre', $cuatrimestre);
            })
            ->when($request->fecha, function ($query, $date) use($date_range, $filters){
                if(!$date_range[0] && !$date_range[1]){
                    if($date == 'hoy'){
                        return $query->whereDay('created_at', date('d'));
                    }
                    if($date == 'semana'){
                        return $query->whereBetween('created_at', [Carbon::now()->startOfWeek(), Carbon::now()->endOfWeek()]);
                    }
                    if($date == 'mes'){
                        return $query->whereMonth('created_at', date('m'));
                    }
                    if($date == 'año'){
                        return $query->whereYear('created_at', date('Y'));
                    }
                }
            })
            ->when($date_range, function ($query, $date){
                if($date[0] && $date[1]){
                    return $query->whereBetween('created_at', [$date[0], $date[1]]);
                }
            })
            ->paginate(10, ['id', 'nombre', 'email', 'carrera', 'cuatrimestre', 'created_at']);
        // $docente = Alumno::findOrFail(1)->asesores;

        if($request->fecha){
            if(!$date_range[0] && !$date_range[1]){
                unset($filters['rango_fecha']);
            }
            if($date_range[0] && $date_range[1]){
                unset($filters['fecha']);
            }
            if(!$date_range[0] && $date_range[1] || $date_range[0] && !$date_range[1]){
                unset($filters['fecha']);
                unset($filters['rango_fecha']);
                $message = 'Ingrese un rango de fecha válido';
            }
        }
        else if($date_range){
            if(!$date_range[0] || !$date_range[1]) unset($filters['rango_fecha']);
        }

        return view('alumno.index', compact('alumnos','filters'));
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
            'nombre' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:alumnos',
            'contraseña' => ['required', 'confirmed'],
            'carrera' => 'required|string|max:20',
            'cuatrimestre' => 'required|integer|max:11'
        ]);

        $user = Alumno::create([
            'nombre' => $request->nombre,
            'email' => $request->email,
            'password' => Hash::make($request->contraseña),
            'carrera' => $request->carrera,
            'cuatrimestre' => $request->cuatrimestre
        ]);

        return redirect()->route('alumnos')
                ->with('status', 'Alumno registrado exitosamente!');
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
        // return view('alumno.edit', [
        //     'alumno' => Alumno::findOrFail($id)
        // ]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Alumno $alumno)
    {
        $request->validate([
            'nombre' => 'required|string|max:255',
            'carrera' => 'required|string|max:20',
            'cuatrimestre' => 'required|integer|max:11',
            'email' => 'required|string|email|max:255',
        ]);

        $alumno->nombre = $request->nombre;
        $alumno->email = $request->email;
        $alumno->carrera = $request->carrera;
        $alumno->cuatrimestre = $request->cuatrimestre;

        if($alumno->isDirty('email')){
            // El email ha sido cambiado
            $request->validate(['email' => 'unique:alumnos']);
        }

        $alumno->save();

        // Alumno::where('id', $id)->update([
        //     'nombre' => $request->nombre,
        //     'email' => $request->email,
        //     'carrera' => $request->carrera,
        //     'cuatrimestre' => $request->cuatrimestre
        // ]);

        return redirect()->route('alumnos')
            ->with('status','Alumno actualizado exitosamente!');
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(Alumno $alumno)
    {
        // Alumno::whereIn('id', [2, 4])->delete();
        // Alumno::where('id', $id)->delete();
        $alumno->delete();

        return redirect()->route('alumnos')
            ->with('status','Alumno eliminado exitosamente!');
    }

    public function fetch_data(Request $request){
        if($request->ajax()){
            $query = $request->get('query');
            $query = str_replace(" ", "%", $query);

            $alumnos = Alumno::where('nombre', 'like', '%'.$query.'%')->paginate(10, ['id', 'nombre', 'email', 'carrera', 'cuatrimestre', 'created_at']);
            return view('components.rowTables', compact('alumnos'))->render();
         }
    }

    public function search(Request $request){
        // if($request->ajax()){
            $query = $request->get('query');
            $query = str_replace(" ", "%", $query);
            if($query != ''){
                $students = Alumno::where('nombre', 'like', '%'.$query.'%')->paginate(10, ['id', 'nombre']);
                // return compact('students');
                return response()->json($students);
            }
         // }
    }

}
