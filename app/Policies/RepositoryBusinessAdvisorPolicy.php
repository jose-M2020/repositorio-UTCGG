<?php

namespace App\Policies;

use App\Models\Repository;
use App\Models\RepositoryBusinessAdvisor;
use App\Models\User;
use App\Services\BusinessAdvisors\CatalogAuthorization;
use App\Support\Permissions;

class RepositoryBusinessAdvisorPolicy
{
    public function __construct(
        private readonly CatalogAuthorization $authorization,
    ) {}

    public function attach(User $user, Repository $repository): bool
    {
        return $user->can(Permissions::BUSINESS_ADVISORS_ATTACH)
            && $this->authorization->isRepositoryMember($user, $repository);
    }

    public function release(User $user, RepositoryBusinessAdvisor $assignment): bool
    {
        $repository = $assignment->repository;
        if ($repository === null) {
            return false;
        }

        return $user->can(Permissions::BUSINESS_ADVISORS_ATTACH)
            && $this->authorization->isRepositoryMember($user, $repository);
    }

    public function viewContact(User $user, RepositoryBusinessAdvisor $assignment): bool
    {
        return $user->can(Permissions::BUSINESS_ADVISORS_VIEW_CONTACT)
            && $this->authorization->canViewContact($user, $assignment);
    }

    public function resend(User $user, RepositoryBusinessAdvisor $assignment): bool
    {
        return $this->release($user, $assignment);
    }
}
