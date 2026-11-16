<?php

namespace Tests\Feature\Users;

use App\Enums\CareerPosition;
use App\Enums\UserType;
use App\Models\Career;
use App\Models\CareerAssignment;
use App\Models\StudentProfile;
use App\Models\User;
use App\Services\Users\UserProvisioningService;
use App\Support\UserRoles;
use Database\Seeders\PermissionsSeeder;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Artisan;
use Tests\TestCase;

class UserProvisioningTest extends TestCase
{
    use RefreshDatabase;

    protected function setUp(): void
    {
        parent::setUp();

        $this->seedDedicatedCatalogs();
        $this->seed(PermissionsSeeder::class);
    }

    public function test_creating_each_user_type_creates_matching_profile(): void
    {
        $admin = User::factory()->staff()->create(['user_type' => UserType::Staff]);
        $admin->assignRole(UserRoles::ADMIN);

        $ticId = Career::query()->where('code', 'TIC')->value('id');

        $this->actingAs($admin)->post(route('users.store'), [
            'first_name' => 'Ana',
            'last_name' => 'Alumna',
            'email' => 'ana@example.com',
            'user_type' => UserType::Student->value,
            'role' => UserRoles::STUDENT,
            'career' => 'TIC',
            'academic_status' => 'active',
        ])->assertRedirect(route('users.index'));

        $this->assertDatabaseHas('student_profiles', [
            'career_id' => $ticId,
        ]);

        $this->actingAs($admin)->post(route('users.store'), [
            'first_name' => 'Luis',
            'last_name' => 'Docente',
            'email' => 'luis@example.com',
            'user_type' => UserType::Teacher->value,
            'role' => UserRoles::TEACHER,
            'career' => 'TIC',
        ])->assertRedirect(route('users.index'));

        $teacher = User::query()->where('email', 'luis@example.com')->firstOrFail();
        $this->assertDatabaseHas('teacher_profiles', ['user_id' => $teacher->id]);
        $this->assertDatabaseHas('career_assignments', [
            'user_id' => $teacher->id,
            'career_id' => $ticId,
            'position' => CareerPosition::Teacher->value,
        ]);

        $this->actingAs($admin)->post(route('users.store'), [
            'first_name' => 'Sofia',
            'last_name' => 'Staff',
            'email' => 'sofia@example.com',
            'user_type' => UserType::Staff->value,
            'role' => UserRoles::DIRECTOR,
            'job_title' => 'Directora',
        ])->assertRedirect(route('users.index'));

        $staff = User::query()->where('email', 'sofia@example.com')->firstOrFail();
        $this->assertDatabaseHas('staff_profiles', [
            'user_id' => $staff->id,
            'job_title' => 'Directora',
        ]);
    }

    public function test_incompatible_system_role_is_rejected(): void
    {
        $admin = User::factory()->staff()->create(['user_type' => UserType::Staff]);
        $admin->assignRole(UserRoles::ADMIN);

        $response = $this->actingAs($admin)
            ->from(route('users.index'))
            ->post(route('users.store'), [
                'first_name' => 'Bad',
                'last_name' => 'Combo',
                'email' => 'bad@example.com',
                'user_type' => UserType::Student->value,
                'role' => UserRoles::TEACHER,
                'career' => 'TIC',
                'academic_status' => 'active',
            ]);

        $response->assertRedirect(route('users.index'));
        $response->assertSessionHasErrors('roles');
    }

    public function test_only_one_active_career_director_per_career(): void
    {
        $admin = User::factory()->staff()->create(['user_type' => UserType::Staff]);
        $admin->assignRole(UserRoles::ADMIN);
        $ticId = (int) Career::query()->where('code', 'TIC')->value('id');

        $first = User::factory()->teacher()->create(['user_type' => UserType::Teacher]);
        $this->seedTeacherCareer($first, 'TIC');
        $first->assignRole(UserRoles::TEACHER);

        $second = User::factory()->teacher()->create(['user_type' => UserType::Teacher]);
        $this->seedTeacherCareer($second, 'TIC');
        $second->assignRole(UserRoles::TEACHER);

        $service = app(UserProvisioningService::class);
        $service->assignCareerDirector($admin, $first, [
            'career_id' => $ticId,
            'starts_at' => now()->toDateString(),
        ]);

        $this->expectException(\Illuminate\Validation\ValidationException::class);
        $service->assignCareerDirector($admin, $second, [
            'career_id' => $ticId,
            'starts_at' => now()->toDateString(),
        ]);
    }

    public function test_ending_career_director_assignment_and_sync_command_removes_role(): void
    {
        $admin = User::factory()->staff()->create(['user_type' => UserType::Staff]);
        $admin->assignRole(UserRoles::ADMIN);
        $ticId = (int) Career::query()->where('code', 'TIC')->value('id');

        $teacher = User::factory()->teacher()->create(['user_type' => UserType::Teacher]);
        $this->seedTeacherCareer($teacher, 'TIC');
        $teacher->assignRole(UserRoles::TEACHER);

        $service = app(UserProvisioningService::class);
        $assignment = $service->assignCareerDirector($admin, $teacher, [
            'career_id' => $ticId,
            'starts_at' => now()->toDateString(),
        ]);

        $this->assertTrue($teacher->fresh()->hasRole(UserRoles::CAREER_DIRECTOR));

        $service->endCareerDirector($admin, $assignment, now()->subDay()->toDateString());

        Artisan::call('roles:sync-career-directors');

        $this->assertFalse($teacher->fresh()->hasRole(UserRoles::CAREER_DIRECTOR));
    }

    public function test_change_type_student_to_teacher_keeps_student_profile(): void
    {
        $admin = User::factory()->staff()->create(['user_type' => UserType::Staff]);
        $admin->assignRole(UserRoles::ADMIN);
        $ticId = (int) Career::query()->where('code', 'TIC')->value('id');

        $student = User::factory()->student()->create(['user_type' => UserType::Student]);
        $student->assignRole(UserRoles::STUDENT);
        StudentProfile::query()->create([
            'user_id' => $student->id,
            'career_id' => $ticId,
            'academic_status' => 'active',
        ]);

        app(UserProvisioningService::class)->changeType(
            $admin,
            $student,
            UserType::Teacher,
            ['career_id' => $ticId],
        );

        $student->refresh();
        $this->assertSame(UserType::Teacher, $student->user_type);
        $this->assertNotNull($student->studentProfile);
        $this->assertNotNull($student->teacherProfile);
    }

    public function test_dedicated_career_seeder_provides_tic_career(): void
    {
        $ticId = Career::query()->where('code', 'TIC')->value('id');

        $this->assertNotNull($ticId);
        $this->assertDatabaseHas('careers', [
            'id' => $ticId,
            'code' => 'TIC',
        ]);
    }

    public function test_career_scoped_manager_only_sees_users_in_managed_careers(): void
    {
        $ticId = (int) Career::query()->where('code', 'TIC')->value('id');
        $erId = (int) Career::query()->where('code', 'ER')->value('id');

        $director = User::factory()->teacher()->create([
            'user_type' => UserType::Teacher,
            'email' => 'dir.tic@example.com',
        ]);
        $director->assignRole(UserRoles::CAREER_DIRECTOR);
        $this->seedCareerDirector($director, 'TIC');

        $ticStudent = User::factory()->student()->create([
            'user_type' => UserType::Student,
            'email' => 'tic.student@example.com',
        ]);
        $ticStudent->assignRole(UserRoles::STUDENT);
        StudentProfile::query()->create([
            'user_id' => $ticStudent->id,
            'career_id' => $ticId,
            'academic_status' => 'active',
        ]);

        $erStudent = User::factory()->student()->create([
            'user_type' => UserType::Student,
            'email' => 'er.student@example.com',
        ]);
        $erStudent->assignRole(UserRoles::STUDENT);
        StudentProfile::query()->create([
            'user_id' => $erStudent->id,
            'career_id' => $erId,
            'academic_status' => 'active',
        ]);

        $response = $this->actingAs($director)->get(route('users.index'));
        $response->assertOk();

        $visible = User::query()
            ->whereKeyNot($director->id)
            ->inCareers([$ticId])
            ->pluck('email')
            ->all();

        $this->assertContains('tic.student@example.com', $visible);
        $this->assertNotContains('er.student@example.com', User::query()->inCareers([$ticId])->pluck('email')->all());
    }
}