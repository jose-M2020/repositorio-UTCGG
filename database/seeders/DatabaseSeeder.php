<?php

namespace Database\Seeders;

use App\Models\Alumno;
use App\Models\Docente;
use App\Models\Admin;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

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
            'email' => 'admin@gmail.com',
            'password' => Hash::make('password'),
        ]);

        Docente::insert([
            'nombre' => 'Docente',
            'email' => 'docente@gmail.com',
            'password' => Hash::make('password'),
        ]);

        Docente::insert([
            'nombre' => 'Docente 2',
            'email' => 'docente2@gmail.com',
            'password' => Hash::make('password'),
        ]);

        Docente::insert([
            'nombre' => 'Docente 3',
            'email' => 'docente3@gmail.com',
            'password' => Hash::make('password'),
        ]);
        
        Alumno::factory(30)->create();
    }
}
