<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateRepositoriosTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('repositorios', function (Blueprint $table) {
            $table->id();
            $table->string('alumno');

            // Datos añadidos-------
            $table->string('carrera');
            $table->string('asesor_academico');
            $table->string('asesor_externo');
            $table->string('empresa');
            // ----------------------

            $table->string('nombre_rep');
            $table->text('descripcion');
            $table->string('tipo_proyecto');
            $table->string('nivel_proyecto');
            // $table->string('nombre_proyecto');

            // Datos añadidos-------
            $table->string('palabras_clave');
            $table->string('generacion');
            $table->string('imagenes');
            // -------------------------------

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('repositorios');
    }
}
