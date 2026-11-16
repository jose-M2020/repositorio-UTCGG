<?php

namespace App\Http\Controllers;

use App\Http\Middleware\AuthorizeMember;
use App\Http\Requests\StoreRepositoryFilesRequest;
use App\Http\Requests\UpdateRepositoryFileRequest;
use App\Models\File;
use App\Models\Repository;
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
            new Middleware('can:files.create', only: ['create', 'store']),
            new Middleware('can:files.edit', only: ['update']),
            new Middleware('can:files.destroy', only: ['destroy', 'destroyImage']),
            new Middleware(AuthorizeMember::class, only: ['create', 'store', 'update', 'destroy', 'destroyImage']),
        ];
    }

    public function create(Repository $repository): Response
    {
        return Inertia::render('panel/files/create', [
            'repository' => [
                'id' => $repository->id,
                'title' => $repository->title,
                'slug' => $repository->slug,
            ],
        ]);
    }

    public function store(StoreRepositoryFilesRequest $request, Repository $repository): RedirectResponse
    {
        try {
            if ($request->hasFile('images')) {
                $paths = $this->storeUploads($request->file('images'), $repository, 'images');
                $existing = json_decode($repository->images ?? '[]', true) ?: [];
                $repository->update([
                    'images' => json_encode([...$existing, ...$paths]),
                ]);
            }

            if ($request->hasFile('files')) {
                foreach ($request->file('files') as $upload) {
                    $path = $upload->store(
                        $this->basePath($repository).'/files',
                        's3',
                    );

                    $repository->files()->create([
                        'original_name' => $upload->getClientOriginalName(),
                        'file_type' => $upload->getClientOriginalExtension(),
                        'file_path' => $path,
                        'is_public' => false,
                    ]);
                }
            }
        } catch (Throwable) {
            return redirect()
                ->route('repositories.account.show', $repository)
                ->with('status', 'Ningún archivo ha sido guardado.');
        }

        return redirect()
            ->route('repositories.account.show', $repository)
            ->with('status', 'Los archivos han sido guardados.');
    }

    public function update(
        UpdateRepositoryFileRequest $request,
        Repository $repository,
        File $file,
    ): RedirectResponse {
        abort_unless($file->repository_id === $repository->id, 404);

        $file->update([
            'is_public' => $request->boolean('is_public'),
        ]);

        return redirect()
            ->route('repositories.account.show', $repository)
            ->with('status', 'Archivo actualizado exitosamente.');
    }

    public function destroy(Repository $repository, File $file): RedirectResponse
    {
        abort_unless($file->repository_id === $repository->id, 404);

        if (Storage::disk('s3')->exists($file->file_path)) {
            Storage::disk('s3')->delete($file->file_path);
        }

        $file->delete();

        return redirect()
            ->route('repositories.account.show', $repository)
            ->with('status', 'El archivo se ha eliminado exitosamente.');
    }

    public function destroyImage(Repository $repository, int $index): RedirectResponse
    {
        $images = json_decode($repository->images ?? '[]', true) ?: [];

        if (! array_key_exists($index, $images)) {
            abort(404);
        }

        $path = $images[$index];

        if (Storage::disk('s3')->exists($path)) {
            Storage::disk('s3')->delete($path);
        }

        unset($images[$index]);
        $repository->update([
            'images' => json_encode(array_values($images)),
        ]);

        return redirect()
            ->route('repositories.account.show', $repository)
            ->with('status', 'La imagen se ha eliminado exitosamente.');
    }

    public function download(File $file): StreamedResponse|HttpResponse
    {
        $user = auth()->user();
        $repository = $file->repository()->firstOrFail();

        $canAccess = $file->is_public
            || $user?->hasRole('admin')
            || ($user && $repository->users()->whereKey($user->id)->exists());

        abort_unless($canAccess, 403);

        return Storage::disk('s3')->download($file->file_path, $file->original_name);
    }

    /**
     * @param  array<int, UploadedFile>  $uploads
     * @return list<string>
     */
    private function storeUploads(array $uploads, Repository $repository, string $folder): array
    {
        $paths = [];

        foreach ($uploads as $upload) {
            $paths[] = $upload->store(
                $this->basePath($repository).'/'.$folder,
                's3',
            );
        }

        return $paths;
    }

    private function basePath(Repository $repository): string
    {
        $userCareerCode = auth()->user()?->careerCode();
        $repoCareerCode = $repository->career()->value('code');
        $career = $userCareerCode ?: $repoCareerCode ?: 'general';

        return 'files/'.$career.'/'.date('Y').'/repository-'.$repository->id;
    }
}
