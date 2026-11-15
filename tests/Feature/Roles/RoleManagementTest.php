<?php

namespace Tests\Feature\Roles;

use App\Models\User;
use App\Support\RoleAssignPermissionSync;
use Database\Seeders\PermissionsSeeder;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Spatie\Permission\Models\Permission;
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
        $user->assignRole('student');

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
            'permissions' => ['users.index', 'roles.index'],
        ]);

        $response->assertRedirect(route('roles.index'));

        $role = Role::query()->where('name', 'coordinador')->first();
        $this->assertNotNull($role);
        $this->assertTrue($role->hasPermissionTo('users.index'));
        $this->assertTrue($role->hasPermissionTo('roles.index'));
        $this->assertDatabaseHas('permissions', [
            'name' => RoleAssignPermissionSync::permissionName('coordinador'),
            'guard_name' => 'web',
        ]);
    }

    public function test_admin_can_update_role(): void
    {
        $admin = User::factory()->create();
        $admin->assignRole('admin');

        $role = Role::query()->create(['name' => 'temporal', 'guard_name' => 'web']);
        RoleAssignPermissionSync::ensureFor('temporal');
        $role->syncPermissions(['users.index']);

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
        $this->assertFalse($role->fresh()?->hasPermissionTo('users.index'));
        $this->assertDatabaseMissing('permissions', [
            'name' => RoleAssignPermissionSync::permissionName('temporal'),
        ]);
        $this->assertDatabaseHas('permissions', [
            'name' => RoleAssignPermissionSync::permissionName('temporal-editado'),
            'guard_name' => 'web',
        ]);
    }

    public function test_admin_can_update_system_role_permissions_without_renaming(): void
    {
        $admin = User::factory()->create();
        $admin->assignRole('admin');

        $role = Role::query()->where('name', 'student')->firstOrFail();

        $response = $this->actingAs($admin)->put(route('roles.update', $role), [
            'name' => 'student',
            'permissions' => ['repositories.index', 'files.index'],
        ]);

        $response->assertRedirect(route('roles.index'));
        $this->assertDatabaseHas('roles', [
            'id' => $role->id,
            'name' => 'student',
        ]);
        $this->assertTrue($role->fresh()?->hasPermissionTo('repositories.index'));
        $this->assertTrue($role->fresh()?->hasPermissionTo('files.index'));
    }

    public function test_admin_cannot_rename_system_role(): void
    {
        $admin = User::factory()->create();
        $admin->assignRole('admin');

        $role = Role::query()->where('name', 'student')->firstOrFail();

        $response = $this->actingAs($admin)
            ->from(route('roles.index'))
            ->put(route('roles.update', $role), [
                'name' => 'alumno',
                'permissions' => ['repositories.index'],
            ]);

        $response->assertRedirect(route('roles.index'));
        $response->assertSessionHasErrors(['name']);
        $this->assertDatabaseHas('roles', [
            'id' => $role->id,
            'name' => 'student',
        ]);
        $this->assertDatabaseMissing('roles', [
            'name' => 'alumno',
        ]);
    }

    public function test_admin_can_delete_unused_custom_role(): void
    {
        $admin = User::factory()->create();
        $admin->assignRole('admin');

        $role = Role::query()->create(['name' => 'borrar', 'guard_name' => 'web']);
        RoleAssignPermissionSync::ensureFor('borrar');

        $response = $this->actingAs($admin)->delete(route('roles.destroy', $role));

        $response->assertRedirect(route('roles.index'));
        $this->assertDatabaseMissing('roles', ['id' => $role->id]);
        $this->assertDatabaseMissing('permissions', [
            'name' => RoleAssignPermissionSync::permissionName('borrar'),
        ]);
    }

    public function test_admin_cannot_delete_role_assigned_to_users(): void
    {
        $admin = User::factory()->create();
        $admin->assignRole('admin');

        $role = Role::query()->create(['name' => 'coordinador', 'guard_name' => 'web']);
        RoleAssignPermissionSync::ensureFor('coordinador');

        $user = User::factory()->create();
        $user->assignRole('coordinador');

        $response = $this->actingAs($admin)->delete(route('roles.destroy', $role));

        $response->assertRedirect(route('roles.index'));
        $response->assertSessionHas('error');
        $this->assertDatabaseHas('roles', ['id' => $role->id]);
        $this->assertDatabaseHas('permissions', [
            'name' => RoleAssignPermissionSync::permissionName('coordinador'),
        ]);
    }

    public function test_admin_cannot_delete_system_role(): void
    {
        $admin = User::factory()->create();
        $admin->assignRole('admin');

        $role = Role::query()->where('name', 'student')->firstOrFail();

        $response = $this->actingAs($admin)->delete(route('roles.destroy', $role));

        $response->assertRedirect(route('roles.index'));
        $response->assertSessionHas('error');
        $this->assertDatabaseHas('roles', ['id' => $role->id, 'name' => 'student']);
    }

    public function test_assign_permission_is_seeded_for_existing_roles(): void
    {
        foreach (['admin', 'director', 'career_director', 'teacher', 'student'] as $role) {
            $this->assertTrue(
                Permission::query()
                    ->where('name', RoleAssignPermissionSync::permissionName($role))
                    ->exists(),
            );
        }

        $director = Role::query()->where('name', 'director')->firstOrFail();
        $this->assertTrue($director->hasPermissionTo('users.career.any'));
        $this->assertTrue($director->hasPermissionTo(RoleAssignPermissionSync::permissionName('student')));

        $directorCarrera = Role::query()->where('name', 'career_director')->firstOrFail();
        $this->assertFalse($directorCarrera->hasPermissionTo('users.career.any'));
        $this->assertTrue($directorCarrera->hasPermissionTo(RoleAssignPermissionSync::permissionName('student')));
        $this->assertFalse($directorCarrera->hasPermissionTo(RoleAssignPermissionSync::permissionName('admin')));
    }

    public function test_create_role_validation_errors(): void
    {
        $admin = User::factory()->create();
        $admin->assignRole('admin');

        $response = $this->actingAs($admin)
            ->from(route('roles.index'))
            ->post(route('roles.store'), []);

        $response->assertRedirect(route('roles.index'));
        $response->assertSessionHasErrors(['name']);
    }
}
