<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('repository_advisors', function (Blueprint $table) {
            $table->id();
            $table->foreignId('repository_id')->constrained('repositories')->cascadeOnDelete();
            $table->foreignId('user_id')->constrained('users')->restrictOnDelete();
            $table->foreignId('project_period_id')->constrained('project_periods')->restrictOnDelete();
            $table->string('role', 32)->default('primary');
            $table->foreignId('assigned_by')->nullable()->constrained('users')->nullOnDelete();
            $table->timestamp('assigned_at');
            $table->timestamp('released_at')->nullable();
            $table->string('override_reason', 500)->nullable();
            $table->timestamps();

            // Speeds up advisor load/capacity checks by user and period (active when released_at is null).
            $table->index(['user_id', 'project_period_id', 'released_at'], 'ra_user_period_released_idx');
            // Speeds up looking up a repository's current advisors by role.
            $table->index(['repository_id', 'role', 'released_at'], 'ra_repo_role_released_idx');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('repository_advisors');
    }
};
