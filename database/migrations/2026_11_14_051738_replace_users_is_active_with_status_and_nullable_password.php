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
            $table->string('status', 32)->default('active')->after('career_catalog_id');
        });

        DB::table('users')
            ->where('is_active', false)
            ->update(['status' => 'inactive']);

        Schema::table('users', function (Blueprint $table) {
            $table->dropColumn('is_active');
            $table->string('password')->nullable()->change();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->boolean('is_active')->default(true)->after('career_catalog_id');
        });

        DB::table('users')
            ->where('status', 'inactive')
            ->update(['is_active' => false]);

        DB::table('users')
            ->where('status', '!=', 'inactive')
            ->update(['is_active' => true]);

        Schema::table('users', function (Blueprint $table) {
            $table->dropColumn('status');
            $table->string('password')->nullable(false)->change();
        });
    }
};
