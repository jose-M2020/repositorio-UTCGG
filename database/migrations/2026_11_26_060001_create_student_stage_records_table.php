<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('student_stage_records', function (Blueprint $table) {
            $table->id();
            $table->foreignId('student_profile_id')
                ->constrained('student_profiles')
                ->cascadeOnDelete();
            $table->foreignId('curriculum_stage_id')
                ->constrained('curriculum_stages')
                ->restrictOnDelete();
            $table->foreignId('started_academic_period_id')
                ->constrained('academic_periods')
                ->restrictOnDelete();
            $table->string('status', 32);
            $table->foreignId('graduated_academic_period_id')
                ->nullable()
                ->constrained('academic_periods')
                ->restrictOnDelete();
            $table->timestamp('graduated_at')->nullable();
            $table->timestamp('titled_at')->nullable();
            $table->timestamps();

            $table->unique(['student_profile_id', 'curriculum_stage_id']);
            $table->index(['student_profile_id', 'status']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('student_stage_records');
    }
};