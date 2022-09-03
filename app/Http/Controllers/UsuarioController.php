<?php

namespace App\Http\Controllers;

use App\Models\Repositorio;
use Illuminate\Http\Request;
use App\Models\Usuario;
use Illuminate\Support\Facades\Hash;
use \Carbon\Carbon;
use PhpParser\Builder\Use_;

use Spatie\Permission\Models\Role;

class UsuarioController extends Controller
{
    private $fields = [
        'id', 'nombre', 'apellido', 'email', 'carrera', 'created_at'
    ];

    private $roles;

    public function __construct()
    {
        $this->middleware('can:usuarios.index')->only('index');
        $this->middleware('can:usuarios.create')->only('create','store');
        $this->middleware('can:usuarios.edit')->only('edit','update');
        $this->middleware('can:usuarios.delete')->only('destroy');
    
        $this->roles = Role::all()->pluck('name')->toArray();
    }

    public function index(Request $request)
    {
        $filters = $request->all();
        $date_range = $request->rango_fecha ?? ['', ''];
        // unset($filters['date']);
        
        $users = $this->getData($request);
        
        // $docente = Usuario::findOrFail(1)->asesores;

        if($request->fecha){
            if(!$date_range[0] && !$date_range[1]){
                unset($filters['rango_fecha']);
            }
            if($date_range[0] && $date_range[1]){
                unset($filters['fecha']);
            }
            if(!$date_range[0] && $date_range[1] || $date_range[0] && !$date_range[1]){
                unset($filters['fecha'],$filters['rango_fecha']);
                $message = 'Ingrese un rango de fecha válido';
            }
        }
        else if($date_range){
            if(!$date_range[0] || !$date_range[1]) unset($filters['rango_fecha']);
        }

        // TODO: obtener el rol e asignarlo en el array, y mostrarlo en la vista
        // foreach($users as $user){
        //     $userRole = $user->roles->pluck('name','id')->all();
        //     $user->roles = implode(', ',$userRole);
        // }

        return view('usuario.index', compact('users','filters')); 
    }

    public function create()
    {
        $roles = Role::pluck('name','id')->all();
        return view('usuario.create', compact('roles'));
    }

    public function store(Request $request)
    {
        $request->validate([
            'nombre' => 'required|string|max:255',
            'apellido' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:usuarios',
            'contraseña' => ['required', 'confirmed'],
            'carrera' => 'required|string|max:20',
            'rol' => 'required',
            // 'cuatrimestre' => 'required|integer|max:11'
        ]);

        $user = Usuario::create([
            'nombre' => $request->nombre,
            'apellido' => $request->apellido,
            'email' => $request->email,
            'password' => Hash::make($request->contraseña),
            'carrera' => $request->carrera,
            // 'cuatrimestre' => $request->cuatrimestre
        ]);

        $user->assignRole($request->rol);

        return redirect()->route('usuarios.index')
                ->with('status', 'Alumno registrado exitosamente!');
    }

    public function show($id)
    {
        //
    }

    public function showRepositories(Request $request)
    {
        $userId = auth()->id();

        $repositorios = Usuario::find($userId)->repositories()
                                ->get();

        return view('dashboard.repositorio.index', compact('repositorios'));
    }

    // public function showRepository(Usuario $usuario, Repositorio $repositorio)
    // {
    //     $files = $usuario->files()
    //     ->get();
        
    //     dd($files);

    //     return view('dashboard.repositorio.show', compact('repositorio'));
    // }

    public function edit($id)
    {
        //
    }

    public function update(Request $request, $id = null)
    {
        $request->validate([
            'nombre' => 'required|string|max:255',
            'apellido' => 'required|string|max:255',
            'carrera' => 'required|string|max:20',
            // 'cuatrimestre' => 'required|integer|max:11',
            'email' => 'required|string|email|max:255|unique:usuarios,email,'.$id,
        ]);

        Usuario::where('id', $id)->first()->update($request->all());

        return redirect()->route('usuarios.index')
            ->with('status','Alumno actualizado exitosamente!');
    }
    
    public function destroy(Usuario $usuario)
    {
        $usuario->delete();

        return redirect()->route('usuarios.index')
            ->with('status','Alumno eliminado exitosamente!');
    }

    public function fetch_data(Request $request){
        if($request->ajax()){
            $query = $request->get('query');
            $query = str_replace(" ", "%", $query);

            $users = Usuario::where('nombre', 'like', '%'.$query.'%')->paginate(10, ['id', 'nombre', 'email', 'carrera', 'cuatrimestre', 'created_at']);
            return view('components.rowTables', compact('users'))->render();
         }
    }

    public function search(Request $request)
    {    
        $users = $this->getData($request, ['alumno', 'docente'], ['id', 'nombre', 'apellido', 'email']);
        return response()->json($users);
    }

    private function getData($request, $roles = null, $fields = null){
        $date_range = $request->rango_fecha ?? ['', ''];

        $users = Usuario::orderBy('id', 'desc')
            ->when($request->input('query'), function ($query, $value) {
                return $query->where('nombre', 'like', '%'.$value.'%')
                             ->orWhere('apellido', 'like', '%'.$value.'%');
            })
            ->when($request->carrera, function ($query, $value){
                return $query->whereIn('carrera', $value);
            })
            // ->when($request->cuatrimestre, function ($query, $cuatrimestre){
            //     return $query->whereIn('cuatrimestre', $cuatrimestre);
            // })
            ->when($request->fecha, function ($query, $value) use($date_range){
                if(!$date_range[0] && !$date_range[1]){
                    if($value == 'hoy'){
                        return $query->whereDay('created_at', date('d'));
                    }
                    if($value == 'semana'){
                        return $query->whereBetween('created_at', [Carbon::now()->startOfWeek(), Carbon::now()->endOfWeek()]);
                    }
                    if($value == 'mes'){
                        return $query->whereMonth('created_at', date('m'));
                    }
                    if($value == 'año'){
                        return $query->whereYear('created_at', date('Y'));
                    }
                }
            })
            ->when($date_range, function ($query, $value){
                if($value[0] && $value[1]){
                    return $query->whereBetween('created_at', [$value[0], $value[1]]);
                }
            })
            ->role($roles ? $roles : $this->roles)
            ->paginate(10, $fields ?? $this->fields);

        return $users;
    }
}
