<?php

namespace Database\Seeders;

use App\Models\Catalog;
use App\Models\File;
use App\Models\Repositorio;
use App\Models\User;
use App\Support\UserRoles;
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
        $ticCareerId = Catalog::query()
            ->where('type', Catalog::TYPE_CAREER)
            ->where('code', 'TIC')
            ->value('id');

        $admin = User::factory()->create([
            'nombre' => 'Admin',
            'apellido' => 'Admin',
            'email' => 'admin@example.com',
            'career_catalog_id' => null,
        ]);
        $admin->assignRole(UserRoles::ADMIN);

        $director = User::factory()->create([
            'nombre' => 'Director',
            'apellido' => 'General',
            'email' => 'director@example.com',
            'career_catalog_id' => null,
        ]);
        $director->assignRole(UserRoles::DIRECTOR);

        $directorCarrera = User::factory()->create([
            'nombre' => 'Director',
            'apellido' => 'TIC',
            'email' => 'director.tic@example.com',
            'career_catalog_id' => $ticCareerId,
        ]);
        $directorCarrera->assignRole(UserRoles::DIRECTOR_CARRERA);

        $docente = User::factory()->create([
            'nombre' => 'Docente',
            'apellido' => 'Docente',
            'email' => 'docente@example.com',
            'career_catalog_id' => $ticCareerId,
        ]);
        $docente->assignRole(UserRoles::DOCENTE);

        $alumno = User::factory()->create([
            'nombre' => 'Alumno',
            'apellido' => 'Alumno',
            'email' => 'alumno@example.com',
            'career_catalog_id' => $ticCareerId,
        ]);
        $alumno->assignRole(UserRoles::ALUMNO);

        $docentes = User::factory(10)->create();
        $docentes->each(fn (User $user) => $user->assignRole(UserRoles::DOCENTE));

        $alumnos = User::factory(30)->create();
        $alumnos->each(fn (User $user) => $user->assignRole(UserRoles::ALUMNO));

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
