<?php

namespace App\Actions\Auth;

use App\Models\User;

final class UpdateAccountProfile
{
    public function handle(
        User $user,
        string $firstName,
        string $lastName,
        ?string $secondLastName,
    ): User {
        $user->update([
            'first_name' => $firstName,
            'last_name' => $lastName,
            'second_last_name' => $secondLastName,
        ]);

        return $user->refresh();
    }
}
