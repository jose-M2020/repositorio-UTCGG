<?php

namespace Tests\Feature\Repositories;

use App\Enums\ProjectPeriodStatus;
use App\Models\ProjectPeriod;
use App\Models\ProjectType;
use App\Models\Repository;
use App\Models\User;
use Database\Seeders\PermissionsSeeder;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class RepositoryManagementTest extends TestCase
{
    use RefreshDatabase;

    protected function setUp(): void
    {
        parent::setUp();

        $this->seedDomainLookups();
        $this->seed(PermissionsSeeder::class);
    }

    private function openPeriodFor(string $projectTypeCode): ProjectPeriod
    {
        $projectType = ProjectType::query()->where('code', $projectTypeCode)->firstOrFail();

        return ProjectPeriod::factory()->open()->create([
            'project_type_id' => $projectType->id,
            'status' => ProjectPeriodStatus::Open->value,
            'name' => "Periodo {$projectTypeCode}",
        ]);
    }

    public function test_public_index_lists_only_public_repositories(): void
    {
        Repository::factory()->create(['title' => 'Publico', 'is_public' => true]);
        Repository::factory()->private()->create(['title' => 'Privado']);

        $response = $this->get(route('repositories.index'));

        $response->assertOk();
        $response->assertInertia(fn ($page) => $page
            ->component('public/repositories/index')
            ->has('repositories.data', 1)
            ->where('repositories.data.0.title', 'Publico'));
    }

    public function test_private_repository_is_hidden_from_guests(): void
    {
        $repo = Repository::factory()->private()->create();

        $this->get(route('repositories.show', $repo))
            ->assertNotFound();
    }

    public function test_member_can_create_repository_and_becomes_member(): void
    {
        $user = User::factory()->create();
        $user->assignRole('teacher');
        $period = $this->openPeriodFor('integrative');

        $response = $this->actingAs($user)->post(route('repositories.store'), [
            'title' => 'Repo Test',
            'description' => 'Descripcion de prueba',
            'project_type' => 'integrative',
            'academic_degree' => 'TSU',
            'keywords' => 'laravel, inertia',
            'visibility' => 'private',
            'member_emails' => [$user->email],
            'career' => 'TIC',
            'project_period_id' => $period->id,
            'company' => [
                'name' => 'UTCGG',
                'address' => [
                    'street_line' => 'Av. Universidad 100',
                    'neighborhood' => 'Centro',
                    'city' => 'Ciudad Guzman',
                    'state' => 'Jalisco',
                    'postal_code' => '49000',
                    'country' => 'MX',
                ],
            ],
            'business_advisor' => [
                'first_name' => 'Ana',
                'last_name' => 'Lopez',
                'second_last_name' => 'Ruiz',
            ],
            'generation' => '2026',
        ]);

        $repo = Repository::query()->where('title', 'Repo Test')->first();
        $this->assertNotNull($repo);
        $response->assertRedirect(route('repositories.account.show', $repo));
        $this->assertTrue($repo->users()->whereKey($user->id)->exists());
        $this->assertSame($period->id, $repo->project_period_id);
        $this->assertNotNull($repo->company_id);
        $this->assertDatabaseHas('companies', ['name' => 'UTCGG']);
        $this->assertDatabaseHas('addresses', [
            'street_line' => 'Av. Universidad 100',
            'city' => 'Ciudad Guzman',
            'postal_code' => '49000',
        ]);
        $this->assertNotNull($repo->company?->address_id);
        $this->assertDatabaseHas('repository_business_advisors', [
            'repository_id' => $repo->id,
            'first_name' => 'Ana',
            'last_name' => 'Lopez',
            'second_last_name' => 'Ruiz',
        ]);
    }

    public function test_member_can_create_repository_without_extra_members(): void
    {
        $user = User::factory()->create();
        $user->assignRole('teacher');
        $period = $this->openPeriodFor('integrative');

        $response = $this->actingAs($user)->post(route('repositories.store'), [
            'title' => 'Repo Solo',
            'description' => 'Descripcion de prueba',
            'project_type' => 'integrative',
            'academic_degree' => 'TSU',
            'keywords' => 'laravel, inertia',
            'visibility' => 'private',
            'career' => 'TIC',
            'project_period_id' => $period->id,
            'generation' => '2026',
        ]);

        $repo = Repository::query()->where('title', 'Repo Solo')->first();
        $this->assertNotNull($repo);
        $response->assertRedirect(route('repositories.account.show', $repo));
        $this->assertTrue($repo->users()->whereKey($user->id)->exists());
        $this->assertSame(1, $repo->users()->count());
        $this->assertNull($repo->company_id);
        $this->assertDatabaseMissing('repository_business_advisors', [
            'repository_id' => $repo->id,
            'released_at' => null,
        ]);
    }

    public function test_user_with_permission_can_view_create_repository_page(): void
    {
        $user = User::factory()->create();
        $user->assignRole('teacher');

        $this->actingAs($user)
            ->get(route('repositories.create'))
            ->assertOk()
            ->assertInertia(fn ($page) => $page
                ->component('panel/repositories/create')
                ->has('lookups'));
    }

    public function test_non_member_cannot_manage_repository(): void
    {
        $owner = User::factory()->create();
        $owner->assignRole('teacher');

        $intruder = User::factory()->create();
        $intruder->assignRole('teacher');

        $repo = Repository::factory()->private()->create();
        $repo->users()->attach($owner->id);

        $this->actingAs($intruder)
            ->get(route('repositories.account.show', $repo))
            ->assertForbidden();
    }

    public function test_member_can_add_and_remove_members(): void
    {
        $owner = User::factory()->create();
        $owner->assignRole('teacher');

        $member = User::factory()->create();

        $repo = Repository::factory()->create();
        $repo->users()->attach($owner->id);

        $this->actingAs($owner)
            ->post(route('repositories.members.store', $repo), [
                'user_ids' => [$member->id],
            ])
            ->assertRedirect(route('repositories.account.show', $repo));

        $this->assertTrue($repo->users()->whereKey($member->id)->exists());

        $this->actingAs($owner)
            ->delete(route('repositories.members.destroy', [$repo, $member]))
            ->assertRedirect(route('repositories.account.show', $repo));

        $this->assertFalse($repo->users()->whereKey($member->id)->exists());
    }

    public function test_admin_can_access_any_repository_manage_page(): void
    {
        $admin = User::factory()->create();
        $admin->assignRole('admin');

        $repo = Repository::factory()->private()->create();

        $this->actingAs($admin)
            ->get(route('repositories.account.show', $repo))
            ->assertOk();
    }
}
