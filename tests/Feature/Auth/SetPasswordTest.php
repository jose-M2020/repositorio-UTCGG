<?php

namespace Tests\Feature\Auth;

use App\Enums\UserAccountStatus;
use App\Models\User;
use Database\Seeders\PermissionsSeeder;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Password;
use Tests\TestCase;

class SetPasswordTest extends TestCase
{
    use RefreshDatabase;

    protected function setUp(): void
    {
        parent::setUp();

        $this->seed(PermissionsSeeder::class);
    }

    public function test_guest_can_view_set_password_form(): void
    {
        $this->get(route('password.set', [
            'token' => 'test-token',
            'email' => 'ana@example.com',
            'purpose' => 'activation',
        ]))
            ->assertOk()
            ->assertInertia(fn ($page) => $page
                ->component('auth/set-password')
                ->where('email', 'ana@example.com')
                ->where('purpose', 'activation'));
    }

    public function test_pending_user_can_activate_account_with_valid_token(): void
    {
        $user = User::factory()->pendingActivation()->create([
            'email' => 'ana@example.com',
        ]);

        $token = Password::broker()->createToken($user);

        $response = $this->post(route('password.store'), [
            'token' => $token,
            'email' => 'ana@example.com',
            'password' => 'Password123!',
            'password_confirmation' => 'Password123!',
        ]);

        $response->assertRedirect(route('login'));
        $this->assertSame(UserAccountStatus::Active, $user->fresh()?->status);
        $this->assertNotNull($user->fresh()?->password);

        $this->post(route('login'), [
            'email' => 'ana@example.com',
            'password' => 'Password123!',
        ])->assertRedirect(route('repositorios.user'));
    }

    public function test_active_user_can_reset_password_with_valid_token(): void
    {
        $user = User::factory()->create([
            'email' => 'jose@example.com',
            'password' => 'OldPassword123!',
        ]);

        $token = Password::broker()->createToken($user);

        $this->post(route('password.store'), [
            'token' => $token,
            'email' => 'jose@example.com',
            'password' => 'NewPassword123!',
            'password_confirmation' => 'NewPassword123!',
        ])->assertRedirect(route('login'));

        $this->assertSame(UserAccountStatus::Active, $user->fresh()?->status);

        $this->post(route('login'), [
            'email' => 'jose@example.com',
            'password' => 'NewPassword123!',
        ])->assertRedirect(route('repositorios.user'));
    }

    public function test_invalid_token_is_rejected(): void
    {
        User::factory()->pendingActivation()->create([
            'email' => 'ana@example.com',
        ]);

        $response = $this->from(route('password.set', [
            'token' => 'invalid-token',
            'email' => 'ana@example.com',
        ]))->post(route('password.store'), [
            'token' => 'invalid-token',
            'email' => 'ana@example.com',
            'password' => 'Password123!',
            'password_confirmation' => 'Password123!',
        ]);

        $response->assertRedirect(route('password.set', [
            'token' => 'invalid-token',
            'email' => 'ana@example.com',
        ]));
        $response->assertSessionHasErrors(['email']);
    }
}
