<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreRoleRequest;
use App\Http\Requests\UpdateRoleRequest;
use App\Support\RoleAssignPermissionSync;
use App\Support\UserRoles;
use Illuminate\Http\RedirectResponse;
use Illuminate\Routing\Controllers\HasMiddleware;
use Illuminate\Routing\Controllers\Middleware;
use Inertia\Inertia;
use Inertia\Response;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class RoleController extends Controller implements HasMiddleware
{
    public static function middleware(): array
    {
        return [
            'auth',
            new Middleware('can:roles.index', only: ['index']),
            new Middleware('can:roles.create', only: ['create', 'store']),
            new Middleware('can:roles.edit', only: ['edit', 'update']),
            new Middleware('can:roles.destroy', only: ['destroy']),
        ];
    }

    public function index(): Response
    {
        $roles = Role::query()
            ->with('permissions:id,name,description')
            ->withCount(['permissions', 'users'])
            ->orderBy('name')
            ->paginate(10)
            ->through(fn (Role $role): array => [
                'id' => $role->id,
                'name' => $role->name,
                'permissions_count' => $role->permissions_count,
                'users_count' => $role->users_count,
                'can_delete' => UserRoles::canDelete($role),
                'permissions' => $role->permissions
                    ->map(fn (Permission $permission) => [
                        'id' => $permission->id,
                        'name' => $permission->name,
                        'description' => $permission->description,
                    ])
                    ->values()
                    ->all(),
            ]);

        return Inertia::render('panel/roles/index', [
            'roles' => $roles,
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('panel/roles/create', [
            'permissionGroups' => $this->permissionGroups(),
        ]);
    }

    public function store(StoreRoleRequest $request): RedirectResponse
    {
        $roleName = $request->string('name')->toString();

        $role = Role::query()->create([
            'name' => $roleName,
            'guard_name' => 'web',
        ]);

        RoleAssignPermissionSync::ensureFor($roleName);
        $role->syncPermissions($request->input('permissions', []));

        return redirect()
            ->route('roles.index')
            ->with('status', 'Rol creado exitosamente.');
    }

    public function show(Role $role): Response
    {
        $role->load('permissions:id,name,description');

        return Inertia::render('panel/roles/show', [
            'role' => [
                'id' => $role->id,
                'name' => $role->name,
                'permissions' => $role->permissions
                    ->map(fn (Permission $permission) => [
                        'id' => $permission->id,
                        'name' => $permission->name,
                        'description' => $permission->description,
                    ])
                    ->values()
                    ->all(),
            ],
        ]);
    }

    public function edit(Role $role): Response
    {
        $role->load('permissions:id,name');

        return Inertia::render('panel/roles/edit', [
            'role' => [
                'id' => $role->id,
                'name' => $role->name,
                'permissions' => $role->permissions->pluck('name')->values()->all(),
            ],
            'permissionGroups' => $this->permissionGroups(),
        ]);
    }

    public function update(UpdateRoleRequest $request, Role $role): RedirectResponse
    {
        $oldName = $role->name;
        $newName = $request->string('name')->toString();

        $role->update([
            'name' => $newName,
        ]);

        RoleAssignPermissionSync::rename($oldName, $newName);

        $permissions = RoleAssignPermissionSync::remapPermissionsAfterRename(
            array_values(array_map('strval', $request->input('permissions', []))),
            $oldName,
            $newName,
        );

        $role->syncPermissions($permissions);

        return redirect()
            ->route('roles.index')
            ->with('status', 'Rol actualizado exitosamente.');
    }

    public function destroy(Role $role): RedirectResponse
    {
        if (UserRoles::isSystem($role->name)) {
            return redirect()
                ->route('roles.index')
                ->with('error', 'No se puede eliminar un rol del sistema.');
        }

        if ($role->users()->exists()) {
            return redirect()
                ->route('roles.index')
                ->with(
                    'error',
                    'No se puede eliminar el rol porque tiene usuarios asignados. Reasigna esos usuarios primero.',
                );
        }

        $roleName = $role->name;
        $role->delete();
        RoleAssignPermissionSync::deleteFor($roleName);

        return redirect()
            ->route('roles.index')
            ->with('status', 'Rol eliminado exitosamente.');
    }

    /**
     * @return array<string, list<array{id: int, name: string, description: string|null}>>
     */
    private function permissionGroups(): array
    {
        $groups = [];

        foreach (Permission::query()->orderBy('name')->get(['id', 'name', 'description']) as $permission) {
            $group = strstr($permission->name, '.', true) ?: $permission->name;

            $groups[$group][] = [
                'id' => $permission->id,
                'name' => $permission->name,
                'description' => $permission->description,
            ];
        }

        ksort($groups);

        return $groups;
    }
}
