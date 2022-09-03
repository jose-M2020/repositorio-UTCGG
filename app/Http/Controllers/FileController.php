<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Response;

use App\Models\Repositorio;
use App\Models\File;

class FileController extends Controller
{
    function __construct()
    {
         $this->middleware('can:archivos.index')->only('index', 'show');
         $this->middleware('can:archivos.create')->only('create','store');
         $this->middleware('can:archivos.edit')->only('edit','update');
         $this->middleware('can:archivos.destroy')->only('destroy');
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create(Repositorio $repositorio)
    {
        // dd($repositorio);
        return view('dashboard.file.create', compact('repositorio'));
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request, Repositorio $repositorio)
    {
        $request->validate([
            'imagenes' => 'array|max:5',
            'imagenes.*' => 'required|file|distinct|mimes:png,jpg,jpeg,svg,webp',
            'archivos' => 'array|max:5',
            'archivos.*' => 'required|file|distinct|mimes:zip,rar,pdf,doc,docx'
        ]); 
        
        try {
            $imagesURL = $this->uploadFile($request, 'imagenes', $repositorio->id);

            $fileData = $this->uploadFile($request, 'archivos', $repositorio->id);

            File::insert(
                array_map(fn ($array) => 
                    array_merge($array, [
                        'repositorio_id' => $repositorio->id,
                        'created_at' => now(), 
                        'updated_at' => now()
                    ])
                , $fileData)
            );
        } catch (\Throwable $th) {
            return redirect()->route('repositorios.user.show', $repositorio->slug)
                             ->with('warning', 'Ningún archivo ha sido guardado');
        }

        return redirect()->route('repositorios.user.show', $repositorio->slug)
                         ->with('status', 'Los archivos han sido guardados.');
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
    public function destroy(Request $request, File $file)
    {
        if(Storage::disk('s3')->exists($file->file_path)) {
            Storage::disk('s3')->delete($file->file_path);
            $file->delete();
        }

        return redirect()->back()
               ->with('status','El archivo se ha eliminado exitosamente!');
    }

    private function uploadFile($request, $typeFile, $idRep)
    {
            // File path
            $currentYear = date("Y");
            $path = 'files/'.
                    auth()->user()->carrera .'/'.
                    $currentYear .'/'.
                    'repositorio-'.$idRep;

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

    public function download(File $file)
    {
        $headers = [
            'Content-Type'        => 'application/'. $file->file_type,
            'Content-Disposition' => 'attachment; filename="'. $file->original_name .'"',
 
        ];
 
        return \Response::make(Storage::disk('s3')->get($file->file_path), 200, $headers);
    }
}
