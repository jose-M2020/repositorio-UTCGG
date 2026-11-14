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

    public static function isValidLink(string $email, string $token): bool
    {
        if ($email === '' || $token === '' || ! filter_var($email, FILTER_VALIDATE_EMAIL)) {
            return false;
        }

        $user = User::query()->where('email', $email)->first();

        return $user !== null
            && Password::broker()->tokenExists($user, $token);
    }
}
