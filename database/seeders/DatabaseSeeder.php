<?php

namespace Database\Seeders;

use App\Models\File;
use App\Models\Repositorio;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $this->call(CatalogSeeder::class);
        $this->call(PermissionsSeeder::class);

        $admin = User::factory()->create([
            'nombre' => 'Admin',
            'apellido' => 'Admin',
            'email' => 'admin@example.com',
            'carrera' => 'TIC',
        ]);
        $admin->assignRole('admin');

        $docente = User::factory()->create([
            'nombre' => 'Docente',
            'apellido' => 'Docente',
            'email' => 'docente@example.com',
            'carrera' => 'TIC',
        ]);
        $docente->assignRole('docente');

        $alumno = User::factory()->create([
            'nombre' => 'Alumno',
            'apellido' => 'Alumno',
            'email' => 'alumno@example.com',
            'carrera' => 'TIC',
        ]);
        $alumno->assignRole('alumno');

        $docentes = User::factory(10)->create();
        $docentes->each(fn (User $user) => $user->assignRole('docente'));

        $alumnos = User::factory(30)->create();
        $alumnos->each(fn (User $user) => $user->assignRole('alumno'));

        $users = $docentes->merge($alumnos);

        Repositorio::factory(40)
            ->create()
            ->each(function (Repositorio $repositorio) use ($users, $admin): void {
                $members = $users->random(fake()->numberBetween(2, 5))->pluck('id');
                $repositorio->users()->attach($members->push($admin->id)->unique());

                File::factory(fake()->numberBetween(1, 3))->create([
                    'repositorio_id' => $repositorio->id,
                ]);
            });
    }
}
