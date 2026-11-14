<?php

namespace App\Actions\Auth;

use App\Enums\SetPasswordPurpose;
use App\Enums\UserAccountStatus;
use App\Models\User;
use App\Support\UserPasswordSetup;
use Illuminate\Support\Facades\Password;

final class SendGuestPasswordResetLink
{
    public function handle(string $email): void
    {
        $user = User::query()->where('email', $email)->first();

        if ($user === null || $user->status === UserAccountStatus::Inactive) {
            return;
        }

        $purpose = $user->status === UserAccountStatus::PendingActivation
            ? SetPasswordPurpose::Activation
            : SetPasswordPurpose::Reset;

        $status = UserPasswordSetup::send($user, $purpose);

        if ($status !== Password::RESET_LINK_SENT) {
            report("Password reset link was not queued for user [{$user->id}]: {$status}");
        }
    }
}
