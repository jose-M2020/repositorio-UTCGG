<?php

namespace Tests\Feature\Auth;

use App\Models\User;
use Database\Seeders\PermissionsSeeder;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class AuthenticationTest extends TestCase
{
    use RefreshDatabase;

    protected function setUp(): void
    {
        parent::setUp();

        $this->seed(PermissionsSeeder::class);
    }

    public function test_guest_can_view_login(): void
    {
        $this->get(route('login'))->assertOk();
    }

    public function test_authenticated_user_is_redirected_from_login(): void
    {
        $user = User::factory()->create();

        $this->actingAs($user)
            ->get(route('login'))
            ->assertRedirect(route('repositorios.user'));
    }

    public function test_user_can_login_with_valid_credentials(): void
    {
        $user = User::factory()->create([
            'email' => 'jose@example.com',
            'password' => 'Password123!',
        ]);

        $response = $this->post(route('login'), [
            'email' => 'jose@example.com',
            'password' => 'Password123!',
        ]);

        $response->assertRedirect(route('repositorios.user'));
        $this->assertAuthenticatedAs($user);
    }

    public function test_user_cannot_login_with_invalid_credentials(): void
    {
        User::factory()->create([
            'email' => 'jose@example.com',
            'password' => 'Password123!',
        ]);

        $response = $this->from(route('login'))->post(route('login'), [
            'email' => 'jose@example.com',
            'password' => 'wrong-password',
        ]);

        $response->assertRedirect(route('login'));
        $response->assertSessionHasErrors(['email']);
        $this->assertGuest();
    }

    public function test_login_is_rate_limited_after_repeated_failures(): void
    {
        User::factory()->create([
            'email' => 'jose@example.com',
            'password' => 'Password123!',
        ]);

        for ($attempt = 0; $attempt < 3; $attempt++) {
            $this->post(route('login'), [
                'email' => 'jose@example.com',
                'password' => 'wrong-password',
            ]);
        }

        $response = $this->from(route('login'))->post(route('login'), [
            'email' => 'jose@example.com',
            'password' => 'wrong-password',
        ]);

        $response->assertRedirect(route('login'));
        $response->assertSessionHasErrors(['email']);
    }

    public function test_authenticated_user_can_logout(): void
    {
        $user = User::factory()->create();

        $response = $this->actingAs($user)->post(route('logout'));

        $response->assertRedirect(route('home'));
        $this->assertGuest();
    }
}
