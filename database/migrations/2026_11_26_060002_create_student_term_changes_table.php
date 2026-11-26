<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('student_term_changes', function (Blueprint $table) {
            $table->id();
            $table->foreignId('student_profile_id')
                ->constrained('student_profiles')
                ->cascadeOnDelete();
            $table->unsignedTinyInteger('from_term')->nullable();
            $table->unsignedTinyInteger('to_term')->nullable();
            $table->foreignId('academic_period_id')
                ->constrained('academic_periods')
                ->restrictOnDelete();
            $table->string('reason', 32);
            $table->foreignId('from_curriculum_id')
                ->nullable()
                ->constrained('curricula')
                ->restrictOnDelete();
            $table->foreignId('to_curriculum_id')
                ->nullable()
                ->constrained('curricula')
                ->restrictOnDelete();
            $table->string('note', 500)->nullable();
            $table->foreignId('changed_by')
                ->nullable()
                ->constrained('users')
                ->nullOnDelete();
            $table->timestamp('created_at')->useCurrent();

            $table->index(['student_profile_id', 'created_at']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('student_term_changes');
    }
};