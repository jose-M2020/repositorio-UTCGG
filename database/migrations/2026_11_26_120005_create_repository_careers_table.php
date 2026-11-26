<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('repository_careers', function (Blueprint $table): void {
            $table->id();
            $table->foreignId('repository_id')->constrained('repositories')->cascadeOnDelete();
            $table->foreignId('career_id')->constrained('careers')->restrictOnDelete();
            $table->timestamps();

            $table->unique(['repository_id', 'career_id']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('repository_careers');
    }
};