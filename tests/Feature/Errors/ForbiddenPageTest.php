<?php

namespace Tests\Feature\Errors;

use App\Models\User;
use Database\Seeders\PermissionsSeeder;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class ForbiddenPageTest extends TestCase
{
    use RefreshDatabase;

    protected function setUp(): void
    {
        parent::setUp();

        $this->seed(PermissionsSeeder::class);
    }

    public function test_forbidden_response_renders_inertia_error_page(): void
    {
        $user = User::factory()->create();
        $user->assignRole('student');

        $this->actingAs($user)
            ->get(route('roles.index'))
            ->assertForbidden()
            ->assertInertia(fn ($page) => $page->component('errors/403'));
    }
}
