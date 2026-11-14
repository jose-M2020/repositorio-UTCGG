<?php

namespace App\Actions\Users;

use App\Models\User;
use App\Support\UserRoles;

final class ChangeUserRole
{
    public function __construct(
        private EnsureCanManageUser $ensureCanManageUser,
    ) {}

    public function handle(User $actor, User $user, string $role): User
    {
        $this->ensureCanManageUser->handle($actor, $user);

        $careerCatalogId = null;

        if (UserRoles::requiresCareer($role)) {
            $careerCatalogId = $user->career_catalog_id
                ?? (UserRoles::isCareerScoped($actor) ? $actor->career_catalog_id : null);
        }

        $user->syncRoles([$role]);
        $user->update([
            'career_catalog_id' => $careerCatalogId,
        ]);

        return $user->refresh();
    }
}
