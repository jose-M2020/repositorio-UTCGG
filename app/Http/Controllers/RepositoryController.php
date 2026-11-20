<?php

namespace App\Http\Controllers;

use App\Enums\ProjectPeriodStatus;
use App\Http\Middleware\AuthorizeMember;
use App\Http\Requests\StoreRepositoryRequest;
use App\Http\Requests\UpdateRepositoryRequest;
use App\Models\Career;
use App\Models\EducationLevel;
use App\Models\File;
use App\Models\ProjectPeriod;
use App\Models\ProjectType;
use App\Models\Repository;
use App\Models\User;
use App\Services\Advisors\EligibleAdvisorsQuery;
use App\Services\Repositories\RepositoryOrganizationService;
use App\Support\Media;
use App\Support\Permissions;
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
            new Middleware(Permissions::ability(Permissions::REPOSITORIES_CREATE), only: ['create', 'store']),
            new Middleware(Permissions::ability(Permissions::REPOSITORIES_EDIT), only: ['edit', 'update']),
            new Middleware(Permissions::ability(Permissions::REPOSITORIES_DESTROY), only: ['destroy']),
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
                'career:id,code',
                'projectType:id,code',
                'educationLevel:id,code',
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
                'career',
                fn ($careerQuery) => $careerQuery->whereIn('code', $careers),
            ))
            ->when($projectTypes !== [], fn ($query) => $query->whereHas(
                'projectType',
                fn ($typeQuery) => $typeQuery->whereIn('code', $projectTypes),
            ))
            ->when($academicDegrees !== [], fn ($query) => $query->whereHas(
                'educationLevel',
                fn ($levelQuery) => $levelQuery->whereIn('code', $academicDegrees),
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
                    'career' => $repository->career?->code ?? '—',
                    'project_type' => $repository->projectType?->code ?? '—',
                    'academic_degree' => $repository->educationLevel?->code ?? '—',
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
            'lookups' => $this->lookups(),
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('panel/repositories/create', [
            'lookups' => $this->lookups(),
        ]);
    }

    public function store(
        StoreRepositoryRequest $request,
        RepositoryOrganizationService $organizationService,
    ): RedirectResponse {
        $user = $request->user();
        $validated = $request->safe()->except([
            'member_emails',
            'visibility',
            'career',
            'project_type',
            'academic_degree',
            'project_period_id',
            'company',
            'business_advisor',
        ]);

        $careerId = $this->careerIdByCode($request->string('career')->toString());
        $projectTypeId = $this->projectTypeIdByCode($request->string('project_type')->toString());
        $educationLevelId = $this->educationLevelIdByCode($request->string('academic_degree')->toString());

        $repository = Repository::query()->create([
            ...$validated,
            'career_id' => $careerId,
            'project_type_id' => $projectTypeId,
            'education_level_id' => $educationLevelId,
            'project_period_id' => $request->input('project_period_id'),
            'slug' => $this->uniqueSlug($request->string('title')->toString()),
            'is_public' => $request->string('visibility')->toString() === 'public',
            'created_by' => $user->fullName(),
        ]);

        $organizationService->sync(
            $repository,
            $request->input('company'),
            $request->input('business_advisor'),
            $user,
        );

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
            ->where('career_id', $repository->career_id)
            ->whereKeyNot($repository->id)
            ->where('is_public', true)
            ->inRandomOrder()
            ->limit(6)
            ->with('career:id,code')
            ->get(['id', 'title', 'slug', 'career_id'])
            ->map(fn (Repository $relatedRepo) => [
                'id' => $relatedRepo->id,
                'title' => $relatedRepo->title,
                'slug' => $relatedRepo->slug,
                'career' => $relatedRepo->career?->code ?? '—',
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

    public function showByUser(Repository $repository, EligibleAdvisorsQuery $eligibleAdvisorsQuery): Response
    {
        $repository->load([
            'users:id,first_name,last_name,second_last_name,email',
            'files',
            'activeAdvisor.advisor:id,first_name,last_name,second_last_name,email',
            'advisors' => fn ($query) => $query->latest('assigned_at')->with('advisor:id,first_name,last_name,second_last_name,email'),
            'period:id,name,status',
            'projectType:id,code,requires_academic_advisor',
        ]);

        $eligibleAdvisors = $repository->project_period_id
            ? $eligibleAdvisorsQuery->forRepository($repository, requireCapacity: false)
                ->map(fn (array $row): array => [
                    'id' => (int) $row['user']->id,
                    'name' => $row['user']->fullName(),
                    'load' => $row['load'],
                    'capacity' => $row['capacity'],
                    'label' => sprintf('%s (%d/%d)', $row['user']->fullName(), $row['load'], $row['capacity']),
                ])
                ->values()
                ->all()
            : [];

        return Inertia::render('panel/repositories/manage', [
            'repository' => $this->serializeRepository($repository),
            'eligibleAdvisors' => $eligibleAdvisors,
        ]);
    }

    public function edit(Repository $repository): Response
    {
        return Inertia::render('panel/repositories/edit', [
            'repository' => [
                ...$this->serializeRepository($repository),
                'visibility' => $repository->is_public ? 'public' : 'private',
            ],
            'lookups' => $this->lookups(),
        ]);
    }

    public function update(
        UpdateRepositoryRequest $request,
        Repository $repository,
        RepositoryOrganizationService $organizationService,
    ): RedirectResponse {
        $validated = $request->safe()->except([
            'visibility',
            'career',
            'project_type',
            'academic_degree',
            'project_period_id',
            'company',
            'business_advisor',
        ]);

        $careerId = $this->careerIdByCode($request->string('career')->toString());
        $projectTypeId = $this->projectTypeIdByCode($request->string('project_type')->toString());
        $educationLevelId = $this->educationLevelIdByCode($request->string('academic_degree')->toString());

        $repository->update([
            ...$validated,
            'career_id' => $careerId,
            'project_type_id' => $projectTypeId,
            'education_level_id' => $educationLevelId,
            'project_period_id' => $request->input('project_period_id'),
            'slug' => $this->uniqueSlug($request->string('title')->toString(), $repository->id),
            'is_public' => $request->string('visibility')->toString() === 'public',
        ]);

        $organizationService->sync(
            $repository,
            $request->input('company'),
            $request->input('business_advisor'),
            $request->user(),
        );

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

    /**
     * @return array{
     *     careers: array<string, string>,
     *     project_types: array<string, string>,
     *     education_levels: array<string, string>,
     *     project_types_meta: list<array{code: string, requires_academic_advisor: bool}>,
     *     open_periods: list<array{id: int, name: string, project_type_code: string}>
     * }
     */
    private function lookups(): array
    {
        $projectTypes = ProjectType::query()
            ->active()
            ->ordered()
            ->get(['id', 'code', 'name', 'requires_academic_advisor', 'requires_business_advisor']);

        $openPeriods = ProjectPeriod::query()
            ->where('status', ProjectPeriodStatus::Open->value)
            ->with('projectType:id,code')
            ->orderBy('starts_at')
            ->get(['id', 'name', 'project_type_id'])
            ->map(fn (ProjectPeriod $period): array => [
                'id' => $period->id,
                'name' => $period->name,
                'project_type_code' => $period->projectType?->code ?? '',
            ])
            ->values()
            ->all();

        return [
            'careers' => Career::optionsByCode(),
            'project_types' => $projectTypes->pluck('name', 'code')->all(),
            'education_levels' => EducationLevel::optionsByCode(),
            'project_types_meta' => $projectTypes
                ->map(fn (ProjectType $type): array => [
                    'code' => $type->code,
                    'requires_academic_advisor' => $type->requires_academic_advisor,
                    'requires_business_advisor' => $type->requires_business_advisor,
                ])
                ->values()
                ->all(),
            'open_periods' => $openPeriods,
        ];
    }

    private function careerIdByCode(string $code): ?int
    {
        return Career::query()->where('code', $code)->value('id');
    }

    private function projectTypeIdByCode(string $code): ?int
    {
        return ProjectType::query()->where('code', $code)->value('id');
    }

    private function educationLevelIdByCode(string $code): ?int
    {
        return EducationLevel::query()->where('code', $code)->value('id');
    }

    /**
     * @return array<string, mixed>
     */
    private function serializeRepository(Repository $repository): array
    {
        $repository->loadMissing([
            'career:id,code',
            'projectType:id,code,requires_academic_advisor,requires_business_advisor',
            'educationLevel:id,code',
            'period:id,name,status',
            'company.address',
            'activeBusinessAdvisor',
            'activeAdvisor.advisor:id,first_name,last_name,second_last_name,email',
            'advisors' => fn ($query) => $query->latest('assigned_at')->with('advisor:id,first_name,last_name,second_last_name,email'),
        ]);

        $imagePaths = json_decode($repository->images ?? '[]', true) ?: [];
        $businessAdvisor = $repository->activeBusinessAdvisor;
        $companyAddress = $repository->company?->address;

        return [
            'id' => $repository->id,
            'title' => $repository->title,
            'slug' => $repository->slug,
            'description' => $repository->description,
            'project_type' => $repository->projectType?->code ?? '—',
            'requires_academic_advisor' => (bool) $repository->projectType?->requires_academic_advisor,
            'requires_business_advisor' => (bool) $repository->projectType?->requires_business_advisor,
            'academic_degree' => $repository->educationLevel?->code ?? '—',
            'keywords' => $repository->keywords,
            'is_public' => $repository->is_public,
            'career' => $repository->career?->code ?? '—',
            'project_period_id' => $repository->project_period_id,
            'project_period' => $repository->period ? [
                'id' => $repository->period->id,
                'name' => $repository->period->name,
                'status' => $repository->period->status->value,
            ] : null,
            'active_advisor' => $repository->activeAdvisor ? [
                'id' => $repository->activeAdvisor->id,
                'user_id' => $repository->activeAdvisor->user_id,
                'name' => $repository->activeAdvisor->advisor?->fullName(),
                'assigned_at' => $repository->activeAdvisor->assigned_at?->toIso8601String(),
                'override_reason' => $repository->activeAdvisor->override_reason,
            ] : null,
            'advisor_history' => $repository->relationLoaded('advisors')
                ? $repository->advisors->map(fn ($assignment): array => [
                    'id' => $assignment->id,
                    'name' => $assignment->advisor?->fullName(),
                    'assigned_at' => $assignment->assigned_at?->toIso8601String(),
                    'released_at' => $assignment->released_at?->toIso8601String(),
                    'override_reason' => $assignment->override_reason,
                ])->values()->all()
                : [],
            'company' => $repository->company ? [
                'id' => $repository->company->id,
                'name' => $repository->company->name,
                'rfc' => $repository->company->rfc,
                'sector' => $repository->company->sector,
                'phone' => $repository->company->phone,
                'email' => $repository->company->email,
                'address' => $companyAddress ? [
                    'id' => $companyAddress->id,
                    'street_line' => $companyAddress->street_line,
                    'street_line_2' => $companyAddress->street_line_2,
                    'neighborhood' => $companyAddress->neighborhood,
                    'city' => $companyAddress->city,
                    'state' => $companyAddress->state,
                    'postal_code' => $companyAddress->postal_code,
                    'country' => $companyAddress->country,
                    'references' => $companyAddress->references,
                    'formatted' => $companyAddress->format(),
                ] : null,
                'notes' => $repository->company->notes,
            ] : null,
            'business_advisor' => $businessAdvisor ? [
                'id' => $businessAdvisor->id,
                'first_name' => $businessAdvisor->first_name,
                'last_name' => $businessAdvisor->last_name,
                'second_last_name' => $businessAdvisor->second_last_name,
                'email' => $businessAdvisor->email,
                'phone' => $businessAdvisor->phone,
                'job_title' => $businessAdvisor->job_title,
                'department' => $businessAdvisor->department,
                'notes' => $businessAdvisor->notes,
                'acceptance_status' => $businessAdvisor->acceptance_status->value,
                'full_name' => $businessAdvisor->fullName(),
            ] : null,
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
