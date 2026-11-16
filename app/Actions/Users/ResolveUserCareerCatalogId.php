<?php

namespace App\Actions\Users;

use App\Models\Career;
use App\Models\User;
use App\Support\UserRoles;

final class ResolveUserCareerCatalogId
{
    public function handle(?User $actor, string $role, ?string $careerCode): ?int
    {
        if (! UserRoles::requiresCareer($role)) {
            return null;
        }

        if (UserRoles::isCareerScoped($actor)) {
            return $actor?->managedCareerIds()->first();
        }

        if ($careerCode === null || $careerCode === '') {
            return null;
        }

        return Career::query()
            ->where('code', $careerCode)
            ->value('id');
    }
}