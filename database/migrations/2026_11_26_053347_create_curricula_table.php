<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('curricula', function (Blueprint $table) {
            $table->id();
            $table->foreignId('career_id')->constrained('careers')->restrictOnDelete();
            $table->string('name', 60);
            $table->date('applies_from')->nullable();
            $table->boolean('is_active')->default(true);
            $table->timestamps();

            $table->unique(['career_id', 'name']);
            $table->index(['career_id', 'is_active']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('curricula');
    }
};
