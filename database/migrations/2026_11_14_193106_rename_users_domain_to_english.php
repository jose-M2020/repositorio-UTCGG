<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;
use Spatie\Permission\PermissionRegistrar;

return new class extends Migration
{
    /**
     * @var array<string, string>
     */
    private array $roleRenames = [
        'alumno' => 'student',
        'docente' => 'teacher',
        'director_carrera' => 'career_director',
    ];

    /**
     * @var array<string, string>
     */
    private array $permissionRenames = [
        'usuarios.index' => 'users.index',
        'usuarios.create' => 'users.create',
        'usuarios.edit' => 'users.edit',
        'usuarios.destroy' => 'users.destroy',
        'usuarios.search' => 'users.search',
        'usuarios.career.any' => 'users.career.any',
    ];

    public function up(): void
    {
        if (Schema::hasColumn('users', 'nombre') && ! Schema::hasColumn('users', 'first_name')) {
            Schema::table('users', function (Blueprint $table): void {
                $table->renameColumn('nombre', 'first_name');
            });
        }

        if (Schema::hasColumn('users', 'apellido') && ! Schema::hasColumn('users', 'last_name')) {
            Schema::table('users', function (Blueprint $table): void {
                $table->renameColumn('apellido', 'last_name');
            });
        }

        foreach ($this->permissionRenames as $old => $new) {
            $this->renamePermission($old, $new);
        }

        foreach ($this->roleRenames as $oldRole => $newRole) {
            DB::table('roles')
                ->where('name', $oldRole)
                ->where('guard_name', 'web')
                ->update(['name' => $newRole]);

            $this->renamePermission(
                'usuarios.assign.'.$oldRole,
                'users.assign.'.$newRole,
            );
            $this->renamePermission(
                'users.assign.'.$oldRole,
                'users.assign.'.$newRole,
            );
        }

        $legacyAssign = DB::table('permissions')
            ->where('guard_name', 'web')
            ->where('name', 'like', 'usuarios.assign.%')
            ->pluck('name');

        foreach ($legacyAssign as $oldName) {
            $roleSuffix = substr((string) $oldName, strlen('usuarios.assign.'));
            $mappedSuffix = $this->roleRenames[$roleSuffix] ?? $roleSuffix;
            $this->renamePermission((string) $oldName, 'users.assign.'.$mappedSuffix);
        }

        app(PermissionRegistrar::class)->forgetCachedPermissions();
    }

    public function down(): void
    {
        if (Schema::hasColumn('users', 'first_name') && ! Schema::hasColumn('users', 'nombre')) {
            Schema::table('users', function (Blueprint $table): void {
                $table->renameColumn('first_name', 'nombre');
            });
        }

        if (Schema::hasColumn('users', 'last_name') && ! Schema::hasColumn('users', 'apellido')) {
            Schema::table('users', function (Blueprint $table): void {
                $table->renameColumn('last_name', 'apellido');
            });
        }

        foreach (array_flip($this->permissionRenames) as $old => $new) {
            $this->renamePermission($old, $new);
        }

        foreach (array_flip($this->roleRenames) as $oldRole => $newRole) {
            DB::table('roles')
                ->where('name', $oldRole)
                ->where('guard_name', 'web')
                ->update(['name' => $newRole]);

            $this->renamePermission(
                'users.assign.'.$oldRole,
                'usuarios.assign.'.$newRole,
            );
        }

        app(PermissionRegistrar::class)->forgetCachedPermissions();
    }

    private function renamePermission(string $old, string $new): void
    {
        if ($old === $new) {
            return;
        }

        $exists = DB::table('permissions')
            ->where('name', $old)
            ->where('guard_name', 'web')
            ->exists();

        if (! $exists) {
            return;
        }

        $targetTaken = DB::table('permissions')
            ->where('name', $new)
            ->where('guard_name', 'web')
            ->exists();

        if ($targetTaken) {
            DB::table('permissions')
                ->where('name', $old)
                ->where('guard_name', 'web')
                ->delete();

            return;
        }

        DB::table('permissions')
            ->where('name', $old)
            ->where('guard_name', 'web')
            ->update(['name' => $new]);
    }
};
