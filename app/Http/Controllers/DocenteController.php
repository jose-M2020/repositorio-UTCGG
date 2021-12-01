<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Docente;
use Illuminate\Support\Facades\Hash;
use Carbon\Carbon;

class DocenteController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {   
        $filters = $request->all();
        $date_range = $request->rango_fecha ?? ['',''];

        $docentes = Docente::orderBy('id', 'desc')
            ->when($request->search_box, function ($query, $search_input) {
                return $query->where('nombre', 'like', '%'.$search_input.'%');
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
            ->paginate(10, ['id', 'nombre', 'email', 'created_at']);

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

        return view('docente.index', compact('docentes','filters'));
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

        return redirect()->route('docentes.index')
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
