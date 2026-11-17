<?php

namespace Database\Seeders;

use App\Support\Permissions;
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

        foreach (Permissions::catalog() as $permission) {
            Permission::query()->updateOrCreate(
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

        Role::query()->where('name', UserRoles::DIRECTOR)->firstOrFail()
            ->syncPermissions(Permissions::defaultsForRole(UserRoles::DIRECTOR));

        Role::query()->where('name', UserRoles::CAREER_DIRECTOR)->firstOrFail()
            ->syncPermissions(Permissions::defaultsForRole(UserRoles::CAREER_DIRECTOR));

        Role::query()->where('name', UserRoles::TEACHER)->firstOrFail()
            ->syncPermissions(Permissions::defaultsForRole(UserRoles::TEACHER));

        Role::query()->where('name', UserRoles::STUDENT)->firstOrFail()
            ->syncPermissions(Permissions::defaultsForRole(UserRoles::STUDENT));

        app(PermissionRegistrar::class)->forgetCachedPermissions();
    }
}
