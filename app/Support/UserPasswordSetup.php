<?php

namespace App\Support;

use App\Enums\SetPasswordPurpose;
use App\Models\User;
use App\Notifications\SetPasswordNotification;
use Illuminate\Support\Facades\Password;

final class UserPasswordSetup
{
    public static function send(User $user, SetPasswordPurpose $purpose): string
    {
        return Password::broker()->sendResetLink(
            ['email' => $user->email],
            function (User $user, string $token) use ($purpose): void {
                $user->notify(new SetPasswordNotification($token, $purpose));
            },
        );
    }
}
