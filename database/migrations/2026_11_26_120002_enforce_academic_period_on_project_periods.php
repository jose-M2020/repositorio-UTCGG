<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        $nullCount = (int) DB::table('project_periods')->whereNull('academic_period_id')->count();

        if ($nullCount > 0) {
            throw new RuntimeException(
                "Cannot enforce academic_period_id: {$nullCount} row(s) still null. Run academic:backfill-project-periods first."
            );
        }

        Schema::table('project_periods', function (Blueprint $table) {
            $table->foreignId('academic_period_id')->nullable(false)->change();
            $table->dropUnique(['project_type_id', 'name']);
            $table->unique(['academic_period_id', 'project_type_id']);
        });
    }

    public function down(): void
    {
        Schema::table('project_periods', function (Blueprint $table) {
            $table->dropUnique(['academic_period_id', 'project_type_id']);
            $table->unique(['project_type_id', 'name']);
            $table->foreignId('academic_period_id')->nullable()->change();
        });
    }
};