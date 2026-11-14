<?php

namespace App\Http\Controllers;

use App\Actions\Users\ChangeUserRole;
use App\Actions\Users\CreateUser;
use App\Actions\Users\EnsureCanManageUser;
use App\Actions\Users\SendUserPasswordLink;
use App\Actions\Users\ToggleUserActive;
use App\Actions\Users\UpdateUserProfile;
use App\Enums\UserAccountStatus;
use App\Http\Requests\ChangeUserRoleRequest;
use App\Http\Requests\StoreUserRequest;
use App\Http\Requests\UpdateUserRequest;
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
            new Middleware('can:usuarios.edit', only: ['update', 'updateRole', 'toggleActive', 'sendPasswordLink']),
            new Middleware('can:usuarios.destroy', only: ['destroy']),
            new Middleware('can:usuarios.search', only: ['search']),
        ];
    }

    public function index(Request $request): Response
    {
        $authUser = $request->user();
        $nombre = $request->string('nombre')->toString();
        $email = $request->string('email')->toString();
        $careers = array_values(array_filter((array) $request->input('career', [])));
        $roles = array_values(array_filter(
            (array) $request->input('role', []),
            fn ($role): bool => is_string($role) && $role !== '' && $role !== 'all',
        ));
        $allowedStatuses = array_column(UserAccountStatus::cases(), 'value');
        $statuses = array_values(array_filter(
            (array) $request->input('status', []),
            fn ($status): bool => is_string($status) && in_array($status, $allowedStatuses, true),
        ));
        $dateRange = array_values((array) $request->input('date_range', ['', '']));
        $date = $request->string('date')->toString();
        $hasDateRange = ($dateRange[0] ?? '') !== '' && ($dateRange[1] ?? '') !== '';

        if (UserRoles::isCareerScoped($authUser) && $authUser?->career_catalog_id) {
            $careers = [];
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
            ->when($careers !== [], fn ($query) => $query->whereHas(
                'careerCatalog',
                fn ($catalogQuery) => $catalogQuery->whereIn('code', $careers),
            ))
            ->when($roles !== [], fn ($query) => $query->role($roles))
            ->when($statuses !== [], fn ($query) => $query->whereIn('status', $statuses))
            ->when($hasDateRange, function ($query) use ($dateRange): void {
                $query->whereDate('created_at', '>=', $dateRange[0])
                    ->whereDate('created_at', '<=', $dateRange[1]);
            })
            ->when(! $hasDateRange && $date !== '', function ($query) use ($date): void {
                if ($date === 'today') {
                    $query->whereDate('created_at', now()->toDateString());

                    return;
                }

                if ($date === 'week') {
                    $query->whereBetween('created_at', [now()->startOfWeek(), now()->endOfWeek()]);

                    return;
                }

                if ($date === 'month') {
                    $query->whereMonth('created_at', now()->month)
                        ->whereYear('created_at', now()->year);

                    return;
                }

                if ($date === 'year') {
                    $query->whereYear('created_at', now()->year);
                }
            })
            ->paginate(10, ['id', 'nombre', 'apellido', 'email', 'career_catalog_id', 'status', 'created_at'])
            ->withQueryString()
            ->through(fn (User $user): array => [
                'id' => $user->id,
                'nombre' => $user->nombre,
                'apellido' => $user->apellido,
                'email' => $user->email,
                'career' => $user->careerCatalog?->code,
                'status' => $user->status->value,
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
                'career' => $careers,
                'role' => $roles,
                'status' => $statuses,
                'date' => $date,
                'date_range' => $dateRange,
            ],
            'roles' => UserRoles::filterOptions(),
            'assignableRoles' => UserRoles::assignableOptionsFor($authUser),
            'rolePermissions' => $this->permissionsByAssignableRole($authUser),
            'careers' => CatalogData::careers(),
            'careerPolicy' => UserRoles::careerFormPolicyFor($authUser),
        ]);
    }

    public function store(StoreUserRequest $request, CreateUser $createUser): RedirectResponse
    {
        $result = $createUser->handle(
            $request->user(),
            $request->string('nombre')->toString(),
            $request->string('apellido')->toString(),
            $request->string('email')->toString(),
            $request->string('role')->toString(),
            $request->input('career'),
        );

        return redirect()
            ->route('usuarios.index')
            ->with('status', $createUser->flashMessage($result['link_status']));
    }

    public function show(User $user, EnsureCanManageUser $ensureCanManageUser): Response
    {
        $ensureCanManageUser->handle(request()->user(), $user);

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
                'career' => $user->careerCatalog?->code,
                'status' => $user->status->value,
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

    public function update(
        UpdateUserRequest $request,
        User $user,
        UpdateUserProfile $updateUserProfile,
    ): RedirectResponse {
        $updateUserProfile->handle(
            $request->user(),
            $user,
            $request->string('nombre')->toString(),
            $request->string('apellido')->toString(),
            $request->string('email')->toString(),
            $request->input('career'),
        );

        return redirect()
            ->route('usuarios.index')
            ->with('status', 'Usuario actualizado exitosamente.');
    }

    public function updateRole(
        ChangeUserRoleRequest $request,
        User $user,
        ChangeUserRole $changeUserRole,
    ): RedirectResponse {
        $changeUserRole->handle(
            $request->user(),
            $user,
            $request->string('role')->toString(),
        );

        return redirect()
            ->route('usuarios.index')
            ->with('status', 'Rol actualizado exitosamente.');
    }

    public function toggleActive(
        User $user,
        ToggleUserActive $toggleUserActive,
    ): RedirectResponse {
        $result = $toggleUserActive->handle(request()->user(), $user);

        return redirect()
            ->route('usuarios.index')
            ->with('status', $result['message']);
    }

    public function sendPasswordLink(
        User $user,
        SendUserPasswordLink $sendUserPasswordLink,
    ): RedirectResponse {
        $result = $sendUserPasswordLink->handle(request()->user(), $user);

        return redirect()
            ->route('usuarios.index')
            ->with('status', $result['message']);
    }

    public function destroy(
        User $user,
        EnsureCanManageUser $ensureCanManageUser,
    ): RedirectResponse {
        $ensureCanManageUser->handle(request()->user(), $user);

        $user->delete();

        return redirect()
            ->route('usuarios.index')
            ->with('status', 'Usuario eliminado exitosamente.');
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
}
