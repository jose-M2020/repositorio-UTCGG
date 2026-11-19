<?php

namespace Database\Seeders;

use App\Enums\CareerPosition;
use App\Enums\UserType;
use App\Models\Career;
use App\Models\CareerAssignment;
use App\Models\File;
use App\Models\Repository;
use App\Models\StudentProfile;
use App\Models\TeacherProfile;
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
        $this->call(CareerSeeder::class);
        $this->call(ProjectTypeSeeder::class);
        $this->call(EducationLevelSeeder::class);
        $this->call(PermissionsSeeder::class);
        $ticCareerId = Career::query()->where('code', 'TIC')->value('id');

        $admin = User::factory()->staff()->create([
            'first_name' => 'Admin',
            'last_name' => 'Admin',
            'email' => 'admin@example.com',
            'user_type' => UserType::Staff,
        ]);
        $admin->assignRole(UserRoles::ADMIN);

        $director = User::factory()->staff()->create([
            'first_name' => 'Director',
            'last_name' => 'General',
            'email' => 'director@example.com',
            'user_type' => UserType::Staff,
        ]);
        $director->assignRole(UserRoles::DIRECTOR);

        $directorCarrera = User::factory()->teacher()->create([
            'first_name' => 'Director',
            'last_name' => 'TIC',
            'email' => 'director.tic@example.com',
            'user_type' => UserType::Workforce,
        ]);
        $directorCarrera->assignRole(UserRoles::CAREER_DIRECTOR);
        TeacherProfile::query()->create([
            'user_id' => $directorCarrera->id,
            'primary_career_id' => $ticCareerId,
            'can_be_advisor' => true,
        ]);
        CareerAssignment::query()->create([
            'user_id' => $directorCarrera->id,
            'career_id' => $ticCareerId,
            'position' => CareerPosition::CareerDirector,
            'starts_at' => now()->toDateString(),
        ]);

        $docente = User::factory()->teacher()->create([
            'first_name' => 'Docente',
            'last_name' => 'Docente',
            'email' => 'docente@example.com',
            'user_type' => UserType::Workforce,
        ]);
        $docente->assignRole(UserRoles::TEACHER);
        TeacherProfile::query()->create([
            'user_id' => $docente->id,
            'primary_career_id' => $ticCareerId,
            'can_be_advisor' => true,
        ]);
        CareerAssignment::query()->create([
            'user_id' => $docente->id,
            'career_id' => $ticCareerId,
            'position' => CareerPosition::Teacher,
            'starts_at' => now()->toDateString(),
        ]);

        $alumno = User::factory()->student()->create([
            'first_name' => 'Alumno',
            'last_name' => 'Alumno',
            'email' => 'alumno@example.com',
            'user_type' => UserType::Academic,
        ]);
        $alumno->assignRole(UserRoles::STUDENT);
        StudentProfile::query()->create([
            'user_id' => $alumno->id,
            'career_id' => $ticCareerId,
            'academic_status' => 'active',
        ]);

        $docentes = User::factory(10)->teacher()->create();
        $docentes->each(fn (User $user) => $user->assignRole(UserRoles::TEACHER));

        $alumnos = User::factory(30)->student()->create();
        $alumnos->each(fn (User $user) => $user->assignRole(UserRoles::STUDENT));

        $this->call(UserProfileBackfillSeeder::class);

        $users = $docentes->merge($alumnos);

        Repository::factory(40)
            ->create()
            ->each(function (Repository $repository) use ($users, $admin): void {
                $members = $users->random(fake()->numberBetween(2, 5))->pluck('id');
                $repository->users()->attach($members->push($admin->id)->unique());

                File::factory(fake()->numberBetween(1, 3))->create([
                    'repository_id' => $repository->id,
                ]);
            });
    }
}