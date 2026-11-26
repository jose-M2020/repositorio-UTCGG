<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('curriculum_stages', function (Blueprint $table) {
            $table->id();
            $table->foreignId('curriculum_id')->constrained('curricula')->cascadeOnDelete();
            $table->foreignId('education_level_id')->constrained('education_levels')->restrictOnDelete();
            $table->unsignedTinyInteger('position');
            $table->unsignedTinyInteger('first_term_number');
            $table->unsignedTinyInteger('total_terms');
            $table->string('degree_title', 160)->nullable();
            $table->timestamps();

            $table->unique(['curriculum_id', 'position']);
            $table->unique(['curriculum_id', 'education_level_id']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('curriculum_stages');
    }
};
