<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('project_types', function (Blueprint $table) {
            $table->boolean('requires_academic_advisor')->default(false)->after('requires_business_advisor');
        });

        DB::table('project_types')->where('code', 'integrative')->update(['requires_academic_advisor' => true]);
        DB::table('project_types')->where('code', 'internship')->update(['requires_academic_advisor' => true]);
        DB::table('project_types')->where('code', 'special_project')->update(['requires_academic_advisor' => false]);
    }

    public function down(): void
    {
        Schema::table('project_types', function (Blueprint $table) {
            $table->dropColumn('requires_academic_advisor');
        });
    }
};
