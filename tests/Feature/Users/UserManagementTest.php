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

    public function test_admin_can_update_user(): void
    {
        $admin = User::factory()->create();
        $admin->assignRole(UserRoles::ADMIN);

        $user = User::factory()->create([
            'email' => 'old@example.com',
        ]);
        $user->assignRole(UserRoles::ALUMNO);

        $response = $this->actingAs($admin)->put(route('usuarios.update', $user), [
            'nombre' => 'Ana',
            'apellido' => 'Actualizada',
            'email' => 'new@example.com',
            'carrera' => 'ER',
            'rol' => UserRoles::DOCENTE,
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
        $this->assertTrue($user->fresh()?->hasRole(UserRoles::DOCENTE));
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
            ->from(route('usuarios.create'))
            ->post(route('usuarios.store'), []);

        $response->assertRedirect(route('usuarios.create'));
        $response->assertSessionHasErrors([
            'nombre',
            'apellido',
            'email',
            'password',
            'carrera',
            'rol',
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
            ->from(route('usuarios.create'))
            ->post(route('usuarios.store'), [
                'nombre' => 'Hack',
                'apellido' => 'Attempt',
                'email' => 'hack@example.com',
                'password' => 'Password123!',
                'password_confirmation' => 'Password123!',
                'rol' => UserRoles::ADMIN,
            ]);

        $response->assertRedirect(route('usuarios.create'));
        $response->assertSessionHasErrors(['rol']);
        $this->assertDatabaseMissing('users', ['email' => 'hack@example.com']);
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
                ->component('users/index')
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
                ->component('users/index')
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
            ->get(route('usuarios.create'))
            ->assertForbidden();
    }
}
