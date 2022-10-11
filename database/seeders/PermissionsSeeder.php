<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;
use Spatie\Permission\PermissionRegistrar;

class PermissionsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        // Reset cached roles and permissions
        app()[PermissionRegistrar::class]->forgetCachedPermissions();

        // create permissions

        $permisos = [
            //Operaciones sobre tabla usuario
            ['name' => 'usuarios.index', 'description' => 'Ver usuarios'],
            ['name' => 'usuarios.create', 'description' => 'Crear usuario'],
            ['name' => 'usuarios.edit', 'description' => 'Editar usuario'],
            ['name' => 'usuarios.destroy', 'description' => 'Borrar usuario'],
            ['name' => 'usuarios.search', 'description' => 'Buscar usuarios'],

            //Operaciones sobre tabla roles
            ['name' => 'roles.index', 'description' => 'Ver roles'],
            ['name' => 'roles.create', 'description' => 'Crear rol'],
            ['name' => 'roles.edit', 'description' => 'Editar rol'],
            ['name' => 'roles.destroy', 'description' => 'Borrar rol'],

            //Operacions sobre tabla repositorio
            ['name' => 'repositorios.index', 'description' => 'Ver repositorios'],
            ['name' => 'repositorios.create', 'description' => 'Crear repositorio'],
            ['name' => 'repositorios.edit', 'description' => 'Editar repositorio'],
            ['name' => 'repositorios.destroy', 'description' => 'Borrar repositorio'],

            //Operacions sobre tabla archivos
            ['name' => 'archivos.index', 'description' => 'Ver archivos'],
            ['name' => 'archivos.create', 'description' => 'Subir archivo'],
            ['name' => 'archivos.edit', 'description' => 'Editar archivo'],
            ['name' => 'archivos.destroy', 'description' => 'Borrar archivo'],
        ];

        foreach($permisos as $permiso){
            Permission::create([
                'name' => $permiso['name'],
                'description' => $permiso['description']
            ]);
        }

        // create roles and assign existing permissions
        $permissionByUser = [
            'docente' => [
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
            ],
            'alumno' => [
                'usuarios.search',

                'repositorios.index',
                'repositorios.create',
                'repositorios.edit',

                'archivos.index',
                'archivos.create',
                'archivos.edit',
                'archivos.destroy',
            ]
        ];

        $role1 = Role::create(['name' => 'admin']);

        $role2 = Role::create(['name' => 'docente']);
        foreach($permissionByUser['docente'] as $permission){
            $role2->givePermissionTo($permission);
        }
        
        $role3 = Role::create(['name' => 'alumno']);
        foreach($permissionByUser['alumno'] as $permission){
            $role3->givePermissionTo($permission);
        }
    }
}
