<?php

namespace App\Actions\Users;

use App\Enums\UserType;
use App\Models\User;
use App\Services\Users\UserProvisioningService;
use App\Support\UserRoles;
use Illuminate\Support\Facades\DB;

final class ChangeUserRole
{
    public function __construct(
        private UserProvisioningService $provisioning,
        private EnsureCanManageUser $ensureCanManageUser,
    ) {}

    public function handle(User $actor, User $user, string $role): User
    {
        $this->ensureCanManageUser->handle($actor, $user);

        return DB::transaction(function () use ($actor, $user, $role): User {
            $targetType = $this->userTypeForRole($role);

            $careerId = null;
            if (UserRoles::requiresCareer($role)) {
                $careerId = $user->careerIds()->first()
                    ?? ($UserRoles::isCareerScoped($actor) ? $actor->managedCareerIds()->first() : null);
            }

            if ($user->user_type !== $targetType) {
                $user = $this->provisioning->changeType($actor, $user, $targetType, [
                    'career_id' => $careerId,
                    'job_title' => UserRoles::label($role),
                    'academic_status' => 'active',
                    'employee_number' => null,
                    'student_number' => null,
                ]);
            }

            $user->syncRoles([$role]);
            $user->update([
                'user_type' => $targetType,
            ]);

            return $user->fresh(['roles']);
        });
    }

    private function userTypeForRole(string $role): UserType
    {
        return match ($role) {
            UserRoles::STUDENT => UserType::Academic,
            UserRoles::TEACHER, UserRoles::CAREER_DIRECTOR => UserType::Workforce,
            default => UserType::Staff,
        };
    }
}