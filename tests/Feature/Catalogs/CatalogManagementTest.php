<?php

namespace Tests\Feature\Catalogs;

use App\Models\Catalog;
use App\Models\User;
use Database\Seeders\CatalogSeeder;
use Database\Seeders\PermissionsSeeder;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class CatalogManagementTest extends TestCase
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

    public function test_guest_is_redirected_from_catalogs_index(): void
    {
        $this->get(route('catalogos.index'))
            ->assertRedirect(route('login'));
    }

    public function test_user_without_permission_cannot_view_catalogs_index(): void
    {
        $user = User::factory()->create();
        $user->assignRole('alumno');

        $this->actingAs($user)
            ->get(route('catalogos.index'))
            ->assertForbidden();
    }

    public function test_admin_can_create_catalog_item(): void
    {
        $admin = User::factory()->create();
        $admin->assignRole('admin');

        $response = $this->actingAs($admin)->post(route('catalogos.store'), [
            'type' => Catalog::TYPE_PROJECT,
            'code' => 'Tesis',
            'name' => 'Tesis',
            'sort_order' => 40,
            'is_active' => true,
        ]);

        $response->assertRedirect(route('catalogos.index'));
        $this->assertDatabaseHas('catalogs', [
            'type' => Catalog::TYPE_PROJECT,
            'code' => 'Tesis',
            'name' => 'Tesis',
        ]);
    }

    public function test_admin_can_update_catalog_item(): void
    {
        $admin = User::factory()->create();
        $admin->assignRole('admin');

        $catalog = Catalog::query()->where('type', Catalog::TYPE_CAREER)->firstOrFail();

        $response = $this->actingAs($admin)->put(route('catalogos.update', $catalog), [
            'type' => Catalog::TYPE_CAREER,
            'code' => $catalog->code,
            'name' => 'Carrera actualizada',
            'sort_order' => 5,
            'is_active' => true,
            'meta_image' => '/img/carrerasBG/NEW.jpg',
            'meta_show_on_home' => true,
        ]);

        $response->assertRedirect(route('catalogos.index'));
        $this->assertDatabaseHas('catalogs', [
            'id' => $catalog->id,
            'name' => 'Carrera actualizada',
            'sort_order' => 5,
        ]);
    }

    public function test_admin_can_delete_catalog_item(): void
    {
        $admin = User::factory()->create();
        $admin->assignRole('admin');

        $catalog = Catalog::query()->where('type', Catalog::TYPE_PROJECT)->firstOrFail();

        $response = $this->actingAs($admin)->delete(route('catalogos.destroy', $catalog));

        $response->assertRedirect(route('catalogos.index'));
        $this->assertDatabaseMissing('catalogs', ['id' => $catalog->id]);
    }
}
