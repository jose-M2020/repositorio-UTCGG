<?php

namespace Tests\Feature\ProjectTypes;

use App\Models\Career;
use App\Models\ProjectType;
use App\Models\Repository;
use App\Models\User;
use Database\Seeders\CareerSeeder;
use Database\Seeders\EducationLevelSeeder;
use Database\Seeders\PermissionsSeeder;
use Database\Seeders\ProjectTypeSeeder;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class ProjectTypeManagementTest extends TestCase
{
    use RefreshDatabase;

    protected function setUp(): void
    {
        parent::setUp();

        $this->seed([
            CareerSeeder::class,
            EducationLevelSeeder::class,
            ProjectTypeSeeder::class,
            PermissionsSeeder::class,
        ]);
    }

    public function test_guest_is_redirected_from_project_types_index(): void
    {
        $this->get(route('project_types.index'))
            ->assertRedirect(route('login'));
    }

    public function test_user_without_permission_cannot_view_project_types_index(): void
    {
        $user = User::factory()->create();
        $user->assignRole('student');

        $this->actingAs($user)
            ->get(route('project_types.index'))
            ->assertForbidden();
    }

    public function test_admin_can_create_project_type(): void
    {
        $admin = User::factory()->create();
        $admin->assignRole('admin');

        $response = $this->actingAs($admin)->post(route('project_types.store'), [
            'code' => 'thesis',
            'name' => 'Tesis',
            'sort_order' => 40,
            'is_team_project' => false,
            'requires_term' => false,
        ]);

        $response->assertRedirect(route('project_types.index'));
        $this->assertDatabaseHas('project_types', [
            'code' => 'thesis',
            'name' => 'Tesis',
            'is_active' => true,
        ]);
    }

    public function test_admin_can_update_project_type_flags(): void
    {
        $admin = User::factory()->create();
        $admin->assignRole('admin');

        $projectType = ProjectType::query()->where('code', 'integrative')->firstOrFail();

        $response = $this->actingAs($admin)->put(route('project_types.update', $projectType), [
            'name' => 'Integradora actualizada',
            'sort_order' => 5,
            'is_team_project' => true,
            'requires_term' => true,
            'requires_internship_flow' => false,
            'requires_business_advisor' => false,
        ]);

        $response->assertRedirect(route('project_types.index'));
        $projectType->refresh();
        $this->assertSame('Integradora actualizada', $projectType->name);
        $this->assertTrue($projectType->requires_term);
    }

    public function test_admin_can_toggle_project_type_active_status(): void
    {
        $admin = User::factory()->create();
        $admin->assignRole('admin');

        $projectType = ProjectType::query()->where('code', 'integrative')->firstOrFail();
        $this->assertTrue($projectType->is_active);

        $response = $this->actingAs($admin)
            ->patch(route('project_types.toggle-active', $projectType));

        $response->assertRedirect(route('project_types.index'));
        $this->assertFalse($projectType->fresh()?->is_active);
    }

    public function test_admin_can_delete_unreferenced_project_type(): void
    {
        $admin = User::factory()->create();
        $admin->assignRole('admin');

        $projectType = ProjectType::query()->create([
            'code' => 'temp',
            'name' => 'Temporal',
            'sort_order' => 99,
            'is_active' => true,
        ]);

        $response = $this->actingAs($admin)->delete(route('project_types.destroy', $projectType));

        $response->assertRedirect(route('project_types.index'));
        $this->assertDatabaseMissing('project_types', ['id' => $projectType->id]);
    }

    public function test_admin_cannot_delete_referenced_project_type(): void
    {
        $admin = User::factory()->create();
        $admin->assignRole('admin');

        $projectType = ProjectType::query()->where('code', 'integrative')->firstOrFail();
        $career = Career::query()->where('code', 'TIC')->firstOrFail();
        $educationLevel = \App\Models\EducationLevel::query()->where('code', 'TSU')->firstOrFail();

        Repository::factory()->create([
            'career_id' => $career->id,
            'project_type_id' => $projectType->id,
            'education_level_id' => $educationLevel->id,
        ]);

        $response = $this->actingAs($admin)->delete(route('project_types.destroy', $projectType));

        $response->assertRedirect(route('project_types.index'));
        $response->assertSessionHas('error', 'está en uso; desactívalo en su lugar');
        $this->assertDatabaseHas('project_types', ['id' => $projectType->id]);
    }
}