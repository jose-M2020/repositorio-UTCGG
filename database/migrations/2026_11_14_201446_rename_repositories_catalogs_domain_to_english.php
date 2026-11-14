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
    private array $permissionRenames = [
        'catalogos.index' => 'catalogs.index',
        'catalogos.create' => 'catalogs.create',
        'catalogos.edit' => 'catalogs.edit',
        'catalogos.destroy' => 'catalogs.destroy',
        'repositorios.index' => 'repositories.index',
        'repositorios.create' => 'repositories.create',
        'repositorios.edit' => 'repositories.edit',
        'repositorios.destroy' => 'repositories.destroy',
        'archivos.index' => 'files.index',
        'archivos.create' => 'files.create',
        'archivos.edit' => 'files.edit',
        'archivos.destroy' => 'files.destroy',
    ];

    /**
     * @var array<string, string>
     */
    private array $catalogCodeRenames = [
        'Ingeniería' => 'engineering',
        'Integradora' => 'integrative',
        'Estadía' => 'internship',
        'Proyecto Especial' => 'special_project',
    ];

    /**
     * @var array<string, string>
     */
    private array $repositoryColumnRenames = [
        'nombre_rep' => 'title',
        'descripcion' => 'description',
        'palabras_clave' => 'keywords',
        'publico' => 'is_public',
        'asesor_externo' => 'external_advisor',
        'empresa' => 'company',
        'generacion' => 'generation',
        'imagenes' => 'images',
    ];

    public function up(): void
    {
        foreach ($this->permissionRenames as $old => $new) {
            $this->renamePermission($old, $new);
        }

        foreach ($this->catalogCodeRenames as $old => $new) {
            DB::table('catalogs')
                ->where('code', $old)
                ->update(['code' => $new]);
        }

        if (Schema::hasTable('repositorios') && ! Schema::hasTable('repositories')) {
            Schema::rename('repositorios', 'repositories');
        }

        if (Schema::hasTable('repositories')) {
            foreach ($this->repositoryColumnRenames as $old => $new) {
                if (Schema::hasColumn('repositories', $old) && ! Schema::hasColumn('repositories', $new)) {
                    Schema::table('repositories', function (Blueprint $table) use ($old, $new): void {
                        $table->renameColumn($old, $new);
                    });
                }
            }
        }

        if (Schema::hasTable('repositorio_user') && ! Schema::hasTable('repository_user')) {
            Schema::rename('repositorio_user', 'repository_user');
        }

        if (
            Schema::hasTable('repository_user')
            && Schema::hasColumn('repository_user', 'repositorio_id')
            && ! Schema::hasColumn('repository_user', 'repository_id')
        ) {
            Schema::table('repository_user', function (Blueprint $table): void {
                $table->renameColumn('repositorio_id', 'repository_id');
            });
        }

        if (
            Schema::hasTable('files')
            && Schema::hasColumn('files', 'repositorio_id')
            && ! Schema::hasColumn('files', 'repository_id')
        ) {
            Schema::table('files', function (Blueprint $table): void {
                $table->renameColumn('repositorio_id', 'repository_id');
            });
        }

        app(PermissionRegistrar::class)->forgetCachedPermissions();
    }

    public function down(): void
    {
        if (
            Schema::hasTable('files')
            && Schema::hasColumn('files', 'repository_id')
            && ! Schema::hasColumn('files', 'repositorio_id')
        ) {
            Schema::table('files', function (Blueprint $table): void {
                $table->renameColumn('repository_id', 'repositorio_id');
            });
        }

        if (
            Schema::hasTable('repository_user')
            && Schema::hasColumn('repository_user', 'repository_id')
            && ! Schema::hasColumn('repository_user', 'repositorio_id')
        ) {
            Schema::table('repository_user', function (Blueprint $table): void {
                $table->renameColumn('repository_id', 'repositorio_id');
            });
        }

        if (Schema::hasTable('repository_user') && ! Schema::hasTable('repositorio_user')) {
            Schema::rename('repository_user', 'repositorio_user');
        }

        if (Schema::hasTable('repositories')) {
            foreach (array_flip($this->repositoryColumnRenames) as $old => $new) {
                if (Schema::hasColumn('repositories', $old) && ! Schema::hasColumn('repositories', $new)) {
                    Schema::table('repositories', function (Blueprint $table) use ($old, $new): void {
                        $table->renameColumn($old, $new);
                    });
                }
            }
        }

        if (Schema::hasTable('repositories') && ! Schema::hasTable('repositorios')) {
            Schema::rename('repositories', 'repositorios');
        }

        foreach (array_flip($this->catalogCodeRenames) as $old => $new) {
            DB::table('catalogs')
                ->where('code', $old)
                ->update(['code' => $new]);
        }

        foreach (array_flip($this->permissionRenames) as $old => $new) {
            $this->renamePermission($old, $new);
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
