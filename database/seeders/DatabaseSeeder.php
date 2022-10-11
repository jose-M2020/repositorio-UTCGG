<?php

namespace Database\Seeders;

use App\Models\Alumno;
use App\Models\Docente;
use App\Models\Admin;
use App\Models\Usuario;
use App\Models\Repositorio;
use App\Models\File;
use App\Models\Repositorio_usuario;
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
        // \App\Models\Usuario::factory(10)->create();

        // Admin::insert([
        //     'nombre' => 'Administrador',
        //     'apellido' => 'lopéz',
        //     'email' => 'admin@utcgg.edu.mx',
        //     'password' => Hash::make('password'),
        //     'created_at' => Carbon::now(),
        // ]);

        // Docente::insert([
        //     'nombre' => 'Docente',
        //     'apellido' => 'Hernandez',
        //     'email' => 'docente@utcgg.edu.mx',
        //     'password' => Hash::make('password'),
        //     'created_at' => Carbon::now(),
        // ]);

        // Docente::insert([
        //     'nombre' => 'Docente 2',
        //     'apellido' => 'Piedra',
        //     'email' => 'docente2@utcgg.edu.mx',
        //     'password' => Hash::make('password'),
        //     'created_at' => Carbon::now(),
        // ]);

        // Docente::insert([
        //     'nombre' => 'Docente 3',
        //     'apellido' => 'lopéz',
        //     'email' => 'docente3@utcgg.edu.mx',
        //     'password' => Hash::make('password'),
        //     'created_at' => Carbon::now(),
        // ]);
        // Alumno::insert([
        //     // 'docente_id' => 1,
        //     'nombre' => 'Alumno',
        //     'apellido' => 'klein',
        //     'email' => 'alumno@utcgg.edu.mx',
        //     'password' => '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi',
        //     'carrera' => 'TIC',
        //     'cuatrimestre' => 10,
        //     'created_at' => Carbon::now(),
        // ]);
        // Alumno::insert([
        //     // 'docente_id' => 1,
        //     'nombre' => 'José Manuel',
        //     'apellido' => 'Silva',
        //     'email' => 'jose@utcgg.edu.mx',
        //     'password' => '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi',
        //     'carrera' => 'TIC',
        //     'cuatrimestre' => 10,
        //     'created_at' => Carbon::now(),
        // ]);

        // Alumno::factory()->count(30)->create();
        
        $this->call(PermissionsSeeder::class);
        

        
        // create demo users
        Usuario::factory()->create([
            'nombre' => 'Admin User',
            'email' => 'admin@example.com',
        ])->assignRole('admin');

        Usuario::factory()->create([
            'nombre' => 'Docente User',
            'email' => 'docente@example.com',
        ])->assignRole('docente');

        Usuario::factory()->create([
            'nombre' => 'Alumno User',
            'email' => 'alumno@example.com',
        ])->assignRole('alumno');

        Usuario::factory()->create()->assignRole('alumno');
        Usuario::factory()->create()->assignRole('alumno');
        Usuario::factory()->create()->assignRole('alumno');
        Usuario::factory()->create()->assignRole('alumno');
        Usuario::factory()->create()->assignRole('alumno');
        Usuario::factory()->create()->assignRole('alumno');
        Usuario::factory()->create()->assignRole('alumno');
        Usuario::factory()->create()->assignRole('alumno');
        Usuario::factory()->create()->assignRole('alumno');
        Usuario::factory()->create()->assignRole('alumno');
        Usuario::factory()->create()->assignRole('alumno');
        Usuario::factory()->create()->assignRole('alumno');
        Usuario::factory()->create()->assignRole('alumno');
        Usuario::factory()->create()->assignRole('alumno');
        Usuario::factory()->create()->assignRole('alumno');
        Usuario::factory()->create()->assignRole('alumno');
        Usuario::factory()->create()->assignRole('alumno');
        Usuario::factory()->create()->assignRole('alumno');
        Usuario::factory()->create()->assignRole('alumno');
        Usuario::factory()->create()->assignRole('alumno');
        Usuario::factory()->create()->assignRole('alumno');
        Usuario::factory()->create()->assignRole('alumno');
        Usuario::factory()->create()->assignRole('alumno');
        Usuario::factory()->create()->assignRole('alumno');
        Usuario::factory()->create()->assignRole('alumno');
        Usuario::factory()->create()->assignRole('alumno');
        Usuario::factory()->create()->assignRole('alumno');
        Usuario::factory()->create()->assignRole('alumno');
        Usuario::factory()->create()->assignRole('alumno');
        Usuario::factory()->create()->assignRole('alumno');
        Usuario::factory()->create()->assignRole('alumno');
        Usuario::factory()->create()->assignRole('alumno');
        
        Repositorio::factory()->count(30)->create();

        // File::factory()->count(30)->create();

        Repositorio_usuario::factory(30)->create();
    }
}
