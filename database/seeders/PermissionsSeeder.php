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
            ['name' => 'catalogos.index', 'description' => 'Ver catalogos'],
            ['name' => 'catalogos.create', 'description' => 'Crear catalogo'],
            ['name' => 'catalogos.edit', 'description' => 'Editar catalogo'],
            ['name' => 'catalogos.destroy', 'description' => 'Borrar catalogo'],
            ['name' => 'repositorios.index', 'description' => 'Ver repositorios'],
            ['name' => 'repositorios.create', 'description' => 'Crear repositorio'],
            ['name' => 'repositorios.edit', 'description' => 'Editar repositorio'],
            ['name' => 'repositorios.destroy', 'description' => 'Borrar repositorio'],
            ['name' => 'archivos.index', 'description' => 'Ver archivos'],
            ['name' => 'archivos.create', 'description' => 'Subir archivo'],
            ['name' => 'archivos.edit', 'description' => 'Editar archivo'],
            ['name' => 'archivos.destroy', 'description' => 'Borrar archivo'],
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
            'repositorios.index',
            'repositorios.create',
            'repositorios.edit',
            'repositorios.destroy',
            'archivos.index',
            'archivos.create',
            'archivos.edit',
            'archivos.destroy',
        ]);

        $careerDirector = Role::query()->where('name', UserRoles::CAREER_DIRECTOR)->firstOrFail();
        $careerDirector->syncPermissions([
            'users.index',
            'users.create',
            'users.edit',
            'users.search',
            RoleAssignPermissionSync::permissionName(UserRoles::TEACHER),
            RoleAssignPermissionSync::permissionName(UserRoles::STUDENT),
            'repositorios.index',
            'repositorios.create',
            'repositorios.edit',
            'repositorios.destroy',
            'archivos.index',
            'archivos.create',
            'archivos.edit',
            'archivos.destroy',
        ]);

        $teacher = Role::query()->where('name', UserRoles::TEACHER)->firstOrFail();
        $teacher->syncPermissions([
            'users.search',
            'repositorios.index',
            'repositorios.create',
            'repositorios.edit',
            'repositorios.destroy',
            'archivos.index',
            'archivos.create',
            'archivos.edit',
            'archivos.destroy',
        ]);

        $student = Role::query()->where('name', UserRoles::STUDENT)->firstOrFail();
        $student->syncPermissions([
            'users.search',
            'repositorios.index',
            'repositorios.create',
            'repositorios.edit',
            'archivos.index',
            'archivos.create',
            'archivos.edit',
            'archivos.destroy',
        ]);

        app(PermissionRegistrar::class)->forgetCachedPermissions();
    }
}
