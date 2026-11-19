<?php

namespace Tests\Feature\Careers;

use App\Models\Career;
use App\Models\StudentProfile;
use App\Models\User;
use Database\Seeders\CareerSeeder;
use Database\Seeders\PermissionsSeeder;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Spatie\Permission\Models\Role;
use Spatie\Permission\PermissionRegistrar;
use Tests\TestCase;

class CareerManagementTest extends TestCase
{
    use RefreshDatabase;

    protected function setUp(): void
    {
        parent::setUp();

        $this->seed([
            CareerSeeder::class,
            PermissionsSeeder::class,
        ]);
        Storage::fake();
    }

    public function test_guest_is_redirected_from_careers_index(): void
    {
        $this->get(route('careers.index'))
            ->assertRedirect(route('login'));
    }

    public function test_user_without_permission_cannot_view_careers_index(): void
    {
        $user = User::factory()->create();
        $user->assignRole('student');

        $this->actingAs($user)
            ->get(route('careers.index'))
            ->assertForbidden();
    }

    public function test_admin_can_create_career(): void
    {
        $admin = User::factory()->create();
        $admin->assignRole('admin');

        $response = $this->actingAs($admin)->post(route('careers.store'), [
            'code' => 'NEW',
            'name' => 'Nueva carrera',
            'sort_order' => 5,
            'show_on_home' => false,
        ]);

        $response->assertRedirect(route('careers.index'));
        $this->assertDatabaseHas('careers', [
            'code' => 'NEW',
            'name' => 'Nueva carrera',
            'is_active' => true,
        ]);
    }

    public function test_admin_can_create_career_with_logo_upload(): void
    {
        $admin = User::factory()->create();
        $admin->assignRole('admin');

        $response = $this->actingAs($admin)->post(route('careers.store'), [
            'code' => 'LOG',
            'name' => 'Carrera con logo',
            'sort_order' => 5,
            'show_on_home' => true,
            'image' => UploadedFile::fake()->image('logo.png', 200, 100),
        ]);

        $response->assertRedirect(route('careers.index'));

        $career = Career::query()->where('code', 'LOG')->first();
        $this->assertNotNull($career);
        $this->assertNotNull($career->image_path);
        Storage::assertExists($career->image_path);
    }

    public function test_admin_can_update_career_without_changing_code(): void
    {
        $admin = User::factory()->create();
        $admin->assignRole('admin');

        $career = Career::query()->where('code', 'TIC')->firstOrFail();
        $originalCode = $career->code;

        $response = $this->actingAs($admin)->put(route('careers.update', $career), [
            'name' => 'Carrera actualizada',
            'sort_order' => 5,
            'show_on_home' => true,
        ]);

        $response->assertRedirect(route('careers.index'));
        $career->refresh();
        $this->assertSame('Carrera actualizada', $career->name);
        $this->assertSame($originalCode, $career->code);
    }

    public function test_admin_can_replace_and_remove_career_logo(): void
    {
        $admin = User::factory()->create();
        $admin->assignRole('admin');

        $career = Career::query()->where('code', 'TIC')->firstOrFail();

        $this->actingAs($admin)->put(route('careers.update', $career), [
            'name' => $career->name,
            'sort_order' => $career->sort_order,
            'show_on_home' => true,
            'image' => UploadedFile::fake()->image('replacement.jpg', 180, 90),
        ])->assertRedirect(route('careers.index'));

        $career->refresh();
        $this->assertNotNull($career->image_path);
        Storage::assertExists($career->image_path);
        $storedPath = $career->image_path;

        $this->actingAs($admin)->put(route('careers.update', $career), [
            'name' => $career->name,
            'sort_order' => $career->sort_order,
            'show_on_home' => false,
            'remove_image' => true,
        ])->assertRedirect(route('careers.index'));

        $career->refresh();
        $this->assertNull($career->image_path);
        Storage::assertMissing($storedPath);
    }

    public function test_admin_can_toggle_career_active_status(): void
    {
        $admin = User::factory()->create();
        $admin->assignRole('admin');

        $career = Career::query()->where('code', 'TIC')->firstOrFail();
        $this->assertTrue($career->is_active);

        $response = $this->actingAs($admin)
            ->patch(route('careers.toggle-active', $career));

        $response->assertRedirect(route('careers.index'));
        $this->assertFalse($career->fresh()?->is_active);
    }

    public function test_admin_can_delete_unreferenced_career(): void
    {
        $admin = User::factory()->create();
        $admin->assignRole('admin');

        $career = Career::query()->create([
            'code' => 'DEL',
            'name' => 'Para borrar',
            'slug' => 'para-borrar',
            'sort_order' => 99,
            'is_active' => true,
        ]);

        $response = $this->actingAs($admin)->delete(route('careers.destroy', $career));

        $response->assertRedirect(route('careers.index'));
        $this->assertDatabaseMissing('careers', ['id' => $career->id]);
    }

    public function test_admin_cannot_delete_referenced_career(): void
    {
        $admin = User::factory()->create();
        $admin->assignRole('admin');

        $career = Career::query()->where('code', 'TIC')->firstOrFail();
        StudentProfile::factory()->create(['career_id' => $career->id]);

        $response = $this->actingAs($admin)->delete(route('careers.destroy', $career));

        $response->assertRedirect(route('careers.index'));
        $response->assertSessionHas('error', 'está en uso; desactívalo en su lugar');
        $this->assertDatabaseHas('careers', ['id' => $career->id]);
    }

    public function test_user_with_only_edit_cannot_toggle_career_active(): void
    {
        $actor = User::factory()->create();
        $actor->givePermissionTo([
            'careers.index',
            'careers.edit',
        ]);

        $career = Career::query()->where('code', 'TIC')->firstOrFail();

        $this->actingAs($actor)
            ->put(route('careers.update', $career), [
                'name' => 'Carrera editada',
                'sort_order' => $career->sort_order,
                'show_on_home' => false,
            ])
            ->assertRedirect(route('careers.index'));

        $this->actingAs($actor)
            ->patch(route('careers.toggle-active', $career))
            ->assertForbidden();
    }

    public function test_user_with_toggle_active_can_toggle_career(): void
    {
        $actor = User::factory()->create();
        $actor->givePermissionTo([
            'careers.index',
            'careers.toggle-active',
        ]);

        $career = Career::query()->where('code', 'TIC')->firstOrFail();
        $this->assertTrue($career->is_active);

        $this->actingAs($actor)
            ->patch(route('careers.toggle-active', $career))
            ->assertRedirect(route('careers.index'));

        $this->assertFalse($career->fresh()?->is_active);
    }

    public function test_granular_permission_migration_backfills_from_careers_edit(): void
    {
        $role = Role::query()->create([
            'name' => 'legacy_career_editor',
            'guard_name' => 'web',
        ]);
        $role->givePermissionTo('careers.edit');
        $this->assertFalse($role->hasPermissionTo('careers.toggle-active'));

        $migration = require database_path('migrations/2026_11_15_220000_add_granular_action_permissions.php');
        $migration->up();

        $role->refresh();
        app(PermissionRegistrar::class)->forgetCachedPermissions();

        $this->assertTrue($role->hasPermissionTo('careers.toggle-active'));
    }
}
