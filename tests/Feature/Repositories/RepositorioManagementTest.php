<?php

namespace Tests\Feature\Repositories;

use App\Models\Repositorio;
use App\Models\User;
use Database\Seeders\PermissionsSeeder;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class RepositorioManagementTest extends TestCase
{
    use RefreshDatabase;

    protected function setUp(): void
    {
        parent::setUp();

        $this->seed(PermissionsSeeder::class);
    }

    public function test_public_index_lists_only_public_repositories(): void
    {
        Repositorio::factory()->create(['nombre_rep' => 'Publico', 'publico' => true]);
        Repositorio::factory()->private()->create(['nombre_rep' => 'Privado']);

        $response = $this->get(route('repositorios.index'));

        $response->assertOk();
        $response->assertInertia(fn ($page) => $page
            ->component('repositories/index')
            ->has('repositorios.data', 1)
            ->where('repositorios.data.0.nombre_rep', 'Publico'));
    }

    public function test_private_repository_is_hidden_from_guests(): void
    {
        $repo = Repositorio::factory()->private()->create();

        $this->get(route('repositorios.show', $repo))
            ->assertNotFound();
    }

    public function test_member_can_create_repository_and_becomes_member(): void
    {
        $user = User::factory()->create();
        $user->assignRole('docente');

        $response = $this->actingAs($user)->post(route('repositorios.store'), [
            'nombre_rep' => 'Repo Test',
            'descripcion' => 'Descripcion de prueba',
            'tipo_proyecto' => 'Integradora',
            'nivel_proyecto' => 'TSU',
            'palabras_clave' => 'laravel, inertia',
            'visibilidad' => 'privado',
            'usuario' => [$user->email],
            'carrera' => 'TIC',
            'empresa' => 'UTCGG',
            'generacion' => '2026',
        ]);

        $repo = Repositorio::query()->where('nombre_rep', 'Repo Test')->first();
        $this->assertNotNull($repo);
        $response->assertRedirect(route('repositorios.user.show', $repo));
        $this->assertTrue($repo->users()->whereKey($user->id)->exists());
    }

    public function test_non_member_cannot_manage_repository(): void
    {
        $owner = User::factory()->create();
        $owner->assignRole('docente');

        $intruder = User::factory()->create();
        $intruder->assignRole('docente');

        $repo = Repositorio::factory()->private()->create();
        $repo->users()->attach($owner->id);

        $this->actingAs($intruder)
            ->get(route('repositorios.user.show', $repo))
            ->assertForbidden();
    }

    public function test_member_can_add_and_remove_members(): void
    {
        $owner = User::factory()->create();
        $owner->assignRole('docente');

        $member = User::factory()->create();

        $repo = Repositorio::factory()->create();
        $repo->users()->attach($owner->id);

        $this->actingAs($owner)
            ->post(route('repositorios.member.store', $repo), [
                'user_ids' => [$member->id],
            ])
            ->assertRedirect(route('repositorios.user.show', $repo));

        $this->assertTrue($repo->users()->whereKey($member->id)->exists());

        $this->actingAs($owner)
            ->delete(route('repositorios.member.destroy', [$repo, $member]))
            ->assertRedirect(route('repositorios.user.show', $repo));

        $this->assertFalse($repo->users()->whereKey($member->id)->exists());
    }

    public function test_admin_can_access_any_repository_manage_page(): void
    {
        $admin = User::factory()->create();
        $admin->assignRole('admin');

        $repo = Repositorio::factory()->private()->create();

        $this->actingAs($admin)
            ->get(route('repositorios.user.show', $repo))
            ->assertOk();
    }
}
