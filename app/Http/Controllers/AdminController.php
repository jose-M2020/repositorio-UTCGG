<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Admin;
use Illuminate\Support\Facades\Hash;
use Carbon\Carbon;

class AdminController extends Controller
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

        $admins = Admin::orderBy('id', 'desc')
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

        return view('admin.index', compact('admins','filters'));
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        return view('admin.create');
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
            'email' => 'required|string|email|max:255|unique:admin',
            'contraseña' => ['required', 'confirmed'],
        ]);
        
        $user = Admin::create([
            'nombre' => $request->nombre,
            'email' => $request->email,
            'password' => Hash::make($request->contraseña)
        ]);

        return redirect()->route('admin.index')
                ->with('status', 'Administrador registrado exitosamente!');
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
    public function update(Request $request, Admin $admin)
    {
        $request->validate([
            'nombre' => 'required|string|max:255',
            'email' => 'required|string|email|max:255',
        ]);

        $admin->nombre = $request->nombre;
        $admin->email = $request->email;

        if($admin->isDirty('email')){
            // El email ha sido cambiado
            $request->validate(['email' => 'unique:admin']);
        }
        $admin->save();

        return redirect()->route('admin.index')
            ->with('status','Administrador actualizado exitosamente!');
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(Admin $admin)
    {
        $admin->delete();
        return redirect()->route('docentes.index')
            ->with('status','Docente eliminado exitosamente!');
    }
}
