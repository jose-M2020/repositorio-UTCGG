<?php

namespace App\Http\Controllers;

use App\Http\Middleware\AuthorizeMember;
use App\Http\Requests\StoreRepositoryFilesRequest;
use App\Http\Requests\UpdateRepositoryFileRequest;
use App\Models\File;
use App\Models\Repositorio;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Response as HttpResponse;
use Illuminate\Http\UploadedFile;
use Illuminate\Routing\Controllers\HasMiddleware;
use Illuminate\Routing\Controllers\Middleware;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;
use Symfony\Component\HttpFoundation\StreamedResponse;
use Throwable;

class FileController extends Controller implements HasMiddleware
{
    public static function middleware(): array
    {
        return [
            new Middleware('auth', except: ['download']),
            new Middleware('can:archivos.create', only: ['create', 'store']),
            new Middleware('can:archivos.edit', only: ['update']),
            new Middleware('can:archivos.destroy', only: ['destroy', 'destroyImage']),
            new Middleware(AuthorizeMember::class, only: ['create', 'store', 'update', 'destroy', 'destroyImage']),
        ];
    }

    public function create(Repositorio $repositorio): Response
    {
        return Inertia::render('files/create', [
            'repositorio' => [
                'id' => $repositorio->id,
                'nombre_rep' => $repositorio->nombre_rep,
                'slug' => $repositorio->slug,
            ],
        ]);
    }

    public function store(StoreRepositoryFilesRequest $request, Repositorio $repositorio): RedirectResponse
    {
        try {
            if ($request->hasFile('imagenes')) {
                $paths = $this->storeUploads($request->file('imagenes'), $repositorio, 'imagenes');
                $existing = json_decode($repositorio->imagenes ?? '[]', true) ?: [];
                $repositorio->update([
                    'imagenes' => json_encode([...$existing, ...$paths]),
                ]);
            }

            if ($request->hasFile('archivos')) {
                foreach ($request->file('archivos') as $upload) {
                    $path = $upload->store(
                        $this->basePath($repositorio).'/archivos',
                        's3',
                    );

                    $repositorio->files()->create([
                        'original_name' => $upload->getClientOriginalName(),
                        'file_type' => $upload->getClientOriginalExtension(),
                        'file_path' => $path,
                        'is_public' => false,
                    ]);
                }
            }
        } catch (Throwable) {
            return redirect()
                ->route('repositorios.user.show', $repositorio)
                ->with('status', 'Ningún archivo ha sido guardado.');
        }

        return redirect()
            ->route('repositorios.user.show', $repositorio)
            ->with('status', 'Los archivos han sido guardados.');
    }

    public function update(
        UpdateRepositoryFileRequest $request,
        Repositorio $repositorio,
        File $file,
    ): RedirectResponse {
        abort_unless($file->repositorio_id === $repositorio->id, 404);

        $file->update([
            'is_public' => $request->boolean('is_public'),
        ]);

        return redirect()
            ->route('repositorios.user.show', $repositorio)
            ->with('status', 'Archivo actualizado exitosamente.');
    }

    public function destroy(Repositorio $repositorio, File $file): RedirectResponse
    {
        abort_unless($file->repositorio_id === $repositorio->id, 404);

        if (Storage::disk('s3')->exists($file->file_path)) {
            Storage::disk('s3')->delete($file->file_path);
        }

        $file->delete();

        return redirect()
            ->route('repositorios.user.show', $repositorio)
            ->with('status', 'El archivo se ha eliminado exitosamente.');
    }

    public function destroyImage(Repositorio $repositorio, int $index): RedirectResponse
    {
        $images = json_decode($repositorio->imagenes ?? '[]', true) ?: [];

        if (! array_key_exists($index, $images)) {
            abort(404);
        }

        $path = $images[$index];

        if (Storage::disk('s3')->exists($path)) {
            Storage::disk('s3')->delete($path);
        }

        unset($images[$index]);
        $repositorio->update([
            'imagenes' => json_encode(array_values($images)),
        ]);

        return redirect()
            ->route('repositorios.user.show', $repositorio)
            ->with('status', 'La imagen se ha eliminado exitosamente.');
    }

    public function download(File $file): StreamedResponse|HttpResponse
    {
        $user = auth()->user();
        $repositorio = $file->repositorio()->firstOrFail();

        $canAccess = $file->is_public
            || $user?->hasRole('admin')
            || ($user && $repositorio->users()->whereKey($user->id)->exists());

        abort_unless($canAccess, 403);

        return Storage::disk('s3')->download($file->file_path, $file->original_name);
    }

    /**
     * @param  array<int, UploadedFile>  $uploads
     * @return list<string>
     */
    private function storeUploads(array $uploads, Repositorio $repositorio, string $folder): array
    {
        $paths = [];

        foreach ($uploads as $upload) {
            $paths[] = $upload->store(
                $this->basePath($repositorio).'/'.$folder,
                's3',
            );
        }

        return $paths;
    }

    private function basePath(Repositorio $repositorio): string
    {
        $userCareerCode = auth()->user()?->careerCatalog()->value('code');
        $repoCareerCode = $repositorio->careerCatalog()->value('code');
        $carrera = $userCareerCode ?: $repoCareerCode ?: 'general';

        return 'files/'.$carrera.'/'.date('Y').'/repositorio-'.$repositorio->id;
    }
}
