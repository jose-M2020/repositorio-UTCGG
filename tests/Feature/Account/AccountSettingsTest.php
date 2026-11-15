<?php

namespace Tests\Feature\Account;

use App\Models\User;
use Database\Seeders\PermissionsSeeder;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class AccountSettingsTest extends TestCase
{
    use RefreshDatabase;

    protected function setUp(): void
    {
        parent::setUp();

        $this->seed(PermissionsSeeder::class);
    }

    public function test_guest_cannot_view_account_settings(): void
    {
        $this->get(route('account.settings'))
            ->assertRedirect(route('login'));
    }

    public function test_authenticated_user_can_view_account_settings(): void
    {
        $user = User::factory()->create([
            'first_name' => 'Jose',
            'last_name' => 'Perez',
            'email' => 'jose@example.com',
        ]);

        $this->actingAs($user)
            ->get(route('account.settings'))
            ->assertOk()
            ->assertInertia(fn ($page) => $page
                ->component('panel/account/settings')
                ->where('account.first_name', 'Jose')
                ->where('account.last_name', 'Perez')
                ->where('account.email', 'jose@example.com'));
    }

    public function test_authenticated_user_can_update_profile_names(): void
    {
        $user = User::factory()->create([
            'first_name' => 'Jose',
            'last_name' => 'Perez',
            'second_last_name' => 'Lopez',
            'email' => 'jose@example.com',
        ]);

        $response = $this->actingAs($user)
            ->from(route('account.settings'))
            ->patch(route('account.settings.profile'), [
                'first_name' => 'Maria',
                'last_name' => 'Garcia',
                'second_last_name' => 'Ruiz',
            ]);

        $response->assertRedirect(route('account.settings'));
        $response->assertSessionHas('status', 'Datos de la cuenta actualizados.');

        $user->refresh();
        $this->assertSame('Maria', $user->first_name);
        $this->assertSame('Garcia', $user->last_name);
        $this->assertSame('Ruiz', $user->second_last_name);
        $this->assertSame('jose@example.com', $user->email);
    }

    public function test_profile_update_ignores_email_payload(): void
    {
        $user = User::factory()->create([
            'first_name' => 'Jose',
            'last_name' => 'Perez',
            'email' => 'jose@example.com',
        ]);

        $this->actingAs($user)
            ->from(route('account.settings'))
            ->patch(route('account.settings.profile'), [
                'first_name' => 'Jose',
                'last_name' => 'Perez',
                'second_last_name' => null,
                'email' => 'hacked@example.com',
            ])
            ->assertRedirect(route('account.settings'));

        $this->assertSame('jose@example.com', $user->fresh()?->email);
    }
}
