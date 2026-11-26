<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('student_profiles', function (Blueprint $table) {
            $table->foreignId('curriculum_id')
                ->nullable()
                ->after('career_id')
                ->constrained('curricula')
                ->restrictOnDelete();
            $table->foreignId('entry_academic_period_id')
                ->nullable()
                ->after('curriculum_id')
                ->constrained('academic_periods')
                ->restrictOnDelete();
            $table->foreignId('term_academic_period_id')
                ->nullable()
                ->after('entry_academic_period_id')
                ->constrained('academic_periods')
                ->restrictOnDelete();
            $table->foreignId('status_since_academic_period_id')
                ->nullable()
                ->after('term_academic_period_id')
                ->constrained('academic_periods')
                ->restrictOnDelete();

            $table->index(
                ['curriculum_id', 'current_term', 'academic_status'],
                'student_profiles_plan_term_status_idx',
            );
            $table->index('entry_academic_period_id', 'student_profiles_entry_period_idx');
            $table->index('term_academic_period_id', 'student_profiles_term_period_idx');
        });
    }

    public function down(): void
    {
        Schema::table('student_profiles', function (Blueprint $table) {
            $table->dropIndex('student_profiles_plan_term_status_idx');
            $table->dropIndex('student_profiles_entry_period_idx');
            $table->dropIndex('student_profiles_term_period_idx');
            $table->dropConstrainedForeignId('status_since_academic_period_id');
            $table->dropConstrainedForeignId('term_academic_period_id');
            $table->dropConstrainedForeignId('entry_academic_period_id');
            $table->dropConstrainedForeignId('curriculum_id');
        });
    }
};
