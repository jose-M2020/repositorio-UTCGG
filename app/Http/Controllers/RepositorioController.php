<?php

namespace App\Http\Controllers;

use Illuminate\Validation\ValidationException;
use Illuminate\Support\Facades\Storage;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use App\Models\Repositorio;
// use App\Models\Alumno;
// use App\Models\Docente;
use App\Models\File;
use App\Models\Usuario;
use App\Models\Repositorio_usuario;
use Auth;

class RepositorioController extends Controller
{
    function __construct()
    {
         $this->middleware('can:repositorios.create')->only('create','store');
         $this->middleware('can:repositorios.edit')->only('edit','update');
         $this->middleware('can:repositorios.delete')->only('destroy');
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $filters = $request->all();
        unset($filters['page'], $filters['query'], $filters['search_field']);

        $search = $request->input('query');
        $search_field = $request->search_field ?? 'all';

        $repositorios = Repositorio::orderByDesc('created_at')
                ->when($search, function ($query, $search) use ($search_field) {
                    // if($search_field == 'all'){
                    //     return $query->where('nombre_alumno', 'like', '%'.$search.'%')
                    //                  ->orWhere('nombre_rep', 'like', '%'.$search.'%')
                    //                  ->orWhere('descripcion', 'like', '%'.$search.'%'); 
                    // }
                    if($search_field === 'title'){
                        return $query->where('nombre_rep', 'like', '%'.$search.'%');
                    }
                    if($search_field === 'description'){
                        return $query->where('descripcion', 'like', '%'.$search.'%');
                    }
                    if($search_field === 'author'){
                        return $query->whereHas('users', function ($query) use ($search){
                            $query->where('nombre', 'like', '%'.$search.'%');
                        });
                    }
                })
                ->when($request->carrera, function ($query, $career){
                    return $query->whereIn('carrera', $career);
                })
                ->when($request->tipo, function ($query, $type){
                    $query->whereIn('tipo_proyecto', $type);
                })
                ->when($request->nivel, function ($query, $level){
                    return $query->whereIn('nivel_proyecto', $level);
                })
                ->when($request->year, function ($query, $date){
                    return $query->whereBetween('created_at', [$date[0], $date[1]]);
                })
                ->where('publico', true)
                ->paginate(15);

        return view('repositorio.index', compact('repositorios', 'search', 'search_field', 'filters'));

        // $reps = Alumno::find(auth()->user()->id)->repositorios;
        // $asesor = Repositorio::find($reps[0]->id)->asesor;
        // $autores = Repositorio::find($reps[0]->id)->autores;
        // dd($reps);

        // foreach($reps as $r){
        //     echo($r->nombre.'<br>');
        // }
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create(Request $request)
    {
        // if(auth('alumno')){
        //     $id  e ge hehe jeje0= auth('alumno')->user()->id;
        //     return view('repositorio.create');
        // }
        return view('repositorio.create');
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {   
        $logged_user = auth()->user(); 
        $isEstadia = $request->tipo_proyecto == 'Estadía';

        // $docente_id = Usuario::where('email', $request->asesor_academico)->pluck('id')->first();

        $request->validate([
            'nombre_repositorio' => 'required|string|max:255',
            'descripcion' => 'required|string',
            'tipo_proyecto' => 'required|string|max:80',
            'nivel_proyecto' => 'required|string|max:80',
            'palabras_clave' => 'required|string|max:255',

            'usuario' => 'required|array|max:8',
            'usuario.*' => 'required|string|max:255|distinct|exists:usuarios,email',
            'carrera' => 'required|string|max:80',            
            'empresa' => 'required|string|max:255',
            // 'asesor_academico' => $isEstadia ? 'required|string|max:255|exists:usuarios,email' : '',
            'asesor_externo' => $isEstadia ? 'required|string|max:255' : '',
            'generacion' => 'required|string|max:255',
        ]);
        
        $repository_created = Repositorio::create([
            'nombre_rep' => $request->nombre_repositorio,
            'slug' => Str::slug($request->nombre_repositorio, '-'),
            'descripcion' => $request->descripcion,
            'tipo_proyecto' => $request->tipo_proyecto,
            'nivel_proyecto' => $request->nivel_proyecto,
            'palabras_clave' => $request->palabras_clave,
            'publico' => ($request->visibilidad === 'publico') ? true : false,
            'carrera' => $request->carrera,
            'empresa' => $request->empresa,
            'asesor_externo' => $request->asesor_externo ?? null,
            'generacion' => $request->generacion,
            'created_by' => $logged_user->nombre
        ]);

        $usersRep = Usuario::whereIn('email', $request->usuario)
                       ->get('id')
                       ->map(function ($item, $key) use ($repository_created) {
                             return [
                                 'repositorio_id' => $repository_created->id,
                                 'usuario_id' => $item->id
                             ];
                         })->toArray();

        Repositorio_usuario::insert($usersRep);
        
        return redirect()->route('files.create', $repository_created->slug)
                         ->with('status', 'Repositorio creado exitosamente!');
    }

    private function uploadFile($request, $typeFile)
    {
            // File path
            $currentYear = date("Y");
            $path = 'files/'.
                    $request->carrera .'/'.
                    $currentYear .'/'.
                    // $logged_user->cuatrimestre. '/'.
                    $request->usuario[0];

            $url_files_saved = [];

            if($request->hasfile($typeFile)) { 
                // foreach($request->file('imagenes') as $image)
                // {
                //     $image_path = $path.'/images';
                //     $image_stored = $image->storePublicly($image_path, 'public');
                //     $img[] = $image_stored;
                // }

                // Store files in Amazon S3
                foreach($request->file($typeFile) as $file)
                {
                    $file_path = $path. '/'. $typeFile;
                    $file_stored = $file->store($file_path, 's3');
                    $url_files_saved[] = Storage::disk('s3')->url($file_stored);

                    if($typeFile !== 'imagenes') {
                        $fileData[] = [
                            'original_name' => $file->getClientOriginalName(),
                            'file_type' => $file->extension(),
                            'file_path' => $file_stored,
                            'is_public' => 1
                        ];
                        // $archivo .= $file->getClientOriginalName().'|';
                        // $name = time().rand(1,100).'.'.$file->extension();
                        // $file->move(public_path('files'), $name);  
                        // $files[] = $name;  
                        // echo $file->getClientOriginalName();
                    }
                }
            }

            return $typeFile !== 'imagenes' ? $fileData : json_encode($url_files_saved);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show(Repositorio $repositorio)
    {   
        $user = auth()->user();
        $members = $repositorio->users;

        if(
            $repositorio->publico || 
            $user?->hasRole('admin') || 
            $members->find($user?->id)
        ) {
            // dd(explode(',', $repositorio->palabras_clave));
            $relatedItems = Repositorio::where('carrera', $repositorio->carrera)
                                       ->where('id', '!=' ,$repositorio->id)
                                       ->inRandomOrder()
                                       ->paginate(10);
                        
            $files = Repositorio::findOrFail($repositorio->id)
                                ->getFile
                                ->where('is_public', true);

            return view('repositorio.show', compact('repositorio', 'files','relatedItems'));
        }

        abort(404);
    }

    public function showByUser(Repositorio $repositorio)
    {   
        $usuarios = $repositorio->users()
                                ->get();
        $files = $repositorio->files()
                             ->get();
        $asesor = $repositorio->asesor()
                              ->get();
    
        return view('dashboard.repositorio.show', compact('repositorio', 'files', 'usuarios'));
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
    public function update(Request $request, Repositorio $repositorio)
    {
        $isEstadia = $request->tipo_proyecto == 'Estadía';

        $request->validate([
            'nombre_repositorio' => 'required|string|max:255',
            'descripcion' => 'required|string',
            'tipo_proyecto' => 'required|string|max:80',
            'nivel_proyecto' => 'required|string|max:80',
            'palabras_clave' => 'required|string|max:255',
            // 'usuario' => 'required|array|max:8',
            // 'usuario.*' => 'required|string|max:255|distinct|exists:usuarios,email',
            'carrera' => 'required|string|max:80',            
            'empresa' => 'required|string|max:255',
            'asesor_externo' => $isEstadia ? 'required|string|max:255' : '',
            'generacion' => 'required|string|max:255',
        ]);

        $repositorio->update([
            'nombre_rep' => $request->nombre_repositorio,
            'slug' => Str::slug($request->nombre_repositorio, '-'),
            'descripcion' => $request->descripcion,
            'tipo_proyecto' => $request->tipo_proyecto,
            'nivel_proyecto' => $request->nivel_proyecto,
            'palabras_clave' => $request->palabras_clave,
            'publico' => ($request->visibilidad === 'publico') ? true : false,
            'carrera' => $request->carrera,
            'empresa' => $request->empresa,
            'asesor_externo' => $request->asesor_externo ?? null,
            'generacion' => $request->generacion,
        ]);

        return redirect()->route('repositorios.user.show', $repositorio->slug)
                         ->with('status', 'Repositorio actualizado exitosamente!');
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(Repositorio $repositorio)
    {
        // dd($repositorio);
        $repositorio->delete();
        return redirect()->route('repositorios.index')
            ->with('status','Repositorio eliminado exitosamente!');
    }
    
    public function files($user){
        
    }
}
