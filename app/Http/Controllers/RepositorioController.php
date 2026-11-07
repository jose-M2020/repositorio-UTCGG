<?php

namespace App\Http\Controllers;

use App\Http\Middleware\AuthorizeMember;
use App\Http\Requests\StoreRepositorioRequest;
use App\Http\Requests\UpdateRepositorioRequest;
use App\Models\Catalog as CatalogModel;
use App\Models\File;
use App\Models\Repositorio;
use App\Models\User;
use App\Support\Catalog as CatalogData;
use App\Support\Media;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Routing\Controllers\HasMiddleware;
use Illuminate\Routing\Controllers\Middleware;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Inertia\Response;

class RepositorioController extends Controller implements HasMiddleware
{
    public static function middleware(): array
    {
        return [
            new Middleware('auth', only: ['create', 'store', 'edit', 'update', 'destroy', 'mine', 'showByUser']),
            new Middleware('can:repositorios.create', only: ['create', 'store']),
            new Middleware('can:repositorios.edit', only: ['edit', 'update']),
            new Middleware('can:repositorios.destroy', only: ['destroy']),
            new Middleware(AuthorizeMember::class, only: ['edit', 'update', 'destroy', 'showByUser']),
        ];
    }

    public function index(Request $request): Response
    {
        $search = $request->string('query')->toString();
        $searchField = $request->string('search_field')->toString() ?: 'title';
        $carreras = array_values(array_filter((array) $request->input('carrera', [])));
        $tipos = array_values(array_filter((array) $request->input('tipo', [])));
        $niveles = array_values(array_filter((array) $request->input('nivel', [])));
        $years = array_values(array_filter((array) $request->input('year', [])));

        $repositorios = Repositorio::query()
            ->with('users:id,nombre,apellido,email')
            ->latest()
            ->where('publico', true)
            ->when($search !== '', function ($query) use ($search, $searchField): void {
                if ($searchField === 'description') {
                    $query->where('descripcion', 'like', "%{$search}%");

                    return;
                }

                if ($searchField === 'author') {
                    $query->whereHas('users', function ($users) use ($search): void {
                        $users->where('nombre', 'like', "%{$search}%")
                            ->orWhere('apellido', 'like', "%{$search}%");
                    });

                    return;
                }

                $query->where('nombre_rep', 'like', "%{$search}%");
            })
            ->when($carreras !== [], fn ($query) => $query->whereIn('carrera', $carreras))
            ->when($tipos !== [], fn ($query) => $query->whereIn('tipo_proyecto', $tipos))
            ->when($niveles !== [], fn ($query) => $query->whereIn('nivel_proyecto', $niveles))
            ->when(
                count($years) === 2 && $years[0] !== '' && $years[1] !== '',
                fn ($query) => $query->whereBetween('created_at', [$years[0], $years[1]]),
            )
            ->paginate(15)
            ->withQueryString()
            ->through(function (Repositorio $repositorio): array {
                $images = json_decode($repositorio->imagenes ?? '[]', true) ?: [];

                return [
                    'id' => $repositorio->id,
                    'nombre_rep' => $repositorio->nombre_rep,
                    'slug' => $repositorio->slug,
                    'descripcion' => $repositorio->descripcion,
                    'carrera' => $repositorio->carrera,
                    'tipo_proyecto' => $repositorio->tipo_proyecto,
                    'nivel_proyecto' => $repositorio->nivel_proyecto,
                    'publico' => $repositorio->publico,
                    'created_at' => $repositorio->created_at?->toDateTimeString(),
                    'cover_url' => Media::url($images[0] ?? null),
                    'users' => $repositorio->users->map(fn (User $user) => [
                        'id' => $user->id,
                        'nombre' => $user->nombre,
                        'apellido' => $user->apellido,
                        'email' => $user->email,
                    ])->values()->all(),
                ];
            });

        return Inertia::render('repositories/index', [
            'repositorios' => $repositorios,
            'filters' => [
                'query' => $search,
                'search_field' => $searchField,
                'carrera' => $carreras,
                'tipo' => $tipos,
                'nivel' => $niveles,
                'year' => $years,
            ],
            'catalog' => [
                'careers' => CatalogData::careers(),
                'types' => CatalogData::projectTypes(),
                'levels' => CatalogData::academicDegrees(),
            ],
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('repositories/create', [
            'catalog' => [
                'careers' => CatalogData::careers(),
                'types' => CatalogData::projectTypes(),
                'levels' => CatalogData::academicDegrees(),
            ],
        ]);
    }

    public function store(StoreRepositorioRequest $request): RedirectResponse
    {
        $user = $request->user();
        $validated = $request->safe()->except(['usuario', 'visibilidad']);

        $repositorio = Repositorio::query()->create([
            ...$validated,
            'career_catalog_id' => $this->catalogIdByCode(CatalogModel::TYPE_CAREER, (string) $validated['carrera']),
            'project_type_catalog_id' => $this->catalogIdByCode(CatalogModel::TYPE_PROJECT, (string) $validated['tipo_proyecto']),
            'academic_degree_catalog_id' => $this->catalogIdByCode(CatalogModel::TYPE_ACADEMIC_DEGREE, (string) $validated['nivel_proyecto']),
            'slug' => $this->uniqueSlug($request->string('nombre_rep')->toString()),
            'publico' => $request->string('visibilidad')->toString() === 'publico',
            'created_by' => $user->nombre,
        ]);

        $memberIds = User::query()
            ->whereIn('email', $request->input('usuario', []))
            ->pluck('id')
            ->push($user->id)
            ->unique()
            ->values()
            ->all();

        $repositorio->users()->syncWithoutDetaching($memberIds);

        return redirect()
            ->route('repositorios.user.show', $repositorio)
            ->with('status', 'Repositorio creado exitosamente.');
    }

    public function show(Repositorio $repositorio): Response
    {
        $user = auth()->user();
        $isMember = $user
            ? $repositorio->users()->whereKey($user->id)->exists()
            : false;

        if (! $repositorio->publico && ! ($user?->hasRole('admin') || $isMember)) {
            abort(404);
        }

        $repositorio->load([
            'users:id,nombre,apellido,email',
            'files' => fn ($query) => $query->where('is_public', true),
        ]);

        $related = Repositorio::query()
            ->where('carrera', $repositorio->carrera)
            ->whereKeyNot($repositorio->id)
            ->where('publico', true)
            ->inRandomOrder()
            ->limit(6)
            ->get(['id', 'nombre_rep', 'slug', 'carrera']);

        return Inertia::render('repositories/show', [
            'repositorio' => $this->serializeRepository($repositorio),
            'related' => $related,
        ]);
    }

    public function mine(Request $request): Response
    {
        $user = $request->user();

        $repositorios = $user->hasRole('admin')
            ? Repositorio::query()->latest()->paginate(15)
            : $user->repositories()->latest()->paginate(15);

        return Inertia::render('repositories/mine', [
            'repositorios' => $repositorios,
        ]);
    }

    public function showByUser(Repositorio $repositorio): Response
    {
        $repositorio->load(['users:id,nombre,apellido,email', 'files']);

        return Inertia::render('repositories/manage', [
            'repositorio' => $this->serializeRepository($repositorio),
        ]);
    }

    public function edit(Repositorio $repositorio): Response
    {
        return Inertia::render('repositories/edit', [
            'repositorio' => [
                ...$this->serializeRepository($repositorio),
                'visibilidad' => $repositorio->publico ? 'publico' : 'privado',
            ],
            'catalog' => [
                'careers' => CatalogData::careers(),
                'types' => CatalogData::projectTypes(),
                'levels' => CatalogData::academicDegrees(),
            ],
        ]);
    }

    public function update(UpdateRepositorioRequest $request, Repositorio $repositorio): RedirectResponse
    {
        $validated = $request->safe()->except(['visibilidad']);

        $repositorio->update([
            ...$validated,
            'career_catalog_id' => $this->catalogIdByCode(CatalogModel::TYPE_CAREER, (string) $validated['carrera']),
            'project_type_catalog_id' => $this->catalogIdByCode(CatalogModel::TYPE_PROJECT, (string) $validated['tipo_proyecto']),
            'academic_degree_catalog_id' => $this->catalogIdByCode(CatalogModel::TYPE_ACADEMIC_DEGREE, (string) $validated['nivel_proyecto']),
            'slug' => $this->uniqueSlug($request->string('nombre_rep')->toString(), $repositorio->id),
            'publico' => $request->string('visibilidad')->toString() === 'publico',
        ]);

        return redirect()
            ->route('repositorios.user.show', $repositorio)
            ->with('status', 'Repositorio actualizado exitosamente.');
    }

    public function destroy(Repositorio $repositorio): RedirectResponse
    {
        $repositorio->delete();

        return redirect()
            ->route('repositorios.user')
            ->with('status', 'Repositorio eliminado exitosamente.');
    }

    private function uniqueSlug(string $nombre, ?int $ignoreId = null): string
    {
        $base = Str::slug($nombre) ?: 'repositorio';
        $slug = $base;
        $suffix = 1;

        while (
            Repositorio::query()
                ->where('slug', $slug)
                ->when($ignoreId, fn ($query) => $query->whereKeyNot($ignoreId))
                ->exists()
        ) {
            $slug = "{$base}-{$suffix}";
            $suffix++;
        }

        return $slug;
    }

    private function catalogIdByCode(string $type, string $code): ?int
    {
        return CatalogModel::query()
            ->where('type', $type)
            ->where('code', $code)
            ->value('id');
    }

    /**
     * @return array<string, mixed>
     */
    private function serializeRepository(Repositorio $repositorio): array
    {
        $imagePaths = json_decode($repositorio->imagenes ?? '[]', true) ?: [];

        return [
            'id' => $repositorio->id,
            'nombre_rep' => $repositorio->nombre_rep,
            'slug' => $repositorio->slug,
            'descripcion' => $repositorio->descripcion,
            'tipo_proyecto' => $repositorio->tipo_proyecto,
            'nivel_proyecto' => $repositorio->nivel_proyecto,
            'palabras_clave' => $repositorio->palabras_clave,
            'publico' => $repositorio->publico,
            'carrera' => $repositorio->carrera,
            'asesor_externo' => $repositorio->asesor_externo,
            'empresa' => $repositorio->empresa,
            'generacion' => $repositorio->generacion,
            'created_by' => $repositorio->created_by,
            'imagenes' => $imagePaths,
            'imagen_urls' => array_map(
                static fn (string $path): string => Media::url($path),
                $imagePaths,
            ),
            'cover_url' => Media::url($imagePaths[0] ?? null),
            'files' => $repositorio->relationLoaded('files')
                ? $repositorio->files->map(fn (File $file) => [
                    'id' => $file->id,
                    'original_name' => $file->original_name,
                    'file_type' => $file->file_type,
                    'is_public' => $file->is_public,
                    'url' => Media::url($file->file_path),
                ])->values()->all()
                : [],
            'users' => $repositorio->relationLoaded('users')
                ? $repositorio->users->map(fn (User $user) => [
                    'id' => $user->id,
                    'nombre' => $user->nombre,
                    'apellido' => $user->apellido,
                    'email' => $user->email,
                ])->values()->all()
                : [],
        ];
    }
}
