<?php

namespace App\Services\Users;

use App\Actions\Users\EnsureCanManageUser;
use App\Enums\AcademicStatus;
use App\Enums\CareerPosition;
use App\Enums\SetPasswordPurpose;
use App\Enums\UserAccountStatus;
use App\Enums\UserType;
use App\Models\Career;
use App\Models\CareerAssignment;
use App\Models\StaffProfile;
use App\Models\StudentProfile;
use App\Models\TeacherProfile;
use App\Models\User;
use App\Support\UserPasswordSetup;
use App\Support\UserRoles;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Password;
use Illuminate\Validation\ValidationException;

final class UserProvisioningService
{
    public function __construct(
        private EnsureCanManageUser $ensureCanManageUser,
    ) {}

    /**
     * @param  array<string, mixed>  $data
     * @return array{user: User, link_status: string}
     */
    public function create(User $actor, array $data): array
    {
        return DB::transaction(function () use ($actor, $data): array {
            $userType = UserType::from((string) $data['user_type']);
            $roles = $this->normalizeRoles($data['roles'] ?? $data['role'] ?? []);
            $this->assertActorCanAssignRoles($actor, $roles);
            $this->assertRolesCompatibleWithType($userType, $roles);
            $this->assertActorCareerScopeForCreate($actor, $userType, $data);

            $user = User::query()->create([
                'first_name' => $data['first_name'],
                'last_name' => $data['last_name'],
                'second_last_name' => $data['second_last_name'] ?? null,
                'email' => $data['email'],
                'phone' => $data['phone'] ?? null,
                'user_type' => $userType,
                'password' => null,
                'status' => UserAccountStatus::PendingActivation,
                'must_change_password' => false,
            ]);

            $this->createProfileForType($user, $userType, $data, $actor);
            $user->syncRoles($roles);

            $linkStatus = UserPasswordSetup::send($user, SetPasswordPurpose::Activation);

            return [
                'user' => $user->fresh(['roles', 'studentProfile', 'teacherProfile', 'staffProfile', 'careerAssignments']),
                'link_status' => $linkStatus,
            ];
        });
    }

    /**
     * @param  array<string, mixed>  $data
     */
    public function update(User $actor, User $user, array $data): User
    {
        return DB::transaction(function () use ($actor, $user, $data): User {
            $this->ensureCanManageUser->handle($actor, $user);

            $userType = $this->resolveUserType($user);

            $user->update([
                'first_name' => $data['first_name'],
                'last_name' => $data['last_name'],
                'second_last_name' => $data['second_last_name'] ?? null,
                'email' => $data['email'],
                'phone' => $data['phone'] ?? $user->phone,
                'user_type' => $userType,
            ]);

            $this->updateProfileForType($user, $userType, $data, $actor);

            return $user->fresh(['roles', 'studentProfile', 'teacherProfile', 'staffProfile', 'careerAssignments']);
        });
    }

    /**
     * @param  list<string>  $roles
     */
    public function syncRoles(User $actor, User $user, array $roles): User
    {
        return DB::transaction(function () use ($actor, $user, $roles): User {
            $this->ensureCanManageUser->handle($actor, $user);
            $roles = $this->normalizeRoles($roles);
            $this->assertActorCanAssignRoles($actor, $roles);

            $userType = $user->user_type ?? UserType::Staff;
            $this->assertRolesCompatibleWithType($userType, $roles);

            $user->syncRoles($roles);

            return $user->fresh(['roles']);
        });
    }

    /**
     * @param  array<string, mixed>  $data
     */
    public function changeType(User $actor, User $user, UserType $newType, array $data): User
    {
        return DB::transaction(function () use ($actor, $user, $newType, $data): User {
            $this->ensureCanManageUser->handle($actor, $user);

            if ($user->user_type === UserType::Student && $newType !== UserType::Student) {
                $user->studentProfile?->update([
                    'academic_status' => AcademicStatus::Graduated,
                ]);
            }

            $user->update([
                'user_type' => $newType,
            ]);

            $this->createProfileForType($user, $newType, $data, $actor);

            return $user->fresh(['roles', 'studentProfile', 'teacherProfile', 'staffProfile', 'careerAssignments']);
        });
    }

    /**
     * @param  array{career_id: int, starts_at: string, ends_at?: string|null}  $data
     */
    public function assignCareerDirector(User $actor, User $user, array $data): CareerAssignment
    {
        return DB::transaction(function () use ($actor, $user, $data): CareerAssignment {
            $this->ensureCanManageUser->handle($actor, $user);

            if ($user->user_type !== UserType::Teacher) {
                throw ValidationException::withMessages([
                    'user_type' => 'Solo un docente puede ser director de carrera.',
                ]);
            }

            $careerId = (int) $data['career_id'];
            $this->assertSingleActiveCareerDirector($careerId);

            $assignment = CareerAssignment::query()->create([
                'user_id' => $user->id,
                'career_id' => $careerId,
                'position' => CareerPosition::CareerDirector,
                'starts_at' => $data['starts_at'],
                'ends_at' => $data['ends_at'] ?? null,
                'created_by' => $actor->id,
            ]);

            if (! $user->hasRole(UserRoles::CAREER_DIRECTOR)) {
                $user->assignRole(UserRoles::CAREER_DIRECTOR);
            }

            return $assignment;
        });
    }

    public function endCareerDirector(User $actor, CareerAssignment $assignment, ?string $endsAt = null): CareerAssignment
    {
        return DB::transaction(function () use ($actor, $assignment, $endsAt): CareerAssignment {
            $user = $assignment->user;
            $this->ensureCanManageUser->handle($actor, $user);

            if ($assignment->position !== CareerPosition::CareerDirector) {
                throw ValidationException::withMessages([
                    'position' => 'La asignación no es de director de carrera.',
                ]);
            }

            $assignment->update([
                'ends_at' => $endsAt ?? now()->toDateString(),
            ]);

            $this->syncCareerDirectorRole($user);

            return $assignment->fresh();
        });
    }

    public function syncCareerDirectorRole(User $user): void
    {
        $hasActive = $user->activeCareerAssignments()
            ->where('position', CareerPosition::CareerDirector->value)
            ->exists();

        if ($hasActive) {
            if (! $user->hasRole(UserRoles::CAREER_DIRECTOR)) {
                $user->assignRole(UserRoles::CAREER_DIRECTOR);
            }

            return;
        }

        if ($user->hasRole(UserRoles::CAREER_DIRECTOR)) {
            $user->removeRole(UserRoles::CAREER_DIRECTOR);
        }
    }

    public function flashMessage(string $linkStatus): string
    {
        return $linkStatus === Password::RESET_LINK_SENT
            ? 'Usuario registrado. El enlace de activación se enviará en breve.'
            : 'Usuario registrado, pero no se pudo encolar el enlace de activación. Usa “Reenviar activación”.';
    }

    /**
     * @param  array<string, mixed>  $data
     */
    private function createProfileForType(User $user, UserType $userType, array $data, User $actor): void
    {
        match ($userType) {
            UserType::Student => $this->upsertStudentProfile($user, $data, createOnly: true),
            UserType::Teacher => $this->upsertTeacherProfile($user, $data, $actor, createOnly: true),
            UserType::Staff => $this->upsertStaffProfile($user, $data, createOnly: true),
        };
    }

    /**
     * @param  array<string, mixed>  $data
     */
    private function updateProfileForType(User $user, UserType $userType, array $data, User $actor): void
    {
        match ($userType) {
            UserType::Student => $this->upsertStudentProfile($user, $data, createOnly: false),
            UserType::Teacher => $this->upsertTeacherProfile($user, $data, $actor, createOnly: false),
            UserType::Staff => $this->upsertStaffProfile($user, $data, createOnly: false),
        };
    }

    /**
     * @param  array<string, mixed>  $data
     */
    private function upsertStudentProfile(User $user, array $data, bool $createOnly): void
    {
        if ($createOnly && $user->studentProfile()->exists()) {
            return;
        }

        $careerId = $this->resolveCareerId($data);

        $payload = [
            'student_number' => $data['student_number'] ?? null,
            'career_id' => $careerId,
            'education_level_id' => $data['education_level_id'] ?? null,
            'admission_year' => $data['admission_year'] ?? null,
            'generation' => $data['generation'] ?? null,
            'current_term' => $data['current_term'] ?? null,
            'group' => $data['group'] ?? null,
            'shift' => $data['shift'] ?? null,
            'academic_status' => $data['academic_status'] ?? AcademicStatus::Active->value,
            'admission_date' => $data['admission_date'] ?? null,
            'graduation_date' => $data['graduation_date'] ?? null,
            'curp' => $data['curp'] ?? null,
        ];

        StudentProfile::query()->updateOrCreate(
            ['user_id' => $user->id],
            $payload,
        );
    }

    /**
     * @param  array<string, mixed>  $data
     */
    private function upsertTeacherProfile(User $user, array $data, User $actor, bool $createOnly): void
    {
        if ($createOnly && $user->teacherProfile()->exists()) {
            return;
        }

        TeacherProfile::query()->updateOrCreate(
            ['user_id' => $user->id],
            [
                'employee_number' => $data['employee_number'] ?? null,
                'primary_career_id' => $data['primary_career_id'] ?? $this->resolveCareerId($data, required: false),
                'department' => $data['department'] ?? null,
                'academic_degree' => $data['academic_degree'] ?? null,
                'specialty' => $data['specialty'] ?? null,
                'contract_type' => $data['contract_type'] ?? null,
                'hired_at' => $data['hired_at'] ?? null,
                'office' => $data['office'] ?? null,
                'public_bio' => $data['public_bio'] ?? null,
                'research_lines' => $data['research_lines'] ?? null,
                'orcid' => $data['orcid'] ?? null,
                'can_be_advisor' => (bool) ($data['can_be_advisor'] ?? true),
            ],
        );

        $this->syncTeacherCareerAssignments($user, $data, $actor);
    }

    /**
     * @param  array<string, mixed>  $data
     */
    private function upsertStaffProfile(User $user, array $data, bool $createOnly): void
    {
        if ($createOnly && $user->staffProfile()->exists()) {
            return;
        }

        StaffProfile::query()->updateOrCreate(
            ['user_id' => $user->id],
            [
                'employee_number' => $data['employee_number'] ?? null,
                'job_title' => $data['job_title'] ?? 'Personal',
                'department' => $data['department'] ?? null,
                'hired_at' => $data['hired_at'] ?? null,
                'office' => $data['office'] ?? null,
            ],
        );
    }

    /**
     * @param  array<string, mixed>  $data
     */
    private function syncTeacherCareerAssignments(User $user, array $data, User $actor): void
    {
        /** @var list<array{career_id: int|string, position?: string, starts_at?: string, ends_at?: string|null}> $careers */
        $careers = array_values(array_filter(
            (array) ($data['careers'] ?? []),
            fn ($row): bool => is_array($row) && isset($row['career_id']),
        ));

        if ($careers === []) {
            $careerId = $this->resolveCareerId($data, required: false);
            if ($careerId === null) {
                return;
            }

            $careers = [[
                'career_id' => $careerId,
                'position' => CareerPosition::Teacher->value,
                'starts_at' => now()->toDateString(),
            ]];
        }

        foreach ($careers as $row) {
            $careerId = (int) $row['career_id'];
            $position = CareerPosition::from((string) ($row['position'] ?? CareerPosition::Teacher->value));
            $startsAt = (string) ($row['starts_at'] ?? now()->toDateString());
            $endsAt = $row['ends_at'] ?? null;

            if ($position === CareerPosition::CareerDirector) {
                $this->assertSingleActiveCareerDirector($careerId, $user->id);
            }

            $existing = CareerAssignment::query()
                ->where('user_id', $user->id)
                ->where('career_id', $careerId)
                ->where('position', $position->value)
                ->active()
                ->first();

            if ($existing) {
                if ($endsAt !== null) {
                    $existing->update(['ends_at' => $endsAt]);
                }

                continue;
            }

            CareerAssignment::query()->create([
                'user_id' => $user->id,
                'career_id' => $careerId,
                'position' => $position,
                'starts_at' => $startsAt,
                'ends_at' => $endsAt,
                'created_by' => $actor->id,
            ]);
        }

        $this->syncCareerDirectorRole($user->fresh());
    }

    /**
     * @param  array<string, mixed>  $data
     */
    private function resolveCareerId(array $data, bool $required = true): ?int
    {
        if (isset($data['career_id'])) {
            return (int) $data['career_id'];
        }

        if (isset($data['career']) && is_string($data['career']) && $data['career'] !== '') {
            $id = Career::query()->where('code', $data['career'])->value('id');

            if ($id !== null) {
                return (int) $id;
            }
        }

        if ($required) {
            throw ValidationException::withMessages([
                'career_id' => 'La carrera es obligatoria.',
            ]);
        }

        return null;
    }

    private function resolveUserType(User $user): UserType
    {
        if ($user->user_type instanceof UserType) {
            $role = (string) ($user->getRoleNames()->first() ?? '');
            if (
                $user->user_type === UserType::Staff
                && UserRoles::requiresCareer($role)
            ) {
                return match ($role) {
                    UserRoles::STUDENT => UserType::Student,
                    UserRoles::TEACHER, UserRoles::CAREER_DIRECTOR => UserType::Teacher,
                    default => UserType::Staff,
                };
            }

            return $user->user_type;
        }

        $role = (string) ($user->getRoleNames()->first() ?? '');

        return match ($role) {
            UserRoles::STUDENT => UserType::Student,
            UserRoles::TEACHER, UserRoles::CAREER_DIRECTOR => UserType::Teacher,
            default => UserType::Staff,
        };
    }

    /**
     * @param  mixed  $roles
     * @return list<string>
     */
    private function normalizeRoles(mixed $roles): array
    {
        if (is_string($roles) && $roles !== '') {
            return [$roles];
        }

        if (! is_array($roles)) {
            return [];
        }

        return array_values(array_filter(
            array_map(fn ($role): string => is_string($role) ? $role : '', $roles),
            fn (string $role): bool => $role !== '',
        ));
    }

    /**
     * @param  list<string>  $roles
     */
    private function assertActorCanAssignRoles(User $actor, array $roles): void
    {
        foreach ($roles as $role) {
            if (! $actor->can(UserRoles::assignPermissionName($role))) {
                throw ValidationException::withMessages([
                    'roles' => 'No tienes permiso para asignar ese rol.',
                ]);
            }
        }
    }

    /**
     * @param  list<string>  $roles
     */
    private function assertRolesCompatibleWithType(UserType $userType, array $roles): void
    {
        foreach ($roles as $role) {
            if (! UserRoles::isSystem($role)) {
                continue;
            }

            $allowed = match ($role) {
                UserRoles::STUDENT => $userType === UserType::Student,
                UserRoles::TEACHER, UserRoles::CAREER_DIRECTOR => $userType === UserType::Teacher,
                UserRoles::ADMIN, UserRoles::DIRECTOR => $userType === UserType::Staff,
                default => true,
            };

            if (! $allowed) {
                throw ValidationException::withMessages([
                    'roles' => "El rol {$role} no es compatible con el tipo de usuario.",
                ]);
            }
        }
    }

    /**
     * @param  array<string, mixed>  $data
     */
    private function assertActorCareerScopeForCreate(User $actor, UserType $userType, array $data): void
    {
        if (! UserRoles::isCareerScoped($actor)) {
            return;
        }

        $managed = $actor->managedCareerIds();

        $careerId = $this->resolveCareerId($data, required: $userType !== UserType::Staff);

        if ($careerId !== null && $managed->isNotEmpty() && ! $managed->contains($careerId)) {
            throw ValidationException::withMessages([
                'career_id' => 'No puedes asignar una carrera fuera de tu alcance.',
            ]);
        }
    }

    private function assertSingleActiveCareerDirector(int $careerId, ?int $exceptUserId = null): void
    {
        $query = CareerAssignment::query()
            ->active()
            ->where('career_id', $careerId)
            ->where('position', CareerPosition::CareerDirector->value);

        if ($exceptUserId !== null) {
            $query->where('user_id', '!=', $exceptUserId);
        }

        if ($query->exists()) {
            throw ValidationException::withMessages([
                'career_id' => 'Ya existe un director de carrera activo para esta carrera.',
            ]);
        }
    }
}
