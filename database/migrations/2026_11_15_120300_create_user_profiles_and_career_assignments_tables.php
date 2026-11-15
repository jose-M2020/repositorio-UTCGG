<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('student_profiles', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->unique()->constrained()->cascadeOnDelete();
            $table->string('student_number', 20)->nullable()->unique();
            $table->foreignId('career_id')->constrained('careers')->restrictOnDelete();
            $table->foreignId('education_level_id')->nullable()->constrained('education_levels')->restrictOnDelete();
            $table->unsignedSmallInteger('admission_year')->nullable();
            $table->string('generation', 9)->nullable();
            $table->unsignedTinyInteger('current_term')->nullable();
            $table->string('group', 10)->nullable();
            $table->string('shift', 16)->nullable();
            $table->string('academic_status', 32)->default('active');
            $table->date('admission_date')->nullable();
            $table->date('graduation_date')->nullable();
            $table->string('curp', 255)->nullable();
            $table->timestamps();

            $table->index('career_id');
            $table->index('education_level_id');
            $table->index('academic_status');
            $table->index(['career_id', 'academic_status']);
            $table->index('generation');
        });

        Schema::create('teacher_profiles', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->unique()->constrained()->cascadeOnDelete();
            $table->string('employee_number', 20)->nullable()->unique();
            $table->foreignId('primary_career_id')->nullable()->constrained('careers')->restrictOnDelete();
            $table->string('department')->nullable();
            $table->string('academic_degree', 32)->nullable();
            $table->string('specialty')->nullable();
            $table->string('contract_type', 32)->nullable();
            $table->date('hired_at')->nullable();
            $table->string('office')->nullable();
            $table->text('public_bio')->nullable();
            $table->json('research_lines')->nullable();
            $table->string('orcid', 19)->nullable();
            $table->boolean('can_be_advisor')->default(true);
            $table->timestamps();

            $table->index('primary_career_id');
            $table->index('can_be_advisor');
        });

        Schema::create('staff_profiles', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->unique()->constrained()->cascadeOnDelete();
            $table->string('employee_number', 20)->nullable()->unique();
            $table->string('job_title');
            $table->string('department')->nullable();
            $table->date('hired_at')->nullable();
            $table->string('office')->nullable();
            $table->timestamps();
        });

        Schema::create('career_assignments', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->cascadeOnDelete();
            $table->foreignId('career_id')->constrained('careers')->restrictOnDelete();
            $table->string('position', 32);
            $table->date('starts_at');
            $table->date('ends_at')->nullable();
            $table->foreignId('created_by')->nullable()->constrained('users')->nullOnDelete();
            $table->timestamps();

            $table->index(['user_id', 'career_id', 'position']);
            $table->index(['career_id', 'position', 'ends_at']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('career_assignments');
        Schema::dropIfExists('staff_profiles');
        Schema::dropIfExists('teacher_profiles');
        Schema::dropIfExists('student_profiles');
    }
};
