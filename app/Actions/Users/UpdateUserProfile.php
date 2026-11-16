<?php

namespace App\Actions\Users;

use App\Models\User;
use App\Services\Users\UserProvisioningService;

final class UpdateUserProfile
{
    public function __construct(
        private UserProvisioningService $provisioning,
    ) {}

    /**
     * @param  array<string, mixed>|null  $profile
     */
    public function handle(
        User $actor,
        User $user,
        string $firstName,
        string $lastName,
        ?string $secondLastName,
        string $email,
        ?string $careerCode,
        ?array $profile = null,
    ): User {
        return $this->provisioning->update($actor, $user, [
            'first_name' => $firstName,
            'last_name' => $lastName,
            'second_last_name' => $secondLastName,
            'email' => $email,
            'career' => $careerCode,
            ...($profile ?? []),
        ]);
    }
}
