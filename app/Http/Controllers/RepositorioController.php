<?php

namespace App\Http\Controllers;

use Illuminate\Validation\ValidationException;
use Illuminate\Support\Facades\Storage;
use Illuminate\Http\Request;
use App\Models\Repositorio;
use App\Models\Alumno;
use App\Models\File;

class RepositorioController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $linkData = $request->all();

        $career = $request->query('carrera');
        $type = $request->query('tipo');
        $level = $request->query('nivel');
        $year = $request->input('year');

        $search_input = $request->input('query');
        $field = $request->input('search_field') ?? 'all';

        $repositorios = Repositorio::orderByDesc('created_at')
                ->when($search_input, function ($query, $search_input) use ($field) {
                    if($field == 'all'){
                        return $query->where('nombre_alumno', 'like', '%'.$search_input.'%')
                                     ->orWhere('nombre_rep', 'like', '%'.$search_input.'%')
                                     ->orWhere('descripcion', 'like', '%'.$search_input.'%'); 
                    }
                    return $query->where($field, 'like', '%'.$search_input.'%');
                })
                ->when($career, function ($query, $career){
                    return $query->whereIn('carrera', $career);
                })
                ->when($type, function ($query, $type){
                    $query->whereIn('tipo_proyecto', $type);
                })
                ->when($level, function ($query, $level){
                    return $query->whereIn('nivel_proyecto', $level);
                })
                ->when($year, function ($query, $year){
                    return $query->whereBetween('created_at', [$year[0], $year[1]]);
                })
                ->paginate(10);

        return view('repositorio.index', ['repositorios' => $repositorios, 
                                          'query' => $search_input,
                                          'search_field' => $field,
                                          'linkData' => $linkData
                                         ]);

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
        //     $id = auth('alumno')->user()->id;
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
        // $request->validate([
        //     'alumno' => 'required|array|max:8',
        //     'alumno.*' => 'required|string|max:255|distinct',

        //     // Nuevos campos
        //     'carrera' => 'required|string|max:80',
        //     'asesor_academico' => 'required|string|max:255',
        //     'asesor_externo' => 'required|string|max:255',
        //     'empresa' => 'required|string|max:255',
        //     // ---------------

        //     'nombre_repositorio' => 'required|string|max:255',
        //     'descripcion' => 'required|string|max:255',
        //     'tipo_proyecto' => 'required|string|max:80',
        //     'nivel_proyecto' => 'required|string|max:80',

        //     // Nuevos campos
        //     'palabras_clave' => 'required|string|max:255',
        //     'generacion' => 'required|string|max:255',
        //     'imagenes' => 'required|array|max:5',
        //     'imagenes.*' => 'required|file|distinct|mimes:png,jpg,jpeg',
        //     // -----------------

        //     'archivos' => 'required|array|max:5',
        //     'archivos.*' => 'required|file|distinct|mimes:zip,rar,pdf,doc,docx'
        // ]);

        $logged_user = auth()->user();
        // $data = Alumno::where('nombre', $request->alumno[0]);
        
        
        /*
        // Convertimos el o los nombres en una array codificado
        foreach($request->alumno as $name){
            $nombre_alumno[] = $name;
        }
        $authors = json_encode($nombre_alumno);
        
        if($logged_user){
            // Creamos la ruta donde se almacenaran los archivos e imagenes
            $currentYear = date("Y");
            $path = 'files/'.
                    $logged_user->carrera .'/'.
                    $currentYear .'/'.
                    $logged_user->cuatrimestre. '/'.
                    $logged_user->nombre;

            // Guardamos las imagenes y convertimos las rutas en una array codificado
            if($request->hasfile('imagenes')) { 
                foreach($request->file('imagenes') as $image)
                {
                    $image_path = $path.'/images';
                    $image_stored = $image->storePublicly($image_path, 'public');
                    $img[] = $image_stored;
                }
            }
            $images = json_encode($img);

            // Guardamos los datos en la base de datos
            $repository_created = Repositorio::create([
                // 'alumno_id' => $logged_user->id,
                'alumno' => $authors,

                'carrera' => $logged_user->carrera,
                'asesor_academico' => $request->asesor_academico,
                'asesor_externo' => $request->asesor_externo,
                'empresa' => $request->empresa,

                'nombre_rep' => $request->nombre_repositorio,
                'descripcion' => $request->descripcion,
                'tipo_proyecto' => $request->tipo_proyecto,
                'nivel_proyecto' => $request->nivel_proyecto,

                'palabras_clave' => $request->palabras_clave,
                'generacion' => $request->generacion,
                'imagenes' => $images
            ]);

            $archivo = '';
            if($request->hasfile('archivos')) {
                foreach($request->file('archivos') as $file) {   
                    $file_stored = $file->storePublicly($path, 'public');

                    File::create([
                        'repositorio_id' => $repository_created->id,
                        // 'alumno_id' => $logged_user->id,
                        'original_name' => $file->getClientOriginalName(),
                        'file_type' => $file->extension(),
                        'file_path' => $file_stored,
                        'is_public' => 0
                    ]);
                    // $archivo .= $file->getClientOriginalName().'|';
                    // $name = time().rand(1,100).'.'.$file->extension();
                    // $file->move(public_path('files'), $name);  
                    // $files[] = $name;  
                    // echo $file->getClientOriginalName();
                }
            }
        }else{
            throw ValidationException::withMessages(['El nombre de alumno ingresado no fue encontrado']);
        }
        */
        




        // Test - Almacenar archivos en Amazon S3

        $currentYear = date("Y");
        $path = 'files/'.
                    $logged_user->carrera .'/'.
                    $currentYear .'/'.
                    $logged_user->cuatrimestre. '/'.
                    $logged_user->nombre;

        if($request->hasfile('imagenes')) { 
            foreach($request->file('imagenes') as $image)
            {
                $new_path = $path.'/images';
                $image_path = $image->store($new_path, 's3');
            }
        }            
        if($request->hasfile('archivos')) {
            foreach($request->file('archivos') as $file) 
            { 
                    $file_path = $file->store($path, 's3');                    
            }
        }


        return redirect('/repositorios/registrar')
                ->with('status', 'Repositorio agregado exitosamente!');
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $repositorio = Repositorio::findOrFail($id);
        $files = Repositorio::findOrFail($id)->getFile;
        // dd($repositorio);
        
        return view('repositorio.show', compact('repositorio', 'files'));
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
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }

    public function downloadFile($id)
    {
        $files = Repositorio::find($id)->getFile;
        foreach($files as $file){
            // $filepath = storage_path('app/public/'.$file->file_path;
            // return response()->download($filepath);
            $filepath = 'public/'.$file->file_path;

            return Storage::download($filepath, $file->original_name);
        }
    }

    public function files($user){
        
    }
}
