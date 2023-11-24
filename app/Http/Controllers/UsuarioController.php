<?php

namespace App\Http\Controllers;

use App\Http\Requests\SaveUserRequest;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use \Carbon\Carbon;
use PhpParser\Builder\Use_;
use Auth;

use App\Models\Usuario;
use App\Models\Repositorio;
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
        $this->middleware('can:usuarios.destroy')->only('destroy');
        $this->middleware('can:usuarios.search')->only('search');
    
        $this->roles = Role::all()->pluck('name')->toArray();
    }

    public function index(Request $request)
    {
        $filters = $request->all();
        $date_range = $request->rango_fecha ?? ['', ''];
        // unset($filters['date']);
        
        $roles = Role::pluck('name','id')->all();
        $users = $this->getData(
                    $request, 
                    ($request->rol && $request->rol !== 'all') ? [$request->rol] : ''
                 );
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

        return view('usuario.index', compact('users','filters','roles')); 
    }

    public function create()
    {
        $userRole = auth()->user()->roles[0]->name; 
        
        $roles = Role::pluck('name','id')->all();

        if(($userRole !== 'admin') && (($key = array_search('admin',$roles)) !== false)){
            unset($roles[$key]);
        }
        
        return view('usuario.create', compact('roles'));
    }

    public function store(SaveUserRequest $request)
    {
        $validatedData = $request->validated();
        $validatedData['password'] = Hash::make($validatedData['password']);

        $user = Usuario::create($validatedData);
        
        $user->assignRole($request->rol);

        return redirect()->route('usuarios.index')
                ->with('status', 'Alumno registrado exitosamente!');
    }

    public function show(Usuario $usuario)
    {
        $user = auth()->user();
        $repositorios = Usuario::find($user->id)->repositories()
                                   ->orderBy('repositorios.created_at', 'desc')
                                   ->get(['nombre_rep', 'slug', 'publico']);
                
        $repPublico = $repositorios->where('publico', true);
        $repPrivado = $repositorios->where('publico', false);

        return view('usuario.show', compact('usuario','repPublico','repPrivado'));
    }

    public function showRepositories(Request $request)
    {
        $user = auth()->user();

        if($user->roles[0]->name === 'admin'){
            $repositorios = Repositorio::orderByDesc('created_at')
                                       ->paginate(15);
        } else{
            $repositorios = Usuario::find($user->id)->repositories()
                                   ->orderBy('created_at', 'desc')
                                   ->paginate(15);
        }

        return view('dashboard.repositorio.index', compact('repositorios'));
    }

    // public function showRepository(Usuario $usuario, Repositorio $repositorio)
    // {
    //     $files = $usuario->files()
    //     ->get();
        
    //     dd($files);

    //     return view('dashboard.repositorio.show', compact('repositorio'));
    // }

    public function edit(Usuario $usuario)
    {
        $roles = Role::pluck('name','id')->all();

        return view('usuario.edit', compact('usuario','roles'));
    }

    public function update(SaveUserRequest $request, Usuario $usuario)
    {
        if(($usuario->roles[0]->name) !== $request->rol){
            $usuario->syncRoles([$request->rol]);
        }

        $usuario->update($request->validated());

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

    public function search(Request $request, Repositorio $repositorio)
    {           
        // $members = $repositorio->users;
        
        $users = $this->getData($request, ['alumno', 'docente'], ['id', 'nombre', 'apellido', 'email']);
        $view = view('components.user-preview', compact('users'))->render();

        return response()->json([
            'result' => $users,
            'view' => $view
        ]);
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
            // ->where('id', '!=' , auth()->id())
            ->paginate(10, $fields ?? $this->fields)
            ->withQueryString();

        return $users;
    }
}
