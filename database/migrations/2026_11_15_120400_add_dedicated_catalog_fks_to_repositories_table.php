<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('repositories', function (Blueprint $table) {
            $table->foreignId('career_id')->nullable()->after('career_catalog_id');
            $table->foreignId('project_type_id')->nullable()->after('project_type_catalog_id');
            $table->foreignId('education_level_id')->nullable()->after('academic_degree_catalog_id');
        });

        DB::table('repositories')->orderBy('id')->chunkById(100, function ($repositories): void {
            foreach ($repositories as $repository) {
                DB::table('repositories')->where('id', $repository->id)->update([
                    'career_id' => $repository->career_catalog_id,
                    'project_type_id' => $repository->project_type_catalog_id,
                    'education_level_id' => $repository->academic_degree_catalog_id,
                ]);
            }
        });

        Schema::table('repositories', function (Blueprint $table) {
            $table->foreign('career_id')->references('id')->on('careers')->restrictOnDelete();
            $table->foreign('project_type_id')->references('id')->on('project_types')->restrictOnDelete();
            $table->foreign('education_level_id')->references('id')->on('education_levels')->restrictOnDelete();
        });
    }

    public function down(): void
    {
        Schema::table('repositories', function (Blueprint $table) {
            $table->dropForeign(['career_id']);
            $table->dropForeign(['project_type_id']);
            $table->dropForeign(['education_level_id']);
            $table->dropColumn(['career_id', 'project_type_id', 'education_level_id']);
        });
    }
};
