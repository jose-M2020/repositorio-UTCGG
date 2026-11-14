<?php

namespace Tests\Feature\Auth;

use App\Enums\SetPasswordPurpose;
use App\Models\User;
use App\Notifications\SetPasswordNotification;
use Database\Seeders\PermissionsSeeder;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Notification;
use Tests\TestCase;

class ForgotPasswordTest extends TestCase
{
    use RefreshDatabase;

    protected function setUp(): void
    {
        parent::setUp();

        $this->seed(PermissionsSeeder::class);
    }

    public function test_guest_can_view_forgot_password_form(): void
    {
        $this->get(route('password.request'))
            ->assertOk()
            ->assertInertia(fn ($page) => $page->component('auth/forgot-password'));
    }

    public function test_active_user_receives_reset_link(): void
    {
        Notification::fake();

        $user = User::factory()->create([
            'email' => 'jose@example.com',
        ]);

        $response = $this->from(route('password.request'))->post(route('password.email'), [
            'email' => 'jose@example.com',
        ]);

        $response->assertRedirect(route('password.request'));
        $response->assertSessionHas('status');

        Notification::assertSentTo(
            $user,
            SetPasswordNotification::class,
            fn (SetPasswordNotification $notification): bool => $notification->purpose === SetPasswordPurpose::Reset,
        );
    }

    public function test_pending_user_receives_activation_link(): void
    {
        Notification::fake();

        $user = User::factory()->pendingActivation()->create([
            'email' => 'ana@example.com',
        ]);

        $this->from(route('password.request'))->post(route('password.email'), [
            'email' => 'ana@example.com',
        ])->assertRedirect(route('password.request'));

        Notification::assertSentTo(
            $user,
            SetPasswordNotification::class,
            fn (SetPasswordNotification $notification): bool => $notification->purpose === SetPasswordPurpose::Activation,
        );
    }

    public function test_unknown_email_still_shows_generic_success(): void
    {
        Notification::fake();

        $response = $this->from(route('password.request'))->post(route('password.email'), [
            'email' => 'missing@example.com',
        ]);

        $response->assertRedirect(route('password.request'));
        $response->assertSessionHas('status');
        Notification::assertNothingSent();
    }

    public function test_inactive_user_does_not_receive_link(): void
    {
        Notification::fake();

        User::factory()->inactive()->create([
            'email' => 'inactive@example.com',
        ]);

        $this->from(route('password.request'))->post(route('password.email'), [
            'email' => 'inactive@example.com',
        ])->assertSessionHas('status');

        Notification::assertNothingSent();
    }
}
