<?php

namespace Tests\Feature\Auth;

use App\Models\User;
use Database\Seeders\PermissionsSeeder;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Hash;
use Tests\TestCase;

class ChangePasswordTest extends TestCase
{
    use RefreshDatabase;

    protected function setUp(): void
    {
        parent::setUp();

        $this->seed(PermissionsSeeder::class);
    }

    public function test_authenticated_user_can_change_password(): void
    {
        $user = User::factory()->create([
            'email' => 'jose@example.com',
            'password' => 'OldPassword123!',
        ]);

        $response = $this->actingAs($user)->from(route('repositories.mine'))->put(route('password.update'), [
            'current_password' => 'OldPassword123!',
            'password' => 'NewPassword123!',
            'password_confirmation' => 'NewPassword123!',
        ]);

        $response->assertRedirect(route('repositories.mine'));
        $response->assertSessionHas('status', 'Contraseña actualizada correctamente.');
        $this->assertTrue(Hash::check('NewPassword123!', $user->fresh()?->password));
    }

    public function test_change_password_requires_current_password(): void
    {
        $user = User::factory()->create([
            'password' => 'OldPassword123!',
        ]);

        $response = $this->actingAs($user)->from(route('repositories.mine'))->put(route('password.update'), [
            'current_password' => 'WrongPassword123!',
            'password' => 'NewPassword123!',
            'password_confirmation' => 'NewPassword123!',
        ]);

        $response->assertRedirect(route('repositories.mine'));
        $response->assertSessionHasErrors(['current_password']);
        $this->assertTrue(Hash::check('OldPassword123!', $user->fresh()?->password));
    }

    public function test_guest_cannot_change_password(): void
    {
        $this->put(route('password.update'), [
            'current_password' => 'OldPassword123!',
            'password' => 'NewPassword123!',
            'password_confirmation' => 'NewPassword123!',
        ])->assertRedirect(route('login'));
    }
}
