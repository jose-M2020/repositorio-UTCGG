<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreRoleRequest;
use App\Http\Requests\UpdateRoleRequest;
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
            ->withCount('permissions')
            ->orderBy('name')
            ->paginate(10);

        return Inertia::render('roles/index', [
            'roles' => $roles,
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('roles/create', [
            'permissionGroups' => $this->permissionGroups(),
        ]);
    }

    public function store(StoreRoleRequest $request): RedirectResponse
    {
        $role = Role::query()->create([
            'name' => $request->string('name')->toString(),
            'guard_name' => 'web',
        ]);

        $role->syncPermissions($request->input('permissions', []));

        return redirect()
            ->route('roles.index')
            ->with('status', 'Rol creado exitosamente.');
    }

    public function show(Role $role): Response
    {
        $role->load('permissions:id,name,description');

        return Inertia::render('roles/show', [
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

        return Inertia::render('roles/edit', [
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
        $role->update([
            'name' => $request->string('name')->toString(),
        ]);

        $role->syncPermissions($request->input('permissions', []));

        return redirect()
            ->route('roles.index')
            ->with('status', 'Rol actualizado exitosamente.');
    }

    public function destroy(Role $role): RedirectResponse
    {
        $role->delete();

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
