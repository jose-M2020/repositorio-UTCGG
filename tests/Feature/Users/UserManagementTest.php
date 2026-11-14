<?php

namespace Tests\Feature\Users;

use App\Models\Catalog;
use App\Models\User;
use App\Support\UserRoles;
use Database\Seeders\CatalogSeeder;
use Database\Seeders\PermissionsSeeder;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class UserManagementTest extends TestCase
{
    use RefreshDatabase;

    protected function setUp(): void
    {
        parent::setUp();

        $this->seed([
            CatalogSeeder::class,
            PermissionsSeeder::class,
        ]);
    }

    public function test_guest_is_redirected_from_users_index(): void
    {
        $this->get(route('usuarios.index'))
            ->assertRedirect(route('login'));
    }

    public function test_user_without_permission_cannot_view_users_index(): void
    {
        $user = User::factory()->create();
        $user->assignRole(UserRoles::ALUMNO);

        $this->actingAs($user)
            ->get(route('usuarios.index'))
            ->assertForbidden();
    }

    public function test_admin_can_view_users_index(): void
    {
        $admin = User::factory()->create();
        $admin->assignRole(UserRoles::ADMIN);

        $this->actingAs($admin)
            ->get(route('usuarios.index'))
            ->assertOk();
    }

    public function test_admin_can_create_user(): void
    {
        $admin = User::factory()->create();
        $admin->assignRole(UserRoles::ADMIN);

        $response = $this->actingAs($admin)->post(route('usuarios.store'), [
            'nombre' => 'Ana',
            'apellido' => 'Lopez',
            'email' => 'ana@example.com',
            'carrera' => 'TIC',
            'password' => 'Password123!',
            'password_confirmation' => 'Password123!',
            'rol' => UserRoles::ALUMNO,
        ]);

        $response->assertRedirect(route('usuarios.index'));
        $ticCareerId = Catalog::query()
            ->where('type', Catalog::TYPE_CAREER)
            ->where('code', 'TIC')
            ->value('id');
        $this->assertDatabaseHas('users', [
            'email' => 'ana@example.com',
            'nombre' => 'Ana',
            'apellido' => 'Lopez',
            'career_catalog_id' => $ticCareerId,
        ]);

        $created = User::query()->where('email', 'ana@example.com')->first();
        $this->assertTrue($created?->hasRole(UserRoles::ALUMNO));
    }

    public function test_admin_can_update_user_profile_without_changing_role(): void
    {
        $admin = User::factory()->create();
        $admin->assignRole(UserRoles::ADMIN);

        $ticCareerId = Catalog::query()
            ->where('type', Catalog::TYPE_CAREER)
            ->where('code', 'TIC')
            ->value('id');

        $user = User::factory()->create([
            'email' => 'old@example.com',
            'career_catalog_id' => $ticCareerId,
        ]);
        $user->assignRole(UserRoles::ALUMNO);

        $response = $this->actingAs($admin)->put(route('usuarios.update', $user), [
            'nombre' => 'Ana',
            'apellido' => 'Actualizada',
            'email' => 'new@example.com',
            'carrera' => 'ER',
        ]);

        $response->assertRedirect(route('usuarios.index'));
        $erCareerId = Catalog::query()
            ->where('type', Catalog::TYPE_CAREER)
            ->where('code', 'ER')
            ->value('id');
        $this->assertDatabaseHas('users', [
            'id' => $user->id,
            'email' => 'new@example.com',
            'apellido' => 'Actualizada',
            'career_catalog_id' => $erCareerId,
        ]);
        $this->assertTrue($user->fresh()?->hasRole(UserRoles::ALUMNO));
    }

    public function test_admin_can_change_user_role_and_keeps_existing_career(): void
    {
        $admin = User::factory()->create();
        $admin->assignRole(UserRoles::ADMIN);

        $ticCareerId = Catalog::query()
            ->where('type', Catalog::TYPE_CAREER)
            ->where('code', 'TIC')
            ->value('id');

        $user = User::factory()->create([
            'career_catalog_id' => $ticCareerId,
        ]);
        $user->assignRole(UserRoles::ALUMNO);

        $response = $this->actingAs($admin)->patch(route('usuarios.update-role', $user), [
            'rol' => UserRoles::DOCENTE,
        ]);

        $response->assertRedirect(route('usuarios.index'));
        $this->assertTrue($user->fresh()?->hasRole(UserRoles::DOCENTE));
        $this->assertDatabaseHas('users', [
            'id' => $user->id,
            'career_catalog_id' => $ticCareerId,
        ]);
    }

    public function test_admin_change_role_to_admin_clears_career(): void
    {
        $admin = User::factory()->create();
        $admin->assignRole(UserRoles::ADMIN);

        $ticCareerId = Catalog::query()
            ->where('type', Catalog::TYPE_CAREER)
            ->where('code', 'TIC')
            ->value('id');

        $user = User::factory()->create([
            'career_catalog_id' => $ticCareerId,
        ]);
        $user->assignRole(UserRoles::ALUMNO);

        $response = $this->actingAs($admin)->patch(route('usuarios.update-role', $user), [
            'rol' => UserRoles::ADMIN,
        ]);

        $response->assertRedirect(route('usuarios.index'));
        $this->assertTrue($user->fresh()?->hasRole(UserRoles::ADMIN));
        $this->assertDatabaseHas('users', [
            'id' => $user->id,
            'career_catalog_id' => null,
        ]);
    }

    public function test_admin_cannot_assign_career_role_without_existing_career(): void
    {
        $admin = User::factory()->create();
        $admin->assignRole(UserRoles::ADMIN);

        $user = User::factory()->create([
            'career_catalog_id' => null,
        ]);
        $user->assignRole(UserRoles::ADMIN);

        $response = $this->actingAs($admin)
            ->from(route('usuarios.index'))
            ->patch(route('usuarios.update-role', $user), [
                'rol' => UserRoles::ALUMNO,
            ]);

        $response->assertRedirect(route('usuarios.index'));
        $response->assertSessionHasErrors(['rol']);
        $this->assertTrue($user->fresh()?->hasRole(UserRoles::ADMIN));
    }

    public function test_users_index_includes_role_permissions_preview(): void
    {
        $admin = User::factory()->create();
        $admin->assignRole(UserRoles::ADMIN);

        $this->actingAs($admin)
            ->get(route('usuarios.index'))
            ->assertOk()
            ->assertInertia(fn ($page) => $page
                ->component('panel/users/index')
                ->has('rolePermissions.'.UserRoles::ALUMNO)
                ->has('assignableRoles'));
    }

    public function test_admin_can_delete_user(): void
    {
        $admin = User::factory()->create();
        $admin->assignRole(UserRoles::ADMIN);

        $user = User::factory()->create();

        $response = $this->actingAs($admin)->delete(route('usuarios.destroy', $user));

        $response->assertRedirect(route('usuarios.index'));
        $this->assertDatabaseMissing('users', ['id' => $user->id]);
    }

    public function test_create_user_validation_errors(): void
    {
        $admin = User::factory()->create();
        $admin->assignRole(UserRoles::ADMIN);

        $response = $this->actingAs($admin)
            ->from(route('usuarios.index'))
            ->post(route('usuarios.store'), []);

        $response->assertRedirect(route('usuarios.index'));
        $response->assertSessionHasErrors([
            'nombre',
            'apellido',
            'email',
            'password',
            'rol',
        ]);
    }

    public function test_admin_can_create_admin_without_career(): void
    {
        $admin = User::factory()->create();
        $admin->assignRole(UserRoles::ADMIN);

        $response = $this->actingAs($admin)->post(route('usuarios.store'), [
            'nombre' => 'Root',
            'apellido' => 'User',
            'email' => 'root@example.com',
            'password' => 'Password123!',
            'password_confirmation' => 'Password123!',
            'rol' => UserRoles::ADMIN,
        ]);

        $response->assertRedirect(route('usuarios.index'));
        $this->assertDatabaseHas('users', [
            'email' => 'root@example.com',
            'career_catalog_id' => null,
        ]);
    }

    public function test_director_carrera_forces_own_career_when_creating_user(): void
    {
        $ticCareerId = Catalog::query()
            ->where('type', Catalog::TYPE_CAREER)
            ->where('code', 'TIC')
            ->value('id');

        $director = User::factory()->create([
            'career_catalog_id' => $ticCareerId,
        ]);
        $director->assignRole(UserRoles::DIRECTOR_CARRERA);

        $response = $this->actingAs($director)->post(route('usuarios.store'), [
            'nombre' => 'Luis',
            'apellido' => 'Perez',
            'email' => 'luis@example.com',
            'carrera' => 'ER',
            'password' => 'Password123!',
            'password_confirmation' => 'Password123!',
            'rol' => UserRoles::ALUMNO,
        ]);

        $response->assertRedirect(route('usuarios.index'));
        $this->assertDatabaseHas('users', [
            'email' => 'luis@example.com',
            'career_catalog_id' => $ticCareerId,
        ]);
    }

    public function test_director_carrera_cannot_assign_admin_role(): void
    {
        $ticCareerId = Catalog::query()
            ->where('type', Catalog::TYPE_CAREER)
            ->where('code', 'TIC')
            ->value('id');

        $director = User::factory()->create([
            'career_catalog_id' => $ticCareerId,
        ]);
        $director->assignRole(UserRoles::DIRECTOR_CARRERA);

        $response = $this->actingAs($director)
            ->from(route('usuarios.index'))
            ->post(route('usuarios.store'), [
                'nombre' => 'Hack',
                'apellido' => 'Attempt',
                'email' => 'hack@example.com',
                'password' => 'Password123!',
                'password_confirmation' => 'Password123!',
                'rol' => UserRoles::ADMIN,
            ]);

        $response->assertRedirect(route('usuarios.index'));
        $response->assertSessionHasErrors(['rol']);
        $this->assertDatabaseMissing('users', ['email' => 'hack@example.com']);
    }

    public function test_admin_can_filter_users_by_date_range(): void
    {
        $admin = User::factory()->create();
        $admin->assignRole(UserRoles::ADMIN);

        $inRange = User::factory()->create([
            'nombre' => 'EnRango',
            'created_at' => '2024-05-10 12:00:00',
        ]);
        $inRange->assignRole(UserRoles::ALUMNO);

        $outOfRange = User::factory()->create([
            'nombre' => 'FueraRango',
            'created_at' => '2024-06-01 12:00:00',
        ]);
        $outOfRange->assignRole(UserRoles::ALUMNO);

        $this->actingAs($admin)
            ->get(route('usuarios.index', [
                'rango_fecha' => ['2024-05-01', '2024-05-31'],
            ]))
            ->assertOk()
            ->assertInertia(fn ($page) => $page
                ->component('panel/users/index')
                ->where('filters.rango_fecha', ['2024-05-01', '2024-05-31'])
                ->has('users.data', 1)
                ->where('users.data.0.nombre', 'EnRango'));
    }

    public function test_admin_can_filter_users_by_nombre_and_email(): void
    {
        $admin = User::factory()->create();
        $admin->assignRole(UserRoles::ADMIN);

        $match = User::factory()->create([
            'nombre' => 'Carla',
            'apellido' => 'Ruiz',
            'email' => 'carla.ruiz@example.com',
        ]);
        $match->assignRole(UserRoles::ALUMNO);

        $other = User::factory()->create([
            'nombre' => 'Pedro',
            'apellido' => 'Lopez',
            'email' => 'pedro.lopez@example.com',
        ]);
        $other->assignRole(UserRoles::ALUMNO);

        $this->actingAs($admin)
            ->get(route('usuarios.index', [
                'nombre' => 'Carla',
                'email' => 'carla.ruiz',
            ]))
            ->assertOk()
            ->assertInertia(fn ($page) => $page
                ->component('panel/users/index')
                ->where('filters.nombre', 'Carla')
                ->where('filters.email', 'carla.ruiz')
                ->has('users.data', 1)
                ->where('users.data.0.email', 'carla.ruiz@example.com'));
    }

    public function test_admin_can_filter_users_by_multiple_roles(): void
    {
        $admin = User::factory()->create();
        $admin->assignRole(UserRoles::ADMIN);

        $alumno = User::factory()->create(['nombre' => 'AlumnoFiltro']);
        $alumno->assignRole(UserRoles::ALUMNO);

        $docente = User::factory()->create(['nombre' => 'DocenteFiltro']);
        $docente->assignRole(UserRoles::DOCENTE);

        $director = User::factory()->create(['nombre' => 'DirectorFiltro']);
        $director->assignRole(UserRoles::DIRECTOR);

        $this->actingAs($admin)
            ->get(route('usuarios.index', [
                'rol' => [UserRoles::ALUMNO, UserRoles::DOCENTE],
            ]))
            ->assertOk()
            ->assertInertia(fn ($page) => $page
                ->component('panel/users/index')
                ->where('filters.rol', [UserRoles::ALUMNO, UserRoles::DOCENTE])
                ->has('users.data', 2)
                ->where('users.data.0.nombre', 'DocenteFiltro')
                ->where('users.data.1.nombre', 'AlumnoFiltro'));
    }

    public function test_director_carrera_only_lists_users_from_same_career(): void
    {
        $ticCareerId = Catalog::query()
            ->where('type', Catalog::TYPE_CAREER)
            ->where('code', 'TIC')
            ->value('id');
        $erCareerId = Catalog::query()
            ->where('type', Catalog::TYPE_CAREER)
            ->where('code', 'ER')
            ->value('id');

        $director = User::factory()->create([
            'career_catalog_id' => $ticCareerId,
        ]);
        $director->assignRole(UserRoles::DIRECTOR_CARRERA);

        $sameCareer = User::factory()->create([
            'nombre' => 'Misma',
            'career_catalog_id' => $ticCareerId,
        ]);
        $sameCareer->assignRole(UserRoles::ALUMNO);

        $otherCareer = User::factory()->create([
            'nombre' => 'Otra',
            'career_catalog_id' => $erCareerId,
        ]);
        $otherCareer->assignRole(UserRoles::ALUMNO);

        $this->actingAs($director)
            ->get(route('usuarios.index'))
            ->assertOk()
            ->assertInertia(fn ($page) => $page
                ->component('panel/users/index')
                ->has('users.data', 2)
                ->where('users.data.0.carrera', 'TIC')
                ->where('users.data.1.carrera', 'TIC')
                ->where('careerPolicy.can_select_career', false)
                ->where('careerPolicy.locked_career', 'TIC'));
    }

    public function test_docente_cannot_create_users(): void
    {
        $docente = User::factory()->create();
        $docente->assignRole(UserRoles::DOCENTE);

        $this->actingAs($docente)
            ->post(route('usuarios.store'), [
                'nombre' => 'Ana',
                'apellido' => 'Lopez',
                'email' => 'ana@example.com',
                'carrera' => 'TIC',
                'password' => 'Password123!',
                'password_confirmation' => 'Password123!',
                'rol' => UserRoles::ALUMNO,
            ])
            ->assertForbidden();
    }
}
