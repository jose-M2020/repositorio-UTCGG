<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('repositories', function (Blueprint $table): void {
            $table->foreignId('academic_period_id')
                ->nullable()
                ->after('project_period_id')
                ->constrained('academic_periods')
                ->restrictOnDelete();
            $table->foreignId('curriculum_requirement_id')
                ->nullable()
                ->after('academic_period_id')
                ->constrained('curriculum_requirements')
                ->restrictOnDelete();
            $table->unsignedTinyInteger('term_number')->nullable()->after('curriculum_requirement_id');

            $table->index(['academic_period_id', 'project_type_id']);
            $table->index('curriculum_requirement_id');
        });
    }

    public function down(): void
    {
        Schema::table('repositories', function (Blueprint $table): void {
            $table->dropIndex(['academic_period_id', 'project_type_id']);
            $table->dropIndex(['curriculum_requirement_id']);
            $table->dropConstrainedForeignId('curriculum_requirement_id');
            $table->dropConstrainedForeignId('academic_period_id');
            $table->dropColumn('term_number');
        });
    }
};