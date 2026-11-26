<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('project_periods', function (Blueprint $table) {
            $table->foreignId('academic_period_id')
                ->nullable()
                ->after('project_type_id')
                ->constrained('academic_periods')
                ->restrictOnDelete();

            $table->date('enrollment_opens_at')->nullable()->after('ends_at');
            $table->date('enrollment_closes_at')->nullable()->after('enrollment_opens_at');
        });

        Schema::table('project_periods', function (Blueprint $table) {
            $table->string('name')->nullable()->change();
            $table->date('starts_at')->nullable()->change();
            $table->date('ends_at')->nullable()->change();
        });
    }

    public function down(): void
    {
        Schema::table('project_periods', function (Blueprint $table) {
            $table->dropForeign(['academic_period_id']);
            $table->dropColumn([
                'academic_period_id',
                'enrollment_opens_at',
                'enrollment_closes_at',
            ]);
        });

        Schema::table('project_periods', function (Blueprint $table) {
            $table->string('name')->nullable(false)->change();
            $table->date('starts_at')->nullable(false)->change();
            $table->date('ends_at')->nullable(false)->change();
        });
    }
};