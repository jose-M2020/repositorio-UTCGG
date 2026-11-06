<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('repositorios', function (Blueprint $table) {
            $table->id();
            $table->string('nombre_rep');
            $table->string('slug')->unique();
            $table->text('descripcion');
            $table->string('tipo_proyecto');
            $table->string('nivel_proyecto');
            $table->string('palabras_clave');
            $table->boolean('publico')->default(false);
            $table->string('carrera');
            $table->string('asesor_externo')->nullable();
            $table->string('empresa');
            $table->string('generacion');
            $table->text('imagenes')->nullable();
            $table->string('created_by');
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('repositorios');
    }
};
