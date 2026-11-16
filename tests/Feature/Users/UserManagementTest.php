<?php

namespace Tests\Feature\Users;

use App\Enums\SetPasswordPurpose;
use App\Enums\UserAccountStatus;
use App\Models\User;
use App\Notifications\SetPasswordNotification;
use App\Support\UserRoles;
use Database\Seeders\PermissionsSeeder;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Notification;
use Tests\TestCase;

class UserManagementTest extends TestCase
{
    use RefreshDatabase;

    protected function setUp(): void
    {
        parent::setUp();

        $this->seedDomainLookups();
        $this->seed(PermissionsSeeder::class);
    }

    public function test_guest_is_redirected_from_users_index(): void
    {
        $this->get(route('users.index'))
            ->assertRedirect(route('login'));
    }

    public function test_user_without_permission_cannot_view_users_index(): void
    {
        $user = User::factory()->create();
        $user->assignRole(UserRoles::STUDENT);

        $this->actingAs($user)
            ->get(route('users.index'))
            ->assertForbidden();
    }

    public function test_admin_can_view_users_index(): void
    {
        $admin = User::factory()->create();
        $admin->assignRole(UserRoles::ADMIN);

        $other = User::factory()->create(['first_name' => 'Otro']);
        $other->assignRole(UserRoles::STUDENT);

        $this->actingAs($admin)
            ->get(route('users.index'))
            ->assertOk()
            ->assertInertia(fn ($page) => $page
                ->component('panel/users/index')
                ->has('users.data', 1)
                ->where('users.data.0.id', $other->id)
                ->where('users.data.0.first_name', 'Otro'));
    }

    public function test_admin_can_create_user_pending_activation_without_password(): void
    {
        Notification::fake();

        $admin = User::factory()->create();
        $admin->assignRole(UserRoles::ADMIN);

        $response = $this->actingAs($admin)->post(route('users.store'), [
            'first_name' => 'Ana',
            'last_name' => 'Lopez',
            'second_last_name' => 'Garcia',
            'email' => 'ana@example.com',
            'career' => 'TIC',
            'role' => UserRoles::STUDENT,
        ]);

        $response->assertRedirect(route('users.index'));
        $ticCareerId = $this->careerId('TIC');
        $this->assertDatabaseHas('users', [
            'email' => 'ana@example.com',
            'first_name' => 'Ana',
            'last_name' => 'Lopez',
            'second_last_name' => 'Garcia',
            'status' => UserAccountStatus::PendingActivation->value,
            'password' => null,
        ]);
        $this->assertDatabaseHas('student_profiles', [
            'career_id' => $ticCareerId,
        ]);

        $created = User::query()->where('email', 'ana@example.com')->first();
        $this->assertTrue($created?->hasRole(UserRoles::STUDENT));

        Notification::assertSentTo(
            $created,
            SetPasswordNotification::class,
            fn (SetPasswordNotification $notification): bool => $notification->purpose === SetPasswordPurpose::Activation,
        );
    }

    public function test_admin_can_update_user_profile_without_changing_role(): void
    {
        $admin = User::factory()->create();
        $admin->assignRole(UserRoles::ADMIN);

        $user = User::factory()->student()->create([
            'email' => 'old@example.com',
        ]);
        $this->seedStudentCareer($user, 'TIC');
        $user->assignRole(UserRoles::STUDENT);

        $response = $this->actingAs($admin)->put(route('users.update', $user), [
            'first_name' => 'Ana',
            'last_name' => 'Actualizada',
            'second_last_name' => 'Ruiz',
            'email' => 'new@example.com',
            'career' => 'ER',
        ]);

        $response->assertRedirect(route('users.index'));
        $erCareerId = $this->careerId('ER');
        $this->assertDatabaseHas('users', [
            'id' => $user->id,
            'email' => 'new@example.com',
            'last_name' => 'Actualizada',
            'second_last_name' => 'Ruiz',
        ]);
        $this->assertDatabaseHas('student_profiles', [
            'user_id' => $user->id,
            'career_id' => $erCareerId,
        ]);
        $this->assertTrue($user->fresh()?->hasRole(UserRoles::STUDENT));
    }

    public function test_admin_can_change_user_role_and_keeps_existing_career(): void
    {
        $admin = User::factory()->create();
        $admin->assignRole(UserRoles::ADMIN);

        $ticCareerId = $this->careerId('TIC');

        $user = User::factory()->student()->create();
        $this->seedStudentCareer($user, 'TIC');
        $user->assignRole(UserRoles::STUDENT);

        $response = $this->actingAs($admin)->patch(route('users.update-role', $user), [
            'role' => UserRoles::TEACHER,
        ]);

        $response->assertRedirect(route('users.index'));
        $this->assertTrue($user->fresh()?->hasRole(UserRoles::TEACHER));
        $this->assertDatabaseHas('career_assignments', [
            'user_id' => $user->id,
            'career_id' => $ticCareerId,
        ]);
    }

    public function test_admin_change_role_to_admin_clears_career(): void
    {
        $admin = User::factory()->create();
        $admin->assignRole(UserRoles::ADMIN);

        $user = User::factory()->student()->create();
        $this->seedStudentCareer($user, 'TIC');
        $user->assignRole(UserRoles::STUDENT);

        $response = $this->actingAs($admin)->patch(route('users.update-role', $user), [
            'role' => UserRoles::ADMIN,
        ]);

        $response->assertRedirect(route('users.index'));
        $this->assertTrue($user->fresh()?->hasRole(UserRoles::ADMIN));
        $this->assertTrue($user->fresh()?->user_type === \App\Enums\UserType::Staff);
    }

    public function test_admin_cannot_assign_career_role_without_existing_career(): void
    {
        $admin = User::factory()->create();
        $admin->assignRole(UserRoles::ADMIN);

        $user = User::factory()->staff()->create();
        $user->assignRole(UserRoles::ADMIN);

        $response = $this->actingAs($admin)
            ->from(route('users.index'))
            ->patch(route('users.update-role', $user), [
                'role' => UserRoles::STUDENT,
            ]);

        $response->assertRedirect(route('users.index'));
        $response->assertSessionHasErrors(['role']);
        $this->assertTrue($user->fresh()?->hasRole(UserRoles::ADMIN));
    }

    public function test_users_index_includes_role_permissions_preview(): void
    {
        $admin = User::factory()->create();
        $admin->assignRole(UserRoles::ADMIN);

        $this->actingAs($admin)
            ->get(route('users.index'))
            ->assertOk()
            ->assertInertia(fn ($page) => $page
                ->component('panel/users/index')
                ->has('rolePermissions.'.UserRoles::STUDENT)
                ->has('assignableRoles'));
    }

    public function test_career_director_only_sees_assignable_roles_in_users_filter(): void
    {
        $director = User::factory()->teacher()->create();
        $this->seedCareerDirector($director, 'TIC');
        $director->assignRole(UserRoles::CAREER_DIRECTOR);

        $this->actingAs($director)
            ->get(route('users.index', [
                'role' => [UserRoles::ADMIN, UserRoles::STUDENT],
            ]))
            ->assertOk()
            ->assertInertia(fn ($page) => $page
                ->component('panel/users/index')
                ->where('roles', [
                    ['value' => UserRoles::STUDENT, 'label' => 'Alumno'],
                    ['value' => UserRoles::TEACHER, 'label' => 'Docente'],
                ])
                ->where('filters.role', [UserRoles::STUDENT]));
    }

    public function test_admin_can_deactivate_and_activate_user(): void
    {
        $admin = User::factory()->create();
        $admin->assignRole(UserRoles::ADMIN);

        $user = User::factory()->create([
            'status' => UserAccountStatus::Active,
        ]);

        $deactivate = $this->actingAs($admin)->patch(route('users.toggle-active', $user));
        $deactivate->assertRedirect(route('users.index'));
        $this->assertSame(UserAccountStatus::Inactive, $user->fresh()?->status);

        $activate = $this->actingAs($admin)->patch(route('users.toggle-active', $user));
        $activate->assertRedirect(route('users.index'));
        $this->assertSame(UserAccountStatus::Active, $user->fresh()?->status);
    }

    public function test_admin_cannot_deactivate_own_account(): void
    {
        $admin = User::factory()->create();
        $admin->assignRole(UserRoles::ADMIN);

        $response = $this->actingAs($admin)
            ->from(route('users.index'))
            ->patch(route('users.toggle-active', $admin));

        $response->assertRedirect(route('users.index'));
        $response->assertSessionHasErrors(['user']);
        $this->assertSame(UserAccountStatus::Active, $admin->fresh()?->status);
    }

    public function test_admin_cannot_toggle_pending_activation_user(): void
    {
        $admin = User::factory()->create();
        $admin->assignRole(UserRoles::ADMIN);

        $user = User::factory()->pendingActivation()->create();

        $response = $this->actingAs($admin)
            ->from(route('users.index'))
            ->patch(route('users.toggle-active', $user));

        $response->assertRedirect(route('users.index'));
        $response->assertSessionHasErrors(['user']);
        $this->assertSame(UserAccountStatus::PendingActivation, $user->fresh()?->status);
    }

    public function test_admin_can_send_password_reset_link(): void
    {
        Notification::fake();

        $admin = User::factory()->create();
        $admin->assignRole(UserRoles::ADMIN);

        $user = User::factory()->create();

        $response = $this->actingAs($admin)->post(route('users.password-link', $user));

        $response->assertRedirect(route('users.index'));
        Notification::assertSentTo(
            $user,
            SetPasswordNotification::class,
            fn (SetPasswordNotification $notification): bool => $notification->purpose === SetPasswordPurpose::Reset,
        );
    }

    public function test_admin_can_resend_activation_link(): void
    {
        Notification::fake();

        $admin = User::factory()->create();
        $admin->assignRole(UserRoles::ADMIN);

        $user = User::factory()->pendingActivation()->create();

        $response = $this->actingAs($admin)->post(route('users.password-link', $user));

        $response->assertRedirect(route('users.index'));
        Notification::assertSentTo(
            $user,
            SetPasswordNotification::class,
            fn (SetPasswordNotification $notification): bool => $notification->purpose === SetPasswordPurpose::Activation,
        );
    }

    public function test_admin_can_delete_user(): void
    {
        $admin = User::factory()->create();
        $admin->assignRole(UserRoles::ADMIN);

        $user = User::factory()->create();

        $response = $this->actingAs($admin)->delete(route('users.destroy', $user));

        $response->assertRedirect(route('users.index'));
        $this->assertSoftDeleted('users', ['id' => $user->id]);
    }

    public function test_create_user_validation_errors(): void
    {
        $admin = User::factory()->create();
        $admin->assignRole(UserRoles::ADMIN);

        $response = $this->actingAs($admin)
            ->from(route('users.index'))
            ->post(route('users.store'), []);

        $response->assertRedirect(route('users.index'));
        $response->assertSessionHasErrors([
            'first_name',
            'last_name',
            'email',
            'role',
        ]);
    }

    public function test_admin_can_create_admin_without_career(): void
    {
        Notification::fake();

        $admin = User::factory()->create();
        $admin->assignRole(UserRoles::ADMIN);

        $response = $this->actingAs($admin)->post(route('users.store'), [
            'first_name' => 'Root',
            'last_name' => 'User',
            'email' => 'root@example.com',
            'role' => UserRoles::ADMIN,
        ]);

        $response->assertRedirect(route('users.index'));
        $this->assertDatabaseHas('users', [
            'email' => 'root@example.com',
            'status' => UserAccountStatus::PendingActivation->value,
        ]);
    }

    public function test_career_director_forces_own_career_when_creating_user(): void
    {
        $ticCareerId = $this->careerId('TIC');

        $director = User::factory()->teacher()->create();
        $this->seedCareerDirector($director, 'TIC');
        $director->assignRole(UserRoles::CAREER_DIRECTOR);

        Notification::fake();

        $response = $this->actingAs($director)->post(route('users.store'), [
            'first_name' => 'Luis',
            'last_name' => 'Perez',
            'email' => 'luis@example.com',
            'career' => 'ER',
            'role' => UserRoles::STUDENT,
            'user_type' => 'student',
            'academic_status' => 'active',
        ]);

        $response->assertRedirect(route('users.index'));
        $created = User::query()->where('email', 'luis@example.com')->first();
        $this->assertNotNull($created);
        $this->assertDatabaseHas('student_profiles', [
            'user_id' => $created->id,
            'career_id' => $ticCareerId,
        ]);
    }

    public function test_career_director_cannot_assign_admin_role(): void
    {
        $director = User::factory()->teacher()->create();
        $this->seedCareerDirector($director, 'TIC');
        $director->assignRole(UserRoles::CAREER_DIRECTOR);

        $response = $this->actingAs($director)
            ->from(route('users.index'))
            ->post(route('users.store'), [
                'first_name' => 'Hack',
                'last_name' => 'Attempt',
                'email' => 'hack@example.com',
                'role' => UserRoles::ADMIN,
            ]);

        $response->assertRedirect(route('users.index'));
        $response->assertSessionHasErrors(['role']);
        $this->assertDatabaseMissing('users', ['email' => 'hack@example.com']);
    }

    public function test_admin_can_filter_users_by_date_range(): void
    {
        $admin = User::factory()->create();
        $admin->assignRole(UserRoles::ADMIN);

        $inRange = User::factory()->create([
            'first_name' => 'EnRango',
            'created_at' => '2024-05-10 12:00:00',
        ]);
        $inRange->assignRole(UserRoles::STUDENT);

        $outOfRange = User::factory()->create([
            'first_name' => 'FueraRango',
            'created_at' => '2024-06-01 12:00:00',
        ]);
        $outOfRange->assignRole(UserRoles::STUDENT);

        $this->actingAs($admin)
            ->get(route('users.index', [
                'date_range' => ['2024-05-01', '2024-05-31'],
            ]))
            ->assertOk()
            ->assertInertia(fn ($page) => $page
                ->component('panel/users/index')
                ->where('filters.date_range', ['2024-05-01', '2024-05-31'])
                ->has('users.data', 1)
                ->where('users.data.0.first_name', 'EnRango'));
    }

    public function test_admin_can_filter_users_by_name_and_email(): void
    {
        $admin = User::factory()->create();
        $admin->assignRole(UserRoles::ADMIN);

        $match = User::factory()->create([
            'first_name' => 'Carla',
            'last_name' => 'Ruiz',
            'email' => 'carla.ruiz@example.com',
        ]);
        $match->assignRole(UserRoles::STUDENT);

        $other = User::factory()->create([
            'first_name' => 'Pedro',
            'last_name' => 'Lopez',
            'email' => 'pedro.lopez@example.com',
        ]);
        $other->assignRole(UserRoles::STUDENT);

        $this->actingAs($admin)
            ->get(route('users.index', [
                'name' => 'Carla',
                'email' => 'carla.ruiz',
            ]))
            ->assertOk()
            ->assertInertia(fn ($page) => $page
                ->component('panel/users/index')
                ->where('filters.name', 'Carla')
                ->where('filters.email', 'carla.ruiz')
                ->has('users.data', 1)
                ->where('users.data.0.email', 'carla.ruiz@example.com'));
    }

    public function test_admin_can_filter_users_by_multiple_roles(): void
    {
        $admin = User::factory()->create();
        $admin->assignRole(UserRoles::ADMIN);

        $alumno = User::factory()->create(['first_name' => 'AlumnoFiltro']);
        $alumno->assignRole(UserRoles::STUDENT);

        $docente = User::factory()->create(['first_name' => 'DocenteFiltro']);
        $docente->assignRole(UserRoles::TEACHER);

        $director = User::factory()->create(['first_name' => 'DirectorFiltro']);
        $director->assignRole(UserRoles::DIRECTOR);

        $this->actingAs($admin)
            ->get(route('users.index', [
                'role' => [UserRoles::STUDENT, UserRoles::TEACHER],
            ]))
            ->assertOk()
            ->assertInertia(fn ($page) => $page
                ->component('panel/users/index')
                ->where('filters.role', [UserRoles::STUDENT, UserRoles::TEACHER])
                ->has('users.data', 2)
                ->where('users.data.0.first_name', 'DocenteFiltro')
                ->where('users.data.1.first_name', 'AlumnoFiltro'));
    }

    public function test_admin_can_filter_users_by_status(): void
    {
        $admin = User::factory()->create();
        $admin->assignRole(UserRoles::ADMIN);

        $pending = User::factory()->pendingActivation()->create([
            'first_name' => 'PendienteFiltro',
        ]);
        $pending->assignRole(UserRoles::STUDENT);

        $inactive = User::factory()->inactive()->create([
            'first_name' => 'InactivoFiltro',
        ]);
        $inactive->assignRole(UserRoles::STUDENT);

        $this->actingAs($admin)
            ->get(route('users.index', [
                'status' => [UserAccountStatus::PendingActivation->value],
            ]))
            ->assertOk()
            ->assertInertia(fn ($page) => $page
                ->component('panel/users/index')
                ->where('filters.status', [UserAccountStatus::PendingActivation->value])
                ->has('users.data', 1)
                ->where('users.data.0.first_name', 'PendienteFiltro')
                ->where('users.data.0.status', UserAccountStatus::PendingActivation->value));
    }

    public function test_career_director_only_lists_users_from_same_career(): void
    {
        $director = User::factory()->teacher()->create();
        $this->seedCareerDirector($director, 'TIC');
        $director->assignRole(UserRoles::CAREER_DIRECTOR);

        $sameCareer = User::factory()->student()->create([
            'first_name' => 'Misma',
        ]);
        $this->seedStudentCareer($sameCareer, 'TIC');
        $sameCareer->assignRole(UserRoles::STUDENT);

        $otherCareer = User::factory()->student()->create([
            'first_name' => 'Otra',
        ]);
        $this->seedStudentCareer($otherCareer, 'ER');
        $otherCareer->assignRole(UserRoles::STUDENT);

        $this->actingAs($director)
            ->get(route('users.index'))
            ->assertOk()
            ->assertInertia(fn ($page) => $page
                ->component('panel/users/index')
                ->has('users.data', 1)
                ->where('users.data.0.id', $sameCareer->id)
                ->where('users.data.0.career', 'TIC')
                ->where('careerPolicy.can_select_career', false)
                ->where('careerPolicy.locked_career', 'TIC'));
    }

    public function test_teacher_cannot_create_users(): void
    {
        $docente = User::factory()->create();
        $docente->assignRole(UserRoles::TEACHER);

        $this->actingAs($docente)
            ->post(route('users.store'), [
                'first_name' => 'Ana',
                'last_name' => 'Lopez',
                'email' => 'ana@example.com',
                'career' => 'TIC',
                'role' => UserRoles::STUDENT,
            ])
            ->assertForbidden();
    }
}
