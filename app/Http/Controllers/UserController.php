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
            new Middleware('can:users.index', only: ['index']),
            new Middleware('can:users.create', only: ['store']),
            new Middleware('can:users.edit', only: ['update', 'updateRole', 'toggleActive', 'sendPasswordLink']),
            new Middleware('can:users.destroy', only: ['destroy']),
            new Middleware('can:users.search', only: ['search']),
        ];
    }

    public function index(Request $request): Response
    {
        $authUser = $request->user();
        $name = $request->string('name')->toString();
        $email = $request->string('email')->toString();
        $careers = array_values(array_filter((array) $request->input('career', [])));
        $assignableRoleNames = UserRoles::assignableBy($authUser);
        $roles = array_values(array_filter(
            (array) $request->input('role', []),
            fn ($role): bool => is_string($role)
                && $role !== ''
                && $role !== 'all'
                && in_array($role, $assignableRoleNames, true),
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
            ->whereKeyNot($authUser->getKey())
            ->when(
                UserRoles::isCareerScoped($authUser) && $authUser?->career_catalog_id,
                fn ($query) => $query->where('career_catalog_id', $authUser->career_catalog_id),
            )
            ->when($name !== '', function ($query) use ($name): void {
                $query->where(function ($inner) use ($name): void {
                    $inner->where('first_name', 'like', "%{$name}%")
                        ->orWhere('last_name', 'like', "%{$name}%")
                        ->orWhere('second_last_name', 'like', "%{$name}%");
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
            ->paginate(10, ['id', 'first_name', 'last_name', 'second_last_name', 'email', 'career_catalog_id', 'status', 'created_at'])
            ->withQueryString()
            ->through(fn (User $user): array => [
                'id' => $user->id,
                'first_name' => $user->first_name,
                'last_name' => $user->last_name,
                'second_last_name' => $user->second_last_name,
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
                'name' => $name,
                'email' => $email,
                'career' => $careers,
                'role' => $roles,
                'status' => $statuses,
                'date' => $date,
                'date_range' => $dateRange,
            ],
            'roles' => UserRoles::filterOptionsFor($authUser),
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
            $request->string('first_name')->toString(),
            $request->string('last_name')->toString(),
            $request->filled('second_last_name') ? $request->string('second_last_name')->toString() : null,
            $request->string('email')->toString(),
            $request->string('role')->toString(),
            $request->input('career'),
        );

        return redirect()
            ->route('users.index')
            ->with('status', $createUser->flashMessage($result['link_status']));
    }

    public function show(User $user, EnsureCanManageUser $ensureCanManageUser): Response
    {
        $ensureCanManageUser->handle(request()->user(), $user);

        $user->load(['roles:id,name', 'careerCatalog:id,code']);

        $repositories = $user->repositories()
            ->orderByDesc('repositories.created_at')
            ->get(['repositories.id', 'title', 'slug', 'repositories.is_public']);

        return Inertia::render('panel/users/show', [
            'user' => [
                'id' => $user->id,
                'first_name' => $user->first_name,
                'last_name' => $user->last_name,
                'second_last_name' => $user->second_last_name,
                'email' => $user->email,
                'career' => $user->careerCatalog?->code,
                'status' => $user->status->value,
                'roles' => $user->getRoleNames()->values()->all(),
                'created_at' => $user->created_at?->toDateTimeString(),
            ],
            'publicRepositories' => $repositories->where('is_public', true)->values(),
            'privateRepositories' => $repositories->where('is_public', false)->values(),
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
                    $inner->where('first_name', 'like', "%{$search}%")
                        ->orWhere('last_name', 'like', "%{$search}%")
                        ->orWhere('second_last_name', 'like', "%{$search}%")
                        ->orWhere('email', 'like', "%{$search}%");
                });
            })
            ->role([UserRoles::STUDENT, UserRoles::TEACHER])
            ->with('roles:id,name')
            ->paginate(10, ['id', 'first_name', 'last_name', 'second_last_name', 'email'])
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
            $request->string('first_name')->toString(),
            $request->string('last_name')->toString(),
            $request->filled('second_last_name') ? $request->string('second_last_name')->toString() : null,
            $request->string('email')->toString(),
            $request->input('career'),
        );

        return redirect()
            ->route('users.index')
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
            ->route('users.index')
            ->with('status', 'Rol actualizado exitosamente.');
    }

    public function toggleActive(
        User $user,
        ToggleUserActive $toggleUserActive,
    ): RedirectResponse {
        $result = $toggleUserActive->handle(request()->user(), $user);

        return redirect()
            ->route('users.index')
            ->with('status', $result['message']);
    }

    public function sendPasswordLink(
        User $user,
        SendUserPasswordLink $sendUserPasswordLink,
    ): RedirectResponse {
        $result = $sendUserPasswordLink->handle(request()->user(), $user);

        return redirect()
            ->route('users.index')
            ->with('status', $result['message']);
    }

    public function destroy(
        User $user,
        EnsureCanManageUser $ensureCanManageUser,
    ): RedirectResponse {
        $ensureCanManageUser->handle(request()->user(), $user);

        $user->delete();

        return redirect()
            ->route('users.index')
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
