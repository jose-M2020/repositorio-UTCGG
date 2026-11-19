<?php

namespace Database\Seeders;

use App\Enums\CareerPosition;
use App\Enums\UserType;
use App\Models\Career;
use App\Models\CareerAssignment;
use App\Models\StaffProfile;
use App\Models\StudentProfile;
use App\Models\TeacherProfile;
use App\Models\User;
use App\Support\UserRoles;
use Illuminate\Database\Seeder;

class UserProfileBackfillSeeder extends Seeder
{
    public function run(): void
    {
        User::query()->with('roles')->orderBy('id')->each(function (User $user): void {
            $roleNames = $user->getRoleNames()->map(fn ($name): string => (string) $name)->all();
            $userType = $this->resolveUserType($roleNames);

            if ($user->user_type !== $userType) {
                $user->forceFill(['user_type' => $userType])->save();
            }

            match ($userType) {
                UserType::Academic => $this->backfillStudent($user),
                UserType::Workforce => $this->backfillTeacher($user, $roleNames),
                UserType::Staff => $this->backfillStaff($user, $roleNames),
            };
        });
    }

    /**
     * @param  list<string>  $roleNames
     */
    private function resolveUserType(array $roleNames): UserType
    {
        if (in_array(UserRoles::STUDENT, $roleNames, true)) {
            return UserType::Academic;
        }

        if (
            in_array(UserRoles::TEACHER, $roleNames, true)
            || in_array(UserRoles::CAREER_DIRECTOR, $roleNames, true)
        ) {
            return UserType::Workforce;
        }

        return UserType::Staff;
    }

    private function backfillStudent(User $user): void
    {
        if ($user->studentProfile()->exists()) {
            return;
        }

        $careerId = Career::query()->inRandomOrder()->value('id');

        if ($careerId === null) {
            return;
        }

        StudentProfile::query()->create([
            'user_id' => $user->id,
            'career_id' => $careerId,
            'academic_status' => 'active',
        ]);
    }

    /**
     * @param  list<string>  $roleNames
     */
    private function backfillTeacher(User $user, array $roleNames): void
    {
        $careerId = $user->teacherProfile?->primary_career_id
            ?? CareerAssignment::query()
                ->where('user_id', $user->id)
                ->active()
                ->value('career_id')
            ?? Career::query()->inRandomOrder()->value('id');

        if (! $user->teacherProfile()->exists()) {
            TeacherProfile::query()->create([
                'user_id' => $user->id,
                'primary_career_id' => $careerId,
                'can_be_advisor' => true,
            ]);
        }

        if ($careerId === null) {
            return;
        }

        $startsAt = $user->created_at?->toDateString() ?? now()->toDateString();

        CareerAssignment::query()->firstOrCreate(
            [
                'user_id' => $user->id,
                'career_id' => $careerId,
                'position' => CareerPosition::Teacher->value,
                'ends_at' => null,
            ],
            [
                'starts_at' => $startsAt,
            ],
        );

        if (in_array(UserRoles::CAREER_DIRECTOR, $roleNames, true)) {
            CareerAssignment::query()->firstOrCreate(
                [
                    'user_id' => $user->id,
                    'career_id' => $careerId,
                    'position' => CareerPosition::CareerDirector->value,
                    'ends_at' => null,
                ],
                [
                    'starts_at' => $startsAt,
                ],
            );
        }
    }

    /**
     * @param  list<string>  $roleNames
     */
    private function backfillStaff(User $user, array $roleNames): void
    {
        if ($user->staffProfile()->exists()) {
            return;
        }

        StaffProfile::query()->create([
            'user_id' => $user->id,
            'job_title' => UserRoles::label($roleNames[0] ?? UserRoles::ADMIN),
        ]);
    }
}