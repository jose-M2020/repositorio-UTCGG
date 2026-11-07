<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->foreignId('career_catalog_id')
                ->nullable()
                ->after('carrera')
                ->constrained('catalogs')
                ->restrictOnDelete();
        });

        Schema::table('repositorios', function (Blueprint $table) {
            $table->foreignId('career_catalog_id')
                ->nullable()
                ->after('carrera')
                ->constrained('catalogs')
                ->restrictOnDelete();
            $table->foreignId('project_type_catalog_id')
                ->nullable()
                ->after('tipo_proyecto')
                ->constrained('catalogs')
                ->restrictOnDelete();
            $table->foreignId('academic_degree_catalog_id')
                ->nullable()
                ->after('nivel_proyecto')
                ->constrained('catalogs')
                ->restrictOnDelete();
        });

        $careerCatalogs = DB::table('catalogs')
            ->where('type', 'career')
            ->pluck('id', 'code');
        $projectCatalogs = DB::table('catalogs')
            ->where('type', 'project_type')
            ->pluck('id', 'code');
        $academicCatalogs = DB::table('catalogs')
            ->where('type', 'academic_degree')
            ->pluck('id', 'code');

        DB::table('users')
            ->select(['id', 'carrera'])
            ->whereNotNull('carrera')
            ->orderBy('id')
            ->chunkById(200, function ($users) use ($careerCatalogs): void {
                foreach ($users as $user) {
                    $catalogId = $careerCatalogs[$user->carrera] ?? null;

                    if ($catalogId === null) {
                        continue;
                    }

                    DB::table('users')
                        ->where('id', $user->id)
                        ->update(['career_catalog_id' => $catalogId]);
                }
            });

        DB::table('repositorios')
            ->select(['id', 'carrera', 'tipo_proyecto', 'nivel_proyecto'])
            ->orderBy('id')
            ->chunkById(200, function ($repositorios) use ($careerCatalogs, $projectCatalogs, $academicCatalogs): void {
                foreach ($repositorios as $repositorio) {
                    DB::table('repositorios')
                        ->where('id', $repositorio->id)
                        ->update([
                            'career_catalog_id' => $careerCatalogs[$repositorio->carrera] ?? null,
                            'project_type_catalog_id' => $projectCatalogs[$repositorio->tipo_proyecto] ?? null,
                            'academic_degree_catalog_id' => $academicCatalogs[$repositorio->nivel_proyecto] ?? null,
                        ]);
                }
            });

        Schema::table('users', function (Blueprint $table) {
            $table->dropColumn('carrera');
        });

        Schema::table('repositorios', function (Blueprint $table) {
            $table->dropColumn(['carrera', 'tipo_proyecto', 'nivel_proyecto']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->string('carrera')->nullable()->after('password');
        });

        Schema::table('repositorios', function (Blueprint $table) {
            $table->string('tipo_proyecto')->after('descripcion');
            $table->string('nivel_proyecto')->after('tipo_proyecto');
            $table->string('carrera')->after('publico');
        });

        $careersById = DB::table('catalogs')
            ->where('type', 'career')
            ->pluck('code', 'id');
        $projectTypesById = DB::table('catalogs')
            ->where('type', 'project_type')
            ->pluck('code', 'id');
        $academicDegreesById = DB::table('catalogs')
            ->where('type', 'academic_degree')
            ->pluck('code', 'id');

        DB::table('users')
            ->select(['id', 'career_catalog_id'])
            ->orderBy('id')
            ->chunkById(200, function ($users) use ($careersById): void {
                foreach ($users as $user) {
                    DB::table('users')
                        ->where('id', $user->id)
                        ->update([
                            'carrera' => $careersById[$user->career_catalog_id] ?? null,
                        ]);
                }
            });

        DB::table('repositorios')
            ->select(['id', 'career_catalog_id', 'project_type_catalog_id', 'academic_degree_catalog_id'])
            ->orderBy('id')
            ->chunkById(200, function ($repositorios) use ($careersById, $projectTypesById, $academicDegreesById): void {
                foreach ($repositorios as $repositorio) {
                    DB::table('repositorios')
                        ->where('id', $repositorio->id)
                        ->update([
                            'carrera' => $careersById[$repositorio->career_catalog_id] ?? null,
                            'tipo_proyecto' => $projectTypesById[$repositorio->project_type_catalog_id] ?? null,
                            'nivel_proyecto' => $academicDegreesById[$repositorio->academic_degree_catalog_id] ?? null,
                        ]);
                }
            });

        Schema::table('users', function (Blueprint $table) {
            $table->dropConstrainedForeignId('career_catalog_id');
        });

        Schema::table('repositorios', function (Blueprint $table) {
            $table->dropConstrainedForeignId('career_catalog_id');
            $table->dropConstrainedForeignId('project_type_catalog_id');
            $table->dropConstrainedForeignId('academic_degree_catalog_id');
        });
    }
};
