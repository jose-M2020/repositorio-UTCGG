<?php

namespace App\Services\BusinessAdvisors;

use App\Enums\CatalogReviewStatus;
use App\Models\BusinessAdvisor;
use App\Models\BusinessAdvisorAffiliation;
use App\Models\Company;
use App\Models\Repository;
use App\Models\RepositoryBusinessAdvisor;
use App\Models\User;
use App\Support\Permissions;
use App\Support\UserRoles;

class CatalogAuthorization
{
    public function isRepositoryMember(User $user, Repository $repository): bool
    {
        if ($user->hasRole(UserRoles::ADMIN)) {
            return true;
        }

        return $repository->users()->whereKey($user->id)->exists();
    }

    public function isActiveAcademicAdvisor(User $user, Repository $repository): bool
    {
        return $repository->advisors()
            ->where('user_id', $user->id)
            ->whereNull('released_at')
            ->exists();
    }

    public function isCareerDirectorForRepository(User $user, Repository $repository): bool
    {
        if (! $user->hasRole(UserRoles::CAREER_DIRECTOR)) {
            return false;
        }

        $careerId = $repository->career_id;
        if ($careerId === null) {
            return false;
        }

        return $user->activeCareerAssignments()
            ->where('career_id', $careerId)
            ->exists();
    }

    public function canViewContact(User $user, RepositoryBusinessAdvisor $assignment): bool
    {
        $repository = $assignment->repository;
        if ($repository === null) {
            return false;
        }

        if ($user->hasRole([UserRoles::ADMIN, UserRoles::DIRECTOR])) {
            return true;
        }

        if ($this->isRepositoryMember($user, $repository)) {
            return true;
        }

        if ($this->isActiveAcademicAdvisor($user, $repository)) {
            return true;
        }

        return $this->isCareerDirectorForRepository($user, $repository);
    }

    public function canVerifyPendingOnRepository(User $user, Repository $repository): bool
    {
        if ($user->hasRole([UserRoles::ADMIN, UserRoles::DIRECTOR])) {
            return true;
        }

        if ($user->can(Permissions::BUSINESS_ADVISORS_VERIFY)
            && $this->isCareerDirectorForRepository($user, $repository)) {
            return true;
        }

        if (! $user->can(Permissions::BUSINESS_ADVISORS_VERIFY)) {
            return false;
        }

        $canBeAdvisor = (bool) $user->teacherProfile?->can_be_advisor;

        return $canBeAdvisor && $this->isActiveAcademicAdvisor($user, $repository);
    }

    public function canVerifyEntity(
        User $user,
        BusinessAdvisor|Company|BusinessAdvisorAffiliation $entity,
    ): bool {
        if ($entity->created_by !== null && (int) $entity->created_by === (int) $user->id) {
            return false;
        }

        if ($entity->status !== CatalogReviewStatus::PendingReview) {
            return false;
        }

        if ($user->hasRole([UserRoles::ADMIN, UserRoles::DIRECTOR])) {
            return true;
        }

        $permission = $entity instanceof Company
            ? Permissions::COMPANIES_VERIFY
            : Permissions::BUSINESS_ADVISORS_VERIFY;

        if (! $user->can($permission)) {
            return false;
        }

        $repositoryIds = $this->repositoryIdsForEntity($entity);
        if ($repositoryIds === []) {
            return $user->hasRole(UserRoles::CAREER_DIRECTOR);
        }

        foreach ($repositoryIds as $repositoryId) {
            $repository = Repository::query()->find($repositoryId);
            if ($repository !== null && $this->canVerifyPendingOnRepository($user, $repository)) {
                return true;
            }
        }

        return false;
    }

    /**
     * @return list<int>
     */
    private function repositoryIdsForEntity(
        BusinessAdvisor|Company|BusinessAdvisorAffiliation $entity,
    ): array {
        if ($entity instanceof BusinessAdvisor) {
            return RepositoryBusinessAdvisor::query()
                ->where('business_advisor_id', $entity->id)
                ->pluck('repository_id')
                ->unique()
                ->values()
                ->all();
        }

        if ($entity instanceof BusinessAdvisorAffiliation) {
            return RepositoryBusinessAdvisor::query()
                ->where('business_advisor_affiliation_id', $entity->id)
                ->pluck('repository_id')
                ->unique()
                ->values()
                ->all();
        }

        return Repository::query()
            ->where('company_id', $entity->id)
            ->pluck('id')
            ->all();
    }
}
