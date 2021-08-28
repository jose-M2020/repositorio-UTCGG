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
    public function index()
    {
        
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
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
        $request->validate([
            'student_name' => 'required|array|max:8',
            'student_name.*' => 'required|string|max:255|distinct',
            'repository_name' => 'required|string|max:255',
            'description' => 'required|string|max:255',
            'project_type' => 'required|string|max:80',
            'project_level' => 'required|string|max:80',
            'filenames' => 'required|array|max:5',
            'filenames.*' => 'required|file|distinct|mimes:zip,rar,pdf,doc,docx'
        ]);

        $data = Alumno::where('nombre', $request->student_name[0]);

        $student_name = '';
        if(is_array($request->student_name)){
            $student_name = '';
            foreach($request->student_name as $name){
                $student_name .= $name.',';
            }
            $student_name = trim($student_name, ',');
        }else{
            $student_name = $request->student_name[0];
        }
        

        if($data->exists()){
            $data = $data->first(['id', 'carrera', 'cuatrimestre']);
            
            $repository_created = Repositorio::create([
                'alumno_id' => $data->id,
                'nombre_alumno' => $student_name,
                'nombre_rep' => $request->repository_name,
                'descripcion' => $request->description,
                'tipo_proyecto' => $request->project_type,
                'nivel_proyecto' => $request->project_level
            ]);

            $filenames = '';
            if($request->hasfile('filenames')) {
                $currentYear = date("Y");
                $path = 'files/'.
                        $data->carrera .'/'.
                        $currentYear .'/'.
                        $data->cuatrimestre. '/'.
                        $request->student_name[0];

                foreach($request->file('filenames') as $file) {   
                    $file_stored = $file->store($path);

                    File::create([
                        'repositorio_id' => $repository_created->id,
                        'alumno_id' => $data->id,
                        'original_name' => $file->getClientOriginalName(),
                        'file_type' => $file->extension(),
                        'file_path' => $file_stored,
                        'is_public' => 0
                    ]);
                    // $filenames .= $file->getClientOriginalName().'|';
                    // $name = time().rand(1,100).'.'.$file->extension();
                    // $file->move(public_path('files'), $name);  
                    // $files[] = $name;  
                    // echo $file->getClientOriginalName();
                }
            }
        }else{
            throw ValidationException::withMessages(['El nombre de alumno ingresado no fue encontrado']);
        }

        return redirect('/repositorio/registrar')
                ->with('success', 'Repositorio agregado exitosamente!');
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
}
