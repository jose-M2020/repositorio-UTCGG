<?php

namespace App\Http\Controllers;

use App\Http\Middleware\AuthorizeMember;
use App\Http\Requests\StoreRepositoryRequest;
use App\Http\Requests\UpdateRepositoryRequest;
use App\Models\Catalog as CatalogModel;
use App\Models\File;
use App\Models\Repository;
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

class RepositoryController extends Controller implements HasMiddleware
{
    public static function middleware(): array
    {
        return [
            new Middleware('auth', only: ['create', 'store', 'edit', 'update', 'destroy', 'mine', 'showByUser']),
            new Middleware('can:repositories.create', only: ['create', 'store']),
            new Middleware('can:repositories.edit', only: ['edit', 'update']),
            new Middleware('can:repositories.destroy', only: ['destroy']),
            new Middleware(AuthorizeMember::class, only: ['edit', 'update', 'destroy', 'showByUser']),
        ];
    }

    public function index(Request $request): Response
    {
        $search = $request->string('query')->toString();
        $searchField = $request->string('search_field')->toString() ?: 'title';
        $careers = array_values(array_filter((array) $request->input('career', [])));
        $projectTypes = array_values(array_filter((array) $request->input('project_type', [])));
        $academicDegrees = array_values(array_filter((array) $request->input('academic_degree', [])));
        $years = array_values(array_filter((array) $request->input('year', [])));

        $repositories = Repository::query()
            ->with('users:id,first_name,last_name,second_last_name,email')
            ->with([
                'careerCatalog:id,code',
                'projectTypeCatalog:id,code',
                'academicDegreeCatalog:id,code',
            ])
            ->latest()
            ->where('is_public', true)
            ->when($search !== '', function ($query) use ($search, $searchField): void {
                if ($searchField === 'description') {
                    $query->where('description', 'like', "%{$search}%");

                    return;
                }

                if ($searchField === 'author') {
                    $query->whereHas('users', function ($users) use ($search): void {
                        $users->where('first_name', 'like', "%{$search}%")
                            ->orWhere('last_name', 'like', "%{$search}%")
                            ->orWhere('second_last_name', 'like', "%{$search}%");
                    });

                    return;
                }

                $query->where('title', 'like', "%{$search}%");
            })
            ->when($careers !== [], fn ($query) => $query->whereHas(
                'careerCatalog',
                fn ($catalogQuery) => $catalogQuery->whereIn('code', $careers),
            ))
            ->when($projectTypes !== [], fn ($query) => $query->whereHas(
                'projectTypeCatalog',
                fn ($catalogQuery) => $catalogQuery->whereIn('code', $projectTypes),
            ))
            ->when($academicDegrees !== [], fn ($query) => $query->whereHas(
                'academicDegreeCatalog',
                fn ($catalogQuery) => $catalogQuery->whereIn('code', $academicDegrees),
            ))
            ->when(
                count($years) === 2 && $years[0] !== '' && $years[1] !== '',
                fn ($query) => $query->whereBetween('created_at', [$years[0], $years[1]]),
            )
            ->paginate(15)
            ->withQueryString()
            ->through(function (Repository $repository): array {
                $images = json_decode($repository->images ?? '[]', true) ?: [];

                return [
                    'id' => $repository->id,
                    'title' => $repository->title,
                    'slug' => $repository->slug,
                    'description' => $repository->description,
                    'career' => $repository->careerCatalog?->code ?? '—',
                    'project_type' => $repository->projectTypeCatalog?->code ?? '—',
                    'academic_degree' => $repository->academicDegreeCatalog?->code ?? '—',
                    'is_public' => $repository->is_public,
                    'created_at' => $repository->created_at?->toDateTimeString(),
                    'cover_url' => Media::url($images[0] ?? null),
                    'users' => $repository->users->map(fn (User $user) => [
                        'id' => $user->id,
                        'first_name' => $user->first_name,
                        'last_name' => $user->last_name,
                        'second_last_name' => $user->second_last_name,
                        'email' => $user->email,
                    ])->values()->all(),
                ];
            });

        return Inertia::render('public/repositories/index', [
            'repositories' => $repositories,
            'filters' => [
                'query' => $search,
                'search_field' => $searchField,
                'career' => $careers,
                'project_type' => $projectTypes,
                'academic_degree' => $academicDegrees,
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
        return Inertia::render('panel/repositories/create', [
            'catalog' => [
                'careers' => CatalogData::careers(),
                'types' => CatalogData::projectTypes(),
                'levels' => CatalogData::academicDegrees(),
            ],
        ]);
    }

    public function store(StoreRepositoryRequest $request): RedirectResponse
    {
        $user = $request->user();
        $validated = $request->safe()->except(['member_emails', 'visibility', 'career', 'project_type', 'academic_degree']);

        $repository = Repository::query()->create([
            ...$validated,
            'career_catalog_id' => $this->catalogIdByCode(CatalogModel::TYPE_CAREER, $request->string('career')->toString()),
            'project_type_catalog_id' => $this->catalogIdByCode(CatalogModel::TYPE_PROJECT, $request->string('project_type')->toString()),
            'academic_degree_catalog_id' => $this->catalogIdByCode(CatalogModel::TYPE_ACADEMIC_DEGREE, $request->string('academic_degree')->toString()),
            'slug' => $this->uniqueSlug($request->string('title')->toString()),
            'is_public' => $request->string('visibility')->toString() === 'public',
            'created_by' => $user->fullName(),
        ]);

        $memberIds = User::query()
            ->whereIn('email', $request->input('member_emails', []))
            ->pluck('id')
            ->push($user->id)
            ->unique()
            ->values()
            ->all();

        $repository->users()->syncWithoutDetaching($memberIds);

        return redirect()
            ->route('repositories.account.show', $repository)
            ->with('status', 'Repositorio creado exitosamente.');
    }

    public function show(Repository $repository): Response
    {
        $user = auth()->user();
        $isMember = $user
            ? $repository->users()->whereKey($user->id)->exists()
            : false;

        if (! $repository->is_public && ! ($user?->hasRole('admin') || $isMember)) {
            abort(404);
        }

        $repository->load([
            'users:id,first_name,last_name,second_last_name,email',
            'files' => fn ($query) => $query->where('is_public', true),
        ]);

        $related = Repository::query()
            ->where('career_catalog_id', $repository->career_catalog_id)
            ->whereKeyNot($repository->id)
            ->where('is_public', true)
            ->inRandomOrder()
            ->limit(6)
            ->with('careerCatalog:id,code')
            ->get(['id', 'title', 'slug', 'career_catalog_id'])
            ->map(fn (Repository $relatedRepo) => [
                'id' => $relatedRepo->id,
                'title' => $relatedRepo->title,
                'slug' => $relatedRepo->slug,
                'career' => $relatedRepo->careerCatalog?->code ?? '—',
            ])
            ->values()
            ->all();

        return Inertia::render('public/repositories/show', [
            'repository' => $this->serializeRepository($repository),
            'related' => $related,
        ]);
    }

    public function mine(Request $request): Response
    {
        $user = $request->user();

        $repositories = $user->hasRole('admin')
            ? Repository::query()->latest()->paginate(15)
            : $user->repositories()->latest()->paginate(15);

        return Inertia::render('panel/repositories/mine', [
            'repositories' => $repositories,
        ]);
    }

    public function showByUser(Repository $repository): Response
    {
        $repository->load(['users:id,first_name,last_name,second_last_name,email', 'files']);

        return Inertia::render('panel/repositories/manage', [
            'repository' => $this->serializeRepository($repository),
        ]);
    }

    public function edit(Repository $repository): Response
    {
        return Inertia::render('panel/repositories/edit', [
            'repository' => [
                ...$this->serializeRepository($repository),
                'visibility' => $repository->is_public ? 'public' : 'private',
            ],
            'catalog' => [
                'careers' => CatalogData::careers(),
                'types' => CatalogData::projectTypes(),
                'levels' => CatalogData::academicDegrees(),
            ],
        ]);
    }

    public function update(UpdateRepositoryRequest $request, Repository $repository): RedirectResponse
    {
        $validated = $request->safe()->except(['visibility', 'career', 'project_type', 'academic_degree']);

        $repository->update([
            ...$validated,
            'career_catalog_id' => $this->catalogIdByCode(CatalogModel::TYPE_CAREER, $request->string('career')->toString()),
            'project_type_catalog_id' => $this->catalogIdByCode(CatalogModel::TYPE_PROJECT, $request->string('project_type')->toString()),
            'academic_degree_catalog_id' => $this->catalogIdByCode(CatalogModel::TYPE_ACADEMIC_DEGREE, $request->string('academic_degree')->toString()),
            'slug' => $this->uniqueSlug($request->string('title')->toString(), $repository->id),
            'is_public' => $request->string('visibility')->toString() === 'public',
        ]);

        return redirect()
            ->route('repositories.account.show', $repository)
            ->with('status', 'Repositorio actualizado exitosamente.');
    }

    public function destroy(Repository $repository): RedirectResponse
    {
        $repository->delete();

        return redirect()
            ->route('repositories.mine')
            ->with('status', 'Repositorio eliminado exitosamente.');
    }

    private function uniqueSlug(string $nombre, ?int $ignoreId = null): string
    {
        $base = Str::slug($nombre) ?: 'repository';
        $slug = $base;
        $suffix = 1;

        while (
            Repository::query()
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
    private function serializeRepository(Repository $repository): array
    {
        $repository->loadMissing([
            'careerCatalog:id,code',
            'projectTypeCatalog:id,code',
            'academicDegreeCatalog:id,code',
        ]);

        $imagePaths = json_decode($repository->images ?? '[]', true) ?: [];

        return [
            'id' => $repository->id,
            'title' => $repository->title,
            'slug' => $repository->slug,
            'description' => $repository->description,
            'project_type' => $repository->projectTypeCatalog?->code ?? '—',
            'academic_degree' => $repository->academicDegreeCatalog?->code ?? '—',
            'keywords' => $repository->keywords,
            'is_public' => $repository->is_public,
            'career' => $repository->careerCatalog?->code ?? '—',
            'external_advisor' => $repository->external_advisor,
            'company' => $repository->company,
            'generation' => $repository->generation,
            'created_by' => $repository->created_by,
            'images' => $imagePaths,
            'image_urls' => array_map(
                static fn (string $path): string => Media::url($path),
                $imagePaths,
            ),
            'cover_url' => Media::url($imagePaths[0] ?? null),
            'files' => $repository->relationLoaded('files')
                ? $repository->files->map(fn (File $file) => [
                    'id' => $file->id,
                    'original_name' => $file->original_name,
                    'file_type' => $file->file_type,
                    'is_public' => $file->is_public,
                    'url' => Media::url($file->file_path),
                ])->values()->all()
                : [],
            'users' => $repository->relationLoaded('users')
                ? $repository->users->map(fn (User $user) => [
                    'id' => $user->id,
                    'first_name' => $user->first_name,
                    'last_name' => $user->last_name,
                    'second_last_name' => $user->second_last_name,
                    'email' => $user->email,
                ])->values()->all()
                : [],
        ];
    }
}
