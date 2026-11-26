<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('curriculum_requirements', function (Blueprint $table) {
            $table->id();
            $table->foreignId('curriculum_id')->constrained('curricula')->cascadeOnDelete();
            $table->foreignId('project_type_id')->constrained('project_types')->restrictOnDelete();
            $table->unsignedTinyInteger('term_number');
            $table->boolean('is_mandatory')->default(true);
            $table->string('notes', 255)->nullable();
            $table->timestamps();

            $table->unique(['curriculum_id', 'project_type_id', 'term_number'], 'curriculum_requirements_unique');
            $table->index(['curriculum_id', 'term_number']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('curriculum_requirements');
    }
};
