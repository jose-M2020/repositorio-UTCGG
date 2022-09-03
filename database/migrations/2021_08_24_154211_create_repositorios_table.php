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
            $table->string('nombre_rep');
            $table->string('slug');
            $table->text('descripcion');
            $table->string('tipo_proyecto');
            $table->string('nivel_proyecto');
            $table->string('palabras_clave');
            $table->boolean('publico')
                  ->nullable()
                  ->default(false);

            // $table->foreignId('docente_id')
            //       ->nullable()
            //       ->constrained()
            //       ->onUpdate('cascade')
            //       ->onDelete('cascade');
            // $table->string('alumno');

            $table->string('carrera');
            // $table->string('asesor_academico');
            $table->string('asesor_externo')
                  ->nullable();
            $table->string('empresa');
            $table->string('generacion');

            $table->text('imagenes')
                  ->nullable();
            $table->string('created_by');
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
