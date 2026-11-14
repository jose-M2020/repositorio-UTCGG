<?php

namespace App\Actions\Users;

use App\Models\User;
use App\Support\UserRoles;

final class EnsureCanManageUser
{
    /**
     * Abort with 403 when a career-scoped manager tries to act on a user
     * outside their career. Global managers (CAREER_ANY) are not restricted.
     */
    public function handle(?User $actor, User $user): void
    {
        if (! UserRoles::isCareerScoped($actor)) {
            return;
        }

        abort_unless(
            $actor?->career_catalog_id
                && $user->career_catalog_id === $actor->career_catalog_id,
            403,
        );
    }
}
