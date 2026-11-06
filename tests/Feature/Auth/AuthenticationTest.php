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

    public function test_guest_can_view_login_but_not_register(): void
    {
        $this->get(route('login'))->assertOk();
        $this->get(route('register'))->assertRedirect(route('login'));
    }

    public function test_authenticated_user_can_view_register_page(): void
    {
        $user = User::factory()->create();
        $user->assignRole('admin');

        $this->actingAs($user)
            ->get(route('register'))
            ->assertOk();
    }

    public function test_authenticated_user_is_redirected_from_login(): void
    {
        $user = User::factory()->create();

        $this->actingAs($user)
            ->get(route('login'))
            ->assertRedirect(route('home'));
    }

    public function test_authenticated_user_can_register_another_user(): void
    {
        $actor = User::factory()->create();
        $actor->assignRole('admin');

        $response = $this->actingAs($actor)->post(route('register'), [
            'nombre' => 'Jose',
            'apellido' => 'Martinez',
            'email' => 'jose@example.com',
            'carrera' => 'TIC',
            'password' => 'Password123!',
            'password_confirmation' => 'Password123!',
        ]);

        $response->assertRedirect(route('login'));

        $this->assertDatabaseHas('users', [
            'email' => 'jose@example.com',
            'nombre' => 'Jose',
            'apellido' => 'Martinez',
            'carrera' => 'TIC',
        ]);
    }

    public function test_register_requires_unique_email(): void
    {
        $actor = User::factory()->create();
        $actor->assignRole('admin');
        User::factory()->create(['email' => 'jose@example.com']);

        $response = $this->actingAs($actor)
            ->from(route('register'))
            ->post(route('register'), [
                'nombre' => 'Jose',
                'apellido' => 'Martinez',
                'email' => 'jose@example.com',
                'password' => 'Password123!',
                'password_confirmation' => 'Password123!',
            ]);

        $response->assertRedirect(route('register'));
        $response->assertSessionHasErrors(['email']);
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

        $response->assertRedirect(route('home'));
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
