<?php

namespace App\Actions\Users;

use App\Models\Catalog;
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
            return $actor?->career_catalog_id;
        }

        if ($careerCode === null || $careerCode === '') {
            return null;
        }

        return Catalog::query()
            ->where('type', Catalog::TYPE_CAREER)
            ->where('code', $careerCode)
            ->value('id');
    }
}
