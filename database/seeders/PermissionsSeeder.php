<?php

namespace Database\Seeders;

use App\Support\RoleAssignPermissionSync;
use App\Support\UserRoles;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;
use Spatie\Permission\PermissionRegistrar;

class PermissionsSeeder extends Seeder
{
    /**
     * Seed roles and permissions.
     */
    public function run(): void
    {
        app(PermissionRegistrar::class)->forgetCachedPermissions();

        $permissions = [
            ['name' => 'users.index', 'description' => 'Ver usuarios'],
            ['name' => 'users.create', 'description' => 'Crear usuario'],
            ['name' => 'users.edit', 'description' => 'Editar usuario'],
            ['name' => 'users.destroy', 'description' => 'Borrar usuario'],
            ['name' => 'users.search', 'description' => 'Buscar usuarios'],
            ['name' => UserRoles::CAREER_ANY, 'description' => 'Seleccionar cualquier carrera al registrar usuarios'],
            ['name' => 'roles.index', 'description' => 'Ver roles'],
            ['name' => 'roles.create', 'description' => 'Crear rol'],
            ['name' => 'roles.edit', 'description' => 'Editar rol'],
            ['name' => 'roles.destroy', 'description' => 'Borrar rol'],
            ['name' => 'catalogs.index', 'description' => 'Ver catalogos'],
            ['name' => 'catalogs.create', 'description' => 'Crear catalogo'],
            ['name' => 'catalogs.edit', 'description' => 'Editar catalogo'],
            ['name' => 'catalogs.destroy', 'description' => 'Borrar catalogo'],
            ['name' => 'repositories.index', 'description' => 'Ver repositorios'],
            ['name' => 'repositories.create', 'description' => 'Crear repositorio'],
            ['name' => 'repositories.edit', 'description' => 'Editar repositorio'],
            ['name' => 'repositories.destroy', 'description' => 'Borrar repositorio'],
            ['name' => 'files.index', 'description' => 'Ver archivos'],
            ['name' => 'files.create', 'description' => 'Subir archivo'],
            ['name' => 'files.edit', 'description' => 'Editar archivo'],
            ['name' => 'files.destroy', 'description' => 'Borrar archivo'],
        ];

        foreach ($permissions as $permission) {
            Permission::query()->firstOrCreate(
                ['name' => $permission['name'], 'guard_name' => 'web'],
                ['description' => $permission['description']],
            );
        }

        Role::query()->firstOrCreate(['name' => UserRoles::ADMIN, 'guard_name' => 'web']);
        Role::query()->firstOrCreate(['name' => UserRoles::DIRECTOR, 'guard_name' => 'web']);
        Role::query()->firstOrCreate(['name' => UserRoles::CAREER_DIRECTOR, 'guard_name' => 'web']);
        Role::query()->firstOrCreate(['name' => UserRoles::TEACHER, 'guard_name' => 'web']);
        Role::query()->firstOrCreate(['name' => UserRoles::STUDENT, 'guard_name' => 'web']);

        RoleAssignPermissionSync::syncAllExistingRoles();

        $director = Role::query()->where('name', UserRoles::DIRECTOR)->firstOrFail();
        $director->syncPermissions([
            'users.index',
            'users.create',
            'users.edit',
            'users.destroy',
            'users.search',
            UserRoles::CAREER_ANY,
            RoleAssignPermissionSync::permissionName(UserRoles::CAREER_DIRECTOR),
            RoleAssignPermissionSync::permissionName(UserRoles::TEACHER),
            RoleAssignPermissionSync::permissionName(UserRoles::STUDENT),
            'repositories.index',
            'repositories.create',
            'repositories.edit',
            'repositories.destroy',
            'files.index',
            'files.create',
            'files.edit',
            'files.destroy',
        ]);

        $careerDirector = Role::query()->where('name', UserRoles::CAREER_DIRECTOR)->firstOrFail();
        $careerDirector->syncPermissions([
            'users.index',
            'users.create',
            'users.edit',
            'users.search',
            RoleAssignPermissionSync::permissionName(UserRoles::TEACHER),
            RoleAssignPermissionSync::permissionName(UserRoles::STUDENT),
            'repositories.index',
            'repositories.create',
            'repositories.edit',
            'repositories.destroy',
            'files.index',
            'files.create',
            'files.edit',
            'files.destroy',
        ]);

        $teacher = Role::query()->where('name', UserRoles::TEACHER)->firstOrFail();
        $teacher->syncPermissions([
            'users.search',
            'repositories.index',
            'repositories.create',
            'repositories.edit',
            'repositories.destroy',
            'files.index',
            'files.create',
            'files.edit',
            'files.destroy',
        ]);

        $student = Role::query()->where('name', UserRoles::STUDENT)->firstOrFail();
        $student->syncPermissions([
            'users.search',
            'repositories.index',
            'repositories.create',
            'repositories.edit',
            'files.index',
            'files.create',
            'files.edit',
            'files.destroy',
        ]);

        app(PermissionRegistrar::class)->forgetCachedPermissions();
    }
}
