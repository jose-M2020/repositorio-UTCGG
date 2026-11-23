<?php

namespace App\Policies;

use App\Enums\CatalogReviewStatus;
use App\Models\Company;
use App\Models\User;
use App\Services\BusinessAdvisors\CatalogAuthorization;
use App\Support\Permissions;

class CompanyPolicy
{
    public function __construct(
        private readonly CatalogAuthorization $authorization,
    ) {}

    public function search(User $user): bool
    {
        return $user->can(Permissions::BUSINESS_ADVISORS_SEARCH);
    }

    public function create(User $user): bool
    {
        return $user->can(Permissions::COMPANIES_CREATE);
    }

    public function update(User $user, Company $company): bool
    {
        return $company->status === CatalogReviewStatus::PendingReview
            && (int) $company->created_by === (int) $user->id;
    }

    public function verify(User $user, Company $company): bool
    {
        return $this->authorization->canVerifyEntity($user, $company);
    }

    public function merge(User $user): bool
    {
        return $user->can(Permissions::COMPANIES_MERGE);
    }
}
