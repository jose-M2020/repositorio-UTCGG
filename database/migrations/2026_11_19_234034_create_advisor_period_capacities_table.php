<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('advisor_period_capacities', function (Blueprint $table) {
            $table->id();
            $table->foreignId('project_period_id')->constrained('project_periods')->cascadeOnDelete();
            $table->foreignId('user_id')->constrained('users')->cascadeOnDelete();
            $table->unsignedSmallInteger('max_projects')->nullable();
            $table->boolean('is_available')->default(true);
            $table->string('notes', 255)->nullable();
            $table->timestamps();

            // One capacity row per advisor per period.
            $table->unique(['project_period_id', 'user_id'], 'apc_period_user_unique');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('advisor_period_capacities');
    }
};
