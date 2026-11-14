<?php

namespace App\Actions\Auth;

use App\Models\User;
use Illuminate\Support\Str;

final class ChangeUserPassword
{
    public function handle(User $user, string $password): void
    {
        $user->forceFill([
            'password' => $password,
            'remember_token' => Str::random(60),
        ])->save();
    }
}
