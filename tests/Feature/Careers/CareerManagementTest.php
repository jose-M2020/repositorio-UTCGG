<?php

namespace Tests\Feature\Careers;

use App\Models\Career;
use App\Models\StudentProfile;
use App\Models\User;
use Database\Seeders\CareerSeeder;
use Database\Seeders\PermissionsSeeder;
use Illuminate\Foundation\Testing\RefreshDatabase;
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

    public function test_admin_can_update_career_without_changing_code(): void
    {
        $admin = User::factory()->create();
        $admin->assignRole('admin');

        $career = Career::query()->where('code', 'TIC')->firstOrFail();
        $originalCode = $career->code;

        $response = $this->actingAs($admin)->put(route('careers.update', $career), [
            'name' => 'Carrera actualizada',
            'sort_order' => 5,
            'image_path' => '/img/carrerasBG/NEW.jpg',
            'show_on_home' => true,
        ]);

        $response->assertRedirect(route('careers.index'));
        $career->refresh();
        $this->assertSame('Carrera actualizada', $career->name);
        $this->assertSame($originalCode, $career->code);
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
}