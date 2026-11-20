<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('project_period_participants', function (Blueprint $table) {
            $table->id();
            $table->foreignId('project_period_id')->constrained('project_periods')->cascadeOnDelete();
            $table->foreignId('user_id')->constrained('users')->cascadeOnDelete();
            $table->foreignId('career_id')->constrained('careers')->restrictOnDelete();
            $table->string('status', 32)->default('enrolled');
            $table->timestamps();

            // Prevent duplicate enrollment of the same user in a period.
            $table->unique(['project_period_id', 'user_id'], 'ppp_period_user_unique');
            // Speeds up filtered participant lists by period, career, and status.
            $table->index(['project_period_id', 'career_id', 'status'], 'ppp_period_career_status_idx');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('project_period_participants');
    }
};
