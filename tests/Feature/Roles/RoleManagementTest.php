<?php

namespace Tests\Feature\Roles;

use App\Models\User;
use Database\Seeders\PermissionsSeeder;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Spatie\Permission\Models\Role;
use Tests\TestCase;

class RoleManagementTest extends TestCase
{
    use RefreshDatabase;

    protected function setUp(): void
    {
        parent::setUp();

        $this->seed(PermissionsSeeder::class);
    }

    public function test_guest_is_redirected_from_roles_index(): void
    {
        $this->get(route('roles.index'))
            ->assertRedirect(route('login'));
    }

    public function test_user_without_permission_cannot_view_roles_index(): void
    {
        $user = User::factory()->create();
        $user->assignRole('alumno');

        $this->actingAs($user)
            ->get(route('roles.index'))
            ->assertForbidden();
    }

    public function test_admin_can_view_roles_index(): void
    {
        $admin = User::factory()->create();
        $admin->assignRole('admin');

        $this->actingAs($admin)
            ->get(route('roles.index'))
            ->assertOk();
    }

    public function test_admin_can_create_role_with_permissions(): void
    {
        $admin = User::factory()->create();
        $admin->assignRole('admin');

        $response = $this->actingAs($admin)->post(route('roles.store'), [
            'name' => 'coordinador',
            'permissions' => ['usuarios.index', 'roles.index'],
        ]);

        $response->assertRedirect(route('roles.index'));

        $role = Role::query()->where('name', 'coordinador')->first();
        $this->assertNotNull($role);
        $this->assertTrue($role->hasPermissionTo('usuarios.index'));
        $this->assertTrue($role->hasPermissionTo('roles.index'));
    }

    public function test_admin_can_update_role(): void
    {
        $admin = User::factory()->create();
        $admin->assignRole('admin');

        $role = Role::query()->create(['name' => 'temporal', 'guard_name' => 'web']);
        $role->syncPermissions(['usuarios.index']);

        $response = $this->actingAs($admin)->put(route('roles.update', $role), [
            'name' => 'temporal-editado',
            'permissions' => ['roles.index'],
        ]);

        $response->assertRedirect(route('roles.index'));
        $this->assertDatabaseHas('roles', [
            'id' => $role->id,
            'name' => 'temporal-editado',
        ]);
        $this->assertTrue($role->fresh()?->hasPermissionTo('roles.index'));
        $this->assertFalse($role->fresh()?->hasPermissionTo('usuarios.index'));
    }

    public function test_admin_can_delete_role(): void
    {
        $admin = User::factory()->create();
        $admin->assignRole('admin');

        $role = Role::query()->create(['name' => 'borrar', 'guard_name' => 'web']);

        $response = $this->actingAs($admin)->delete(route('roles.destroy', $role));

        $response->assertRedirect(route('roles.index'));
        $this->assertDatabaseMissing('roles', ['id' => $role->id]);
    }

    public function test_create_role_validation_errors(): void
    {
        $admin = User::factory()->create();
        $admin->assignRole('admin');

        $response = $this->actingAs($admin)
            ->from(route('roles.create'))
            ->post(route('roles.store'), []);

        $response->assertRedirect(route('roles.create'));
        $response->assertSessionHasErrors(['name']);
    }
}
