<?php

namespace App\Policies;

use App\Enums\CatalogReviewStatus;
use App\Models\BusinessAdvisorAffiliation;
use App\Models\User;
use App\Services\BusinessAdvisors\CatalogAuthorization;
use App\Support\Permissions;

class BusinessAdvisorAffiliationPolicy
{
    public function __construct(
        private readonly CatalogAuthorization $authorization,
    ) {}

    public function create(User $user): bool
    {
        return $user->can(Permissions::BUSINESS_ADVISORS_CREATE);
    }

    public function update(User $user, BusinessAdvisorAffiliation $affiliation): bool
    {
        return $affiliation->status === CatalogReviewStatus::PendingReview
            && (int) $affiliation->created_by === (int) $user->id;
    }

    public function verify(User $user, BusinessAdvisorAffiliation $affiliation): bool
    {
        return $this->authorization->canVerifyEntity($user, $affiliation);
    }
}
