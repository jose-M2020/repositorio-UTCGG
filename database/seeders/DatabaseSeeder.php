<?php

namespace Database\Seeders;

use App\Models\Alumno;
use App\Models\Docente;
use App\Models\Admin;
use App\Models\Repositorio;
use App\Models\File;
use App\Models\Alumno_repositorio;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Carbon\Carbon;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        // \App\Models\User::factory(10)->create();

        Admin::insert([
            'nombre' => 'Administrador',
            'email' => 'admin@utcgg.edu.mx',
            'password' => Hash::make('password'),
            'created_at' => Carbon::now(),
        ]);

        Docente::insert([
            'nombre' => 'Docente',
            'email' => 'docente@utcgg.edu.mx',
            'password' => Hash::make('password'),
            'created_at' => Carbon::now(),
        ]);

        Docente::insert([
            'nombre' => 'Docente 2',
            'email' => 'docente2@utcgg.edu.mx',
            'password' => Hash::make('password'),
            'created_at' => Carbon::now(),
        ]);

        Docente::insert([
            'nombre' => 'Docente 3',
            'email' => 'docente3@utcgg.edu.mx',
            'password' => Hash::make('password'),
            'created_at' => Carbon::now(),
        ]);
        Alumno::insert([
            // 'docente_id' => 1,
            'nombre' => 'Alumno',
            'email' => 'alumno@utcgg.edu.mx',
            'password' => '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi',
            'carrera' => 'TIC',
            'cuatrimestre' => 10,
            'created_at' => Carbon::now(),
        ]);
        Alumno::insert([
            // 'docente_id' => 1,
            'nombre' => 'José Manuel',
            'email' => 'jose@utcgg.edu.mx',
            'password' => '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi',
            'carrera' => 'TIC',
            'cuatrimestre' => 10,
            'created_at' => Carbon::now(),
        ]);

        Alumno::factory()->count(30)->create();

        Repositorio::factory()->count(30)->create();

        File::factory()->count(30)->create();

        Alumno_repositorio::factory(30)->create();
    }
}
