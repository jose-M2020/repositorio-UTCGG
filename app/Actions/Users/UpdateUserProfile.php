<?php

namespace App\Actions\Users;

use App\Models\User;

final class UpdateUserProfile
{
    public function __construct(
        private EnsureCanManageUser $ensureCanManageUser,
        private ResolveUserCareerCatalogId $resolveCareerCatalogId,
    ) {}

    public function handle(
        User $actor,
        User $user,
        string $firstName,
        string $lastName,
        ?string $secondLastName,
        string $email,
        ?string $careerCode,
    ): User {
        $this->ensureCanManageUser->handle($actor, $user);

        $currentRole = (string) ($user->getRoleNames()->first() ?? '');

        $user->update([
            'first_name' => $firstName,
            'last_name' => $lastName,
            'second_last_name' => $secondLastName,
            'email' => $email,
            'career_catalog_id' => $this->resolveCareerCatalogId->handle(
                $actor,
                $currentRole,
                $careerCode,
            ),
        ]);

        return $user->refresh();
    }
}
