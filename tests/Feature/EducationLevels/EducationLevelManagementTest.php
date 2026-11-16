<?php

namespace Tests\Feature\EducationLevels;

use App\Models\Career;
use App\Models\EducationLevel;
use App\Models\ProjectType;
use App\Models\Repository;
use App\Models\User;
use Database\Seeders\CareerSeeder;
use Database\Seeders\EducationLevelSeeder;
use Database\Seeders\PermissionsSeeder;
use Database\Seeders\ProjectTypeSeeder;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class EducationLevelManagementTest extends TestCase
{
    use RefreshDatabase;

    protected function setUp(): void
    {
        parent::setUp();

        $this->seed([
            CareerSeeder::class,
            ProjectTypeSeeder::class,
            EducationLevelSeeder::class,
            PermissionsSeeder::class,
        ]);
    }

    public function test_guest_is_redirected_from_education_levels_index(): void
    {
        $this->get(route('education_levels.index'))
            ->assertRedirect(route('login'));
    }

    public function test_user_without_permission_cannot_view_education_levels_index(): void
    {
        $user = User::factory()->create();
        $user->assignRole('student');

        $this->actingAs($user)
            ->get(route('education_levels.index'))
            ->assertForbidden();
    }

    public function test_admin_can_create_education_level(): void
    {
        $admin = User::factory()->create();
        $admin->assignRole('admin');

        $response = $this->actingAs($admin)->post(route('education_levels.store'), [
            'code' => 'masters',
            'name' => 'Maestría',
            'sort_order' => 30,
        ]);

        $response->assertRedirect(route('education_levels.index'));
        $this->assertDatabaseHas('education_levels', [
            'code' => 'masters',
            'name' => 'Maestría',
            'is_active' => true,
        ]);
    }

    public function test_admin_can_update_education_level(): void
    {
        $admin = User::factory()->create();
        $admin->assignRole('admin');

        $educationLevel = EducationLevel::query()->where('code', 'TSU')->firstOrFail();
        $originalCode = $educationLevel->code;

        $response = $this->actingAs($admin)->put(route('education_levels.update', $educationLevel), [
            'name' => 'TSU actualizado',
            'sort_order' => 5,
        ]);

        $response->assertRedirect(route('education_levels.index'));
        $educationLevel->refresh();
        $this->assertSame('TSU actualizado', $educationLevel->name);
        $this->assertSame($originalCode, $educationLevel->code);
    }

    public function test_admin_can_toggle_education_level_active_status(): void
    {
        $admin = User::factory()->create();
        $admin->assignRole('admin');

        $educationLevel = EducationLevel::query()->where('code', 'TSU')->firstOrFail();
        $this->assertTrue($educationLevel->is_active);

        $response = $this->actingAs($admin)
            ->patch(route('education_levels.toggle-active', $educationLevel));

        $response->assertRedirect(route('education_levels.index'));
        $this->assertFalse($educationLevel->fresh()?->is_active);
    }

    public function test_admin_can_delete_unreferenced_education_level(): void
    {
        $admin = User::factory()->create();
        $admin->assignRole('admin');

        $educationLevel = EducationLevel::query()->create([
            'code' => 'temp',
            'name' => 'Temporal',
            'sort_order' => 99,
            'is_active' => true,
        ]);

        $response = $this->actingAs($admin)->delete(route('education_levels.destroy', $educationLevel));

        $response->assertRedirect(route('education_levels.index'));
        $this->assertDatabaseMissing('education_levels', ['id' => $educationLevel->id]);
    }

    public function test_admin_cannot_delete_referenced_education_level(): void
    {
        $admin = User::factory()->create();
        $admin->assignRole('admin');

        $educationLevel = EducationLevel::query()->where('code', 'TSU')->firstOrFail();
        $career = Career::query()->where('code', 'TIC')->firstOrFail();
        $projectType = ProjectType::query()->where('code', 'integrative')->firstOrFail();

        Repository::factory()->create([
            'career_id' => $career->id,
            'project_type_id' => $projectType->id,
            'education_level_id' => $educationLevel->id,
        ]);

        $response = $this->actingAs($admin)->delete(route('education_levels.destroy', $educationLevel));

        $response->assertRedirect(route('education_levels.index'));
        $response->assertSessionHas('error', 'está en uso; desactívalo en su lugar');
        $this->assertDatabaseHas('education_levels', ['id' => $educationLevel->id]);
    }
}