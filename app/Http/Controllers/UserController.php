<?php

namespace App\Http\Controllers;

use App\Http\Requests\ChangeUserRoleRequest;
use App\Http\Requests\StoreUserRequest;
use App\Http\Requests\UpdateUserRequest;
use App\Models\Catalog as CatalogModel;
use App\Models\User;
use App\Support\Catalog as CatalogData;
use App\Support\UserRoles;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Routing\Controllers\HasMiddleware;
use Illuminate\Routing\Controllers\Middleware;
use Inertia\Inertia;
use Inertia\Response;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class UserController extends Controller implements HasMiddleware
{
    public static function middleware(): array
    {
        return [
            'auth',
            new Middleware('can:usuarios.index', only: ['index']),
            new Middleware('can:usuarios.create', only: ['store']),
            new Middleware('can:usuarios.edit', only: ['update', 'updateRole']),
            new Middleware('can:usuarios.destroy', only: ['destroy']),
            new Middleware('can:usuarios.search', only: ['search']),
        ];
    }

    public function index(Request $request): Response
    {
        $authUser = $request->user();
        $nombre = $request->string('nombre')->toString();
        $email = $request->string('email')->toString();
        $carreras = array_values(array_filter((array) $request->input('carrera', [])));
        $roles = array_values(array_filter(
            (array) $request->input('rol', []),
            fn ($role): bool => is_string($role) && $role !== '' && $role !== 'all',
        ));
        $dateRange = array_values((array) $request->input('rango_fecha', ['', '']));
        $fecha = $request->string('fecha')->toString();
        $hasDateRange = ($dateRange[0] ?? '') !== '' && ($dateRange[1] ?? '') !== '';

        if (UserRoles::isCareerScoped($authUser) && $authUser?->career_catalog_id) {
            $carreras = [];
        }

        $users = User::query()
            ->with('roles:id,name')
            ->with('careerCatalog:id,code')
            ->latest('id')
            ->when(
                UserRoles::isCareerScoped($authUser) && $authUser?->career_catalog_id,
                fn ($query) => $query->where('career_catalog_id', $authUser->career_catalog_id),
            )
            ->when($nombre !== '', function ($query) use ($nombre): void {
                $query->where(function ($inner) use ($nombre): void {
                    $inner->where('nombre', 'like', "%{$nombre}%")
                        ->orWhere('apellido', 'like', "%{$nombre}%");
                });
            })
            ->when($email !== '', fn ($query) => $query->where('email', 'like', "%{$email}%"))
            ->when($carreras !== [], fn ($query) => $query->whereHas(
                'careerCatalog',
                fn ($catalogQuery) => $catalogQuery->whereIn('code', $carreras),
            ))
            ->when($roles !== [], fn ($query) => $query->role($roles))
            ->when($hasDateRange, function ($query) use ($dateRange): void {
                $query->whereDate('created_at', '>=', $dateRange[0])
                    ->whereDate('created_at', '<=', $dateRange[1]);
            })
            ->when(! $hasDateRange && $fecha !== '', function ($query) use ($fecha): void {
                if ($fecha === 'today') {
                    $query->whereDate('created_at', now()->toDateString());

                    return;
                }

                if ($fecha === 'week') {
                    $query->whereBetween('created_at', [now()->startOfWeek(), now()->endOfWeek()]);

                    return;
                }

                if ($fecha === 'month') {
                    $query->whereMonth('created_at', now()->month)
                        ->whereYear('created_at', now()->year);

                    return;
                }

                if ($fecha === 'year') {
                    $query->whereYear('created_at', now()->year);
                }
            })
            ->paginate(10, ['id', 'nombre', 'apellido', 'email', 'career_catalog_id', 'created_at'])
            ->withQueryString()
            ->through(fn (User $user): array => [
                'id' => $user->id,
                'nombre' => $user->nombre,
                'apellido' => $user->apellido,
                'email' => $user->email,
                'carrera' => $user->careerCatalog?->code,
                'created_at' => (string) $user->created_at,
                'roles' => $user->roles->map(fn (Role $role) => [
                    'id' => $role->id,
                    'name' => $role->name,
                ])->values()->all(),
            ]);

        return Inertia::render('panel/users/index', [
            'users' => $users,
            'filters' => [
                'nombre' => $nombre,
                'email' => $email,
                'carrera' => $carreras,
                'rol' => $roles,
                'fecha' => $fecha,
                'rango_fecha' => $dateRange,
            ],
            'roles' => UserRoles::filterOptions(),
            'assignableRoles' => UserRoles::assignableOptionsFor($authUser),
            'rolePermissions' => $this->permissionsByAssignableRole($authUser),
            'careers' => CatalogData::careers(),
            'careerPolicy' => UserRoles::careerFormPolicyFor($authUser),
        ]);
    }

    public function store(StoreUserRequest $request): RedirectResponse
    {
        $data = $request->safe()->except(['rol', 'carrera']);
        $data['career_catalog_id'] = $this->resolveCareerCatalogId($request);

        $user = User::query()->create($data);
        $user->assignRole($request->string('rol')->toString());

        return redirect()
            ->route('usuarios.index')
            ->with('status', 'Usuario registrado exitosamente.');
    }

    public function show(User $user): Response
    {
        $this->ensureCanManage($user);

        $user->load(['roles:id,name', 'careerCatalog:id,code']);

        $repositorios = $user->repositories()
            ->orderByDesc('repositorios.created_at')
            ->get(['repositorios.id', 'nombre_rep', 'slug', 'publico']);

        return Inertia::render('panel/users/show', [
            'user' => [
                'id' => $user->id,
                'nombre' => $user->nombre,
                'apellido' => $user->apellido,
                'email' => $user->email,
                'carrera' => $user->careerCatalog?->code,
                'roles' => $user->getRoleNames()->values()->all(),
                'created_at' => $user->created_at?->toDateTimeString(),
            ],
            'repositoriosPublicos' => $repositorios->where('publico', true)->values(),
            'repositoriosPrivados' => $repositorios->where('publico', false)->values(),
        ]);
    }

    public function search(Request $request): JsonResponse
    {
        $search = $request->string('query')->toString();
        $authUser = $request->user();

        $users = User::query()
            ->latest('id')
            ->when(
                UserRoles::isCareerScoped($authUser) && $authUser?->career_catalog_id,
                fn ($query) => $query->where('career_catalog_id', $authUser->career_catalog_id),
            )
            ->when($search !== '', function ($query) use ($search): void {
                $query->where(function ($inner) use ($search): void {
                    $inner->where('nombre', 'like', "%{$search}%")
                        ->orWhere('apellido', 'like', "%{$search}%")
                        ->orWhere('email', 'like', "%{$search}%");
                });
            })
            ->role([UserRoles::ALUMNO, UserRoles::DOCENTE])
            ->with('roles:id,name')
            ->paginate(10, ['id', 'nombre', 'apellido', 'email'])
            ->withQueryString();

        return response()->json($users);
    }

    public function update(UpdateUserRequest $request, User $user): RedirectResponse
    {
        $this->ensureCanManage($user);

        $currentRole = (string) ($user->getRoleNames()->first() ?? '');
        $data = $request->safe()->except(['carrera']);
        $data['career_catalog_id'] = $this->resolveCareerCatalogIdForRole($request, $currentRole);

        $user->update($data);

        return redirect()
            ->route('usuarios.index')
            ->with('status', 'Usuario actualizado exitosamente.');
    }

    public function updateRole(ChangeUserRoleRequest $request, User $user): RedirectResponse
    {
        $this->ensureCanManage($user);

        $role = $request->string('rol')->toString();
        $authUser = $request->user();
        $careerCatalogId = null;

        if (UserRoles::requiresCareer($role)) {
            $careerCatalogId = $user->career_catalog_id
                ?? (UserRoles::isCareerScoped($authUser) ? $authUser?->career_catalog_id : null);
        }

        $user->syncRoles([$role]);
        $user->update([
            'career_catalog_id' => $careerCatalogId,
        ]);

        return redirect()
            ->route('usuarios.index')
            ->with('status', 'Rol actualizado exitosamente.');
    }

    public function destroy(User $user): RedirectResponse
    {
        $this->ensureCanManage($user);

        $user->delete();

        return redirect()
            ->route('usuarios.index')
            ->with('status', 'Usuario eliminado exitosamente.');
    }

    private function resolveCareerCatalogId(StoreUserRequest $request): ?int
    {
        return $this->resolveCareerCatalogIdForRole(
            $request,
            $request->string('rol')->toString(),
        );
    }

    private function resolveCareerCatalogIdForRole(
        StoreUserRequest|UpdateUserRequest $request,
        string $role,
    ): ?int {
        if (! UserRoles::requiresCareer($role)) {
            return null;
        }

        $authUser = $request->user();

        if (UserRoles::isCareerScoped($authUser)) {
            return $authUser?->career_catalog_id;
        }

        $code = $request->string('carrera')->toString();

        if ($code === '') {
            return null;
        }

        return $this->careerCatalogId($code);
    }

    /**
     * @return array<string, list<array{name: string, description: string|null}>>
     */
    private function permissionsByAssignableRole(?User $authUser): array
    {
        $roleNames = UserRoles::assignableBy($authUser);

        if ($roleNames === []) {
            return [];
        }

        $roles = Role::query()
            ->whereIn('name', $roleNames)
            ->with('permissions:id,name,description')
            ->get(['id', 'name']);

        $map = [];

        foreach ($roles as $role) {
            $map[$role->name] = $role->permissions
                ->sortBy('name')
                ->values()
                ->map(fn (Permission $permission): array => [
                    'name' => $permission->name,
                    'description' => $permission->description,
                ])
                ->all();
        }

        return $map;
    }

    private function careerCatalogId(string $code): ?int
    {
        return CatalogModel::query()
            ->where('type', CatalogModel::TYPE_CAREER)
            ->where('code', $code)
            ->value('id');
    }

    private function ensureCanManage(User $user): void
    {
        $authUser = auth()->user();

        if (! UserRoles::isCareerScoped($authUser)) {
            return;
        }

        abort_unless(
            $authUser?->career_catalog_id
                && $user->career_catalog_id === $authUser->career_catalog_id,
            403,
        );
    }
}
