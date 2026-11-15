<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Str;
use Spatie\Permission\PermissionRegistrar;

return new class extends Migration
{
    /**
     * @var list<string>
     */
    private array $actions = ['index', 'create', 'edit', 'destroy'];

    /**
     * @var array<string, string>
     */
    private array $resources = [
        'careers' => 'carreras',
        'project_types' => 'tipos de proyecto',
        'education_levels' => 'niveles educativos',
    ];

    /**
     * @var array<string, string>
     */
    private array $actionLabels = [
        'index' => 'Ver',
        'create' => 'Crear',
        'edit' => 'Editar',
        'destroy' => 'Borrar',
    ];

    public function up(): void
    {
        if (! Schema::hasTable('permissions')) {
            return;
        }

        $now = now();
        $catalogPermissionIds = DB::table('permissions')
            ->where('name', 'like', 'catalogs.%')
            ->pluck('id', 'name');

        $newPermissionIds = [];

        foreach ($this->resources as $resource => $label) {
            foreach ($this->actions as $action) {
                $name = "{$resource}.{$action}";
                $description = "{$this->actionLabels[$action]} {$label}";

                $existing = DB::table('permissions')
                    ->where('name', $name)
                    ->where('guard_name', 'web')
                    ->first();

                if ($existing) {
                    $newPermissionIds[$name] = $existing->id;
                    continue;
                }

                $id = DB::table('permissions')->insertGetId([
                    'name' => $name,
                    'guard_name' => 'web',
                    'description' => $description,
                    'created_at' => $now,
                    'updated_at' => $now,
                ]);

                $newPermissionIds[$name] = $id;
            }
        }

        foreach ($catalogPermissionIds as $oldName => $oldId) {
            $action = Str::after($oldName, 'catalogs.');
            if (! in_array($action, $this->actions, true)) {
                continue;
            }

            $roleIds = DB::table('role_has_permissions')
                ->where('permission_id', $oldId)
                ->pluck('role_id');

            foreach ($roleIds as $roleId) {
                foreach (array_keys($this->resources) as $resource) {
                    $newId = $newPermissionIds["{$resource}.{$action}"] ?? null;
                    if ($newId === null) {
                        continue;
                    }

                    $exists = DB::table('role_has_permissions')
                        ->where('permission_id', $newId)
                        ->where('role_id', $roleId)
                        ->exists();

                    if (! $exists) {
                        DB::table('role_has_permissions')->insert([
                            'permission_id' => $newId,
                            'role_id' => $roleId,
                        ]);
                    }
                }
            }
        }

        if (Schema::hasTable('model_has_permissions')) {
            DB::table('model_has_permissions')
                ->whereIn('permission_id', $catalogPermissionIds->values()->all())
                ->delete();
        }

        DB::table('role_has_permissions')
            ->whereIn('permission_id', $catalogPermissionIds->values()->all())
            ->delete();

        DB::table('permissions')
            ->whereIn('id', $catalogPermissionIds->values()->all())
            ->delete();

        app(PermissionRegistrar::class)->forgetCachedPermissions();
    }

    public function down(): void
    {
        $now = now();

        $catalogPermissionIds = [];
        foreach ($this->actions as $action) {
            $name = "catalogs.{$action}";
            $existing = DB::table('permissions')
                ->where('name', $name)
                ->where('guard_name', 'web')
                ->first();

            if ($existing) {
                $catalogPermissionIds[$action] = $existing->id;
                continue;
            }

            $catalogPermissionIds[$action] = DB::table('permissions')->insertGetId([
                'name' => $name,
                'guard_name' => 'web',
                'description' => "{$this->actionLabels[$action]} catalogos",
                'created_at' => $now,
                'updated_at' => $now,
            ]);
        }

        $newNames = [];
        foreach (array_keys($this->resources) as $resource) {
            foreach ($this->actions as $action) {
                $newNames[] = "{$resource}.{$action}";
            }
        }

        $newPermissions = DB::table('permissions')
            ->whereIn('name', $newNames)
            ->get();

        foreach ($newPermissions as $permission) {
            $action = Str::after($permission->name, '.');
            // resource.action → take last segment
            $action = Str::afterLast($permission->name, '.');
            $catalogId = $catalogPermissionIds[$action] ?? null;
            if ($catalogId === null) {
                continue;
            }

            $roleIds = DB::table('role_has_permissions')
                ->where('permission_id', $permission->id)
                ->pluck('role_id');

            foreach ($roleIds as $roleId) {
                $exists = DB::table('role_has_permissions')
                    ->where('permission_id', $catalogId)
                    ->where('role_id', $roleId)
                    ->exists();

                if (! $exists) {
                    DB::table('role_has_permissions')->insert([
                        'permission_id' => $catalogId,
                        'role_id' => $roleId,
                    ]);
                }
            }
        }

        DB::table('role_has_permissions')
            ->whereIn('permission_id', $newPermissions->pluck('id')->all())
            ->delete();

        DB::table('permissions')
            ->whereIn('id', $newPermissions->pluck('id')->all())
            ->delete();

        app(PermissionRegistrar::class)->forgetCachedPermissions();
    }
};
