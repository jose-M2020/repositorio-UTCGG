<?php

namespace Tests\Feature\Users;

use App\Models\User;
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
        $user->assignRole('alumno');

        $this->actingAs($user)
            ->get(route('usuarios.index'))
            ->assertForbidden();
    }

    public function test_admin_can_view_users_index(): void
    {
        $admin = User::factory()->create();
        $admin->assignRole('admin');

        $this->actingAs($admin)
            ->get(route('usuarios.index'))
            ->assertOk();
    }

    public function test_admin_can_create_user(): void
    {
        $admin = User::factory()->create();
        $admin->assignRole('admin');

        $response = $this->actingAs($admin)->post(route('usuarios.store'), [
            'nombre' => 'Ana',
            'apellido' => 'Lopez',
            'email' => 'ana@example.com',
            'carrera' => 'TIC',
            'password' => 'Password123!',
            'password_confirmation' => 'Password123!',
            'rol' => 'alumno',
        ]);

        $response->assertRedirect(route('usuarios.index'));
        $this->assertDatabaseHas('users', [
            'email' => 'ana@example.com',
            'nombre' => 'Ana',
            'apellido' => 'Lopez',
            'carrera' => 'TIC',
        ]);

        $created = User::query()->where('email', 'ana@example.com')->first();
        $this->assertTrue($created?->hasRole('alumno'));
    }

    public function test_admin_can_update_user(): void
    {
        $admin = User::factory()->create();
        $admin->assignRole('admin');

        $user = User::factory()->create([
            'email' => 'old@example.com',
        ]);
        $user->assignRole('alumno');

        $response = $this->actingAs($admin)->put(route('usuarios.update', $user), [
            'nombre' => 'Ana',
            'apellido' => 'Actualizada',
            'email' => 'new@example.com',
            'carrera' => 'ER',
            'rol' => 'docente',
        ]);

        $response->assertRedirect(route('usuarios.index'));
        $this->assertDatabaseHas('users', [
            'id' => $user->id,
            'email' => 'new@example.com',
            'apellido' => 'Actualizada',
            'carrera' => 'ER',
        ]);
        $this->assertTrue($user->fresh()?->hasRole('docente'));
    }

    public function test_admin_can_delete_user(): void
    {
        $admin = User::factory()->create();
        $admin->assignRole('admin');

        $user = User::factory()->create();

        $response = $this->actingAs($admin)->delete(route('usuarios.destroy', $user));

        $response->assertRedirect(route('usuarios.index'));
        $this->assertDatabaseMissing('users', ['id' => $user->id]);
    }

    public function test_create_user_validation_errors(): void
    {
        $admin = User::factory()->create();
        $admin->assignRole('admin');

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
}
