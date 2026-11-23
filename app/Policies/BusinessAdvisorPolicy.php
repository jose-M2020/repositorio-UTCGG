<?php

namespace App\Policies;

use App\Enums\CatalogReviewStatus;
use App\Models\BusinessAdvisor;
use App\Models\User;
use App\Services\BusinessAdvisors\CatalogAuthorization;
use App\Support\Permissions;

class BusinessAdvisorPolicy
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
        return $user->can(Permissions::BUSINESS_ADVISORS_CREATE);
    }

    public function update(User $user, BusinessAdvisor $businessAdvisor): bool
    {
        return $businessAdvisor->status === CatalogReviewStatus::PendingReview
            && (int) $businessAdvisor->created_by === (int) $user->id;
    }

    public function verify(User $user, BusinessAdvisor $businessAdvisor): bool
    {
        return $this->authorization->canVerifyEntity($user, $businessAdvisor);
    }

    public function merge(User $user): bool
    {
        return $user->can(Permissions::BUSINESS_ADVISORS_MERGE);
    }

    public function manage(User $user): bool
    {
        return $user->can(Permissions::BUSINESS_ADVISORS_MANAGE);
    }

    public function viewAudit(User $user): bool
    {
        return $user->can(Permissions::BUSINESS_ADVISORS_VIEW_AUDIT);
    }

    public function export(User $user): bool
    {
        return $user->can(Permissions::BUSINESS_ADVISORS_EXPORT);
    }

    public function privacyRequests(User $user): bool
    {
        return $user->can(Permissions::BUSINESS_ADVISORS_PRIVACY_REQUESTS);
    }

    public function viewPending(User $user): bool
    {
        return $user->can(Permissions::BUSINESS_ADVISORS_VERIFY);
    }
}
