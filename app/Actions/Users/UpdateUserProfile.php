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
        string $nombre,
        string $apellido,
        string $email,
        ?string $careerCode,
    ): User {
        $this->ensureCanManageUser->handle($actor, $user);

        $currentRole = (string) ($user->getRoleNames()->first() ?? '');

        $user->update([
            'nombre' => $nombre,
            'apellido' => $apellido,
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
