<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;
use Spatie\Permission\PermissionRegistrar;

return new class extends Migration
{
    /**
     * @var list<array{name: string, description: string, source: string}>
     */
    private array $permissions = [
        [
            'name' => 'users.toggle-active',
            'description' => 'Activar/desactivar usuario',
            'source' => 'users.edit',
        ],
        [
            'name' => 'users.update-role',
            'description' => 'Cambiar rol de usuario',
            'source' => 'users.edit',
        ],
        [
            'name' => 'users.password-link',
            'description' => 'Enviar enlace de contraseña',
            'source' => 'users.edit',
        ],
        [
            'name' => 'careers.toggle-active',
            'description' => 'Activar/desactivar carrera',
            'source' => 'careers.edit',
        ],
        [
            'name' => 'project_types.toggle-active',
            'description' => 'Activar/desactivar tipo de proyecto',
            'source' => 'project_types.edit',
        ],
        [
            'name' => 'education_levels.toggle-active',
            'description' => 'Activar/desactivar nivel educativo',
            'source' => 'education_levels.edit',
        ],
    ];

    public function up(): void
    {
        if (! Schema::hasTable('permissions') || ! Schema::hasTable('role_has_permissions')) {
            return;
        }

        $now = now();
        $permissionIds = [];

        foreach ($this->permissions as $permission) {
            $existing = DB::table('permissions')
                ->where('name', $permission['name'])
                ->where('guard_name', 'web')
                ->first();

            if ($existing) {
                $permissionIds[$permission['name']] = (int) $existing->id;

                if ($existing->description !== $permission['description']) {
                    DB::table('permissions')
                        ->where('id', $existing->id)
                        ->update([
                            'description' => $permission['description'],
                            'updated_at' => $now,
                        ]);
                }

                continue;
            }

            $permissionIds[$permission['name']] = (int) DB::table('permissions')->insertGetId([
                'name' => $permission['name'],
                'guard_name' => 'web',
                'description' => $permission['description'],
                'created_at' => $now,
                'updated_at' => $now,
            ]);
        }

        foreach ($this->permissions as $permission) {
            $sourceId = DB::table('permissions')
                ->where('name', $permission['source'])
                ->where('guard_name', 'web')
                ->value('id');

            if (! $sourceId) {
                continue;
            }

            $roleIds = DB::table('role_has_permissions')
                ->where('permission_id', $sourceId)
                ->pluck('role_id');

            $newPermissionId = $permissionIds[$permission['name']] ?? null;
            if (! $newPermissionId) {
                continue;
            }

            foreach ($roleIds as $roleId) {
                $exists = DB::table('role_has_permissions')
                    ->where('role_id', $roleId)
                    ->where('permission_id', $newPermissionId)
                    ->exists();

                if ($exists) {
                    continue;
                }

                DB::table('role_has_permissions')->insert([
                    'permission_id' => $newPermissionId,
                    'role_id' => $roleId,
                ]);
            }
        }

        app(PermissionRegistrar::class)->forgetCachedPermissions();
    }

    public function down(): void
    {
        if (! Schema::hasTable('permissions')) {
            return;
        }

        $names = array_column($this->permissions, 'name');
        $permissionIds = DB::table('permissions')
            ->whereIn('name', $names)
            ->pluck('id');

        if ($permissionIds->isNotEmpty() && Schema::hasTable('role_has_permissions')) {
            DB::table('role_has_permissions')
                ->whereIn('permission_id', $permissionIds)
                ->delete();
        }

        DB::table('permissions')->whereIn('name', $names)->delete();

        app(PermissionRegistrar::class)->forgetCachedPermissions();
    }
};
