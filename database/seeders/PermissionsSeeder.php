<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;
use Spatie\Permission\PermissionRegistrar;

class PermissionsSeeder extends Seeder
{
    /**
     * Seed roles and permissions from the legacy application.
     */
    public function run(): void
    {
        app(PermissionRegistrar::class)->forgetCachedPermissions();

        $permissions = [
            ['name' => 'usuarios.index', 'description' => 'Ver usuarios'],
            ['name' => 'usuarios.create', 'description' => 'Crear usuario'],
            ['name' => 'usuarios.edit', 'description' => 'Editar usuario'],
            ['name' => 'usuarios.destroy', 'description' => 'Borrar usuario'],
            ['name' => 'usuarios.search', 'description' => 'Buscar usuarios'],
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

        Role::query()->firstOrCreate(['name' => 'admin', 'guard_name' => 'web']);

        $docente = Role::query()->firstOrCreate(['name' => 'docente', 'guard_name' => 'web']);
        $docente->syncPermissions([
            'usuarios.index',
            'usuarios.create',
            'usuarios.edit',
            'repositorios.index',
            'repositorios.create',
            'repositorios.edit',
            'repositorios.destroy',
            'archivos.index',
            'archivos.create',
            'archivos.edit',
            'archivos.destroy',
        ]);

        $alumno = Role::query()->firstOrCreate(['name' => 'alumno', 'guard_name' => 'web']);
        $alumno->syncPermissions([
            'usuarios.search',
            'repositorios.index',
            'repositorios.create',
            'repositorios.edit',
            'archivos.index',
            'archivos.create',
            'archivos.edit',
            'archivos.destroy',
        ]);
    }
}
