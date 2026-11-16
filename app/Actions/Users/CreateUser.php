<?php

namespace App\Actions\Users;

use App\Models\User;
use App\Services\Users\UserProvisioningService;
use App\Support\UserRoles;

final class CreateUser
{
    public function __construct(
        private UserProvisioningService $provisioning,
    ) {}

    /**
     * @param  array<string, mixed>|null  $profile
     * @return array{user: User, link_status: string}
     */
    public function handle(
        User $actor,
        string $firstName,
        string $lastName,
        ?string $secondLastName,
        string $email,
        string $role,
        ?string $careerCode,
        ?string $userType = null,
        ?array $profile = null,
    ): array {
        $resolvedType = $userType ?? $this->defaultUserTypeForRole($role);

        $payload = [
            'first_name' => $firstName,
            'last_name' => $lastName,
            'second_last_name' => $secondLastName,
            'email' => $email,
            'user_type' => $resolvedType,
            'roles' => [$role],
            'career' => $careerCode,
            ...(match ($resolvedType) {
                'student' => [
                    'student_number' => $profile['student_number'] ?? null,
                    'academic_status' => $profile['academic_status'] ?? 'active',
                ],
                'teacher' => [
                    'employee_number' => $profile['employee_number'] ?? null,
                ],
                default => [
                    'job_title' => $profile['job_title'] ?? UserRoles::label($role),
                ],
            }),
            ...($profile ?? []),
        ];

        return $this->provisioning->create($actor, $payload);
    }

    public function flashMessage(string $linkStatus): string
    {
        return $this->provisioning->flashMessage($linkStatus);
    }

    private function defaultUserTypeForRole(string $role): string
    {
        return match ($role) {
            UserRoles::STUDENT => 'student',
            UserRoles::TEACHER, UserRoles::CAREER_DIRECTOR => 'teacher',
            default => 'staff',
        };
    }
}
