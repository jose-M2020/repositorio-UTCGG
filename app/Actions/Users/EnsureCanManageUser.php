<?php

namespace App\Actions\Users;

use App\Models\User;
use App\Support\UserRoles;

final class EnsureCanManageUser
{
    /**
     * Abort with 403 when a career-scoped manager tries to act on a user
     * outside their managed careers. Global managers (CAREER_ANY) are not restricted.
     */
    public function handle(?User $actor, User $user): void
    {
        if (! UserRoles::isCareerScoped($actor) || ! $actor) {
            return;
        }

        $managedIds = $actor->managedCareerIds();

        if ($managedIds->isEmpty()) {
            abort(403);
        }

        $inScope = User::query()
            ->whereKey($user->getKey())
            ->inCareers($managedIds->all())
            ->exists();

        abort_unless($inScope, 403);
    }
}
