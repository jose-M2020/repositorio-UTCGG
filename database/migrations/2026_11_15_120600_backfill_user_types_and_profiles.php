<?php

use App\Enums\CareerPosition;
use App\Enums\UserType;
use App\Support\UserRoles;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        if (! Schema::hasColumn('users', 'user_type')) {
            return;
        }

        $users = DB::table('users')->orderBy('id')->get();

        foreach ($users as $user) {
            $roleNames = DB::table('model_has_roles')
                ->join('roles', 'roles.id', '=', 'model_has_roles.role_id')
                ->where('model_has_roles.model_type', 'App\\Models\\User')
                ->where('model_has_roles.model_id', $user->id)
                ->pluck('roles.name')
                ->map(fn ($name): string => (string) $name)
                ->all();

            $userType = $this->resolveUserType($roleNames);

            DB::table('users')->where('id', $user->id)->update([
                'user_type' => $userType,
            ]);

            match ($userType) {
                UserType::Student->value => $this->backfillStudent($user),
                UserType::Teacher->value => $this->backfillTeacher($user, $roleNames),
                default => $this->backfillStaff($user, $roleNames),
            };
        }

        // Users without a resolvable career for student/teacher still get a type;
        // leave profiles missing only when career_id is unavailable for students.
        if (Schema::getConnection()->getDriverName() !== 'sqlite') {
            Schema::table('users', function ($table): void {
                $table->string('user_type', 32)->nullable(false)->change();
            });
        } else {
            // SQLite: leave nullable in schema; application treats it as required after backfill.
        }
    }

    public function down(): void
    {
        DB::table('career_assignments')->delete();
        DB::table('student_profiles')->delete();
        DB::table('teacher_profiles')->delete();
        DB::table('staff_profiles')->delete();

        if (Schema::hasColumn('users', 'user_type')) {
            DB::table('users')->update(['user_type' => null]);
        }
    }

    /**
     * @param  list<string>  $roleNames
     */
    private function resolveUserType(array $roleNames): string
    {
        if (in_array(UserRoles::STUDENT, $roleNames, true)) {
            return UserType::Student->value;
        }

        if (
            in_array(UserRoles::TEACHER, $roleNames, true)
            || in_array(UserRoles::CAREER_DIRECTOR, $roleNames, true)
        ) {
            return UserType::Teacher->value;
        }

        return UserType::Staff->value;
    }

    private function backfillStudent(object $user): void
    {
        if (DB::table('student_profiles')->where('user_id', $user->id)->exists()) {
            return;
        }

        $careerId = $user->career_catalog_id;
        if ($careerId === null || ! DB::table('careers')->where('id', $careerId)->exists()) {
            return;
        }

        DB::table('student_profiles')->insert([
            'user_id' => $user->id,
            'student_number' => null,
            'career_id' => $careerId,
            'academic_status' => 'active',
            'created_at' => now(),
            'updated_at' => now(),
        ]);
    }

    /**
     * @param  list<string>  $roleNames
     */
    private function backfillTeacher(object $user, array $roleNames): void
    {
        if (! DB::table('teacher_profiles')->where('user_id', $user->id)->exists()) {
            DB::table('teacher_profiles')->insert([
                'user_id' => $user->id,
                'employee_number' => null,
                'primary_career_id' => $this->validCareerId($user->career_catalog_id),
                'can_be_advisor' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }

        $careerId = $this->validCareerId($user->career_catalog_id);
        if ($careerId === null) {
            return;
        }

        $startsAt = $user->created_at
            ? substr((string) $user->created_at, 0, 10)
            : now()->toDateString();

        if (! $this->hasAssignment($user->id, $careerId, CareerPosition::Teacher->value)) {
            DB::table('career_assignments')->insert([
                'user_id' => $user->id,
                'career_id' => $careerId,
                'position' => CareerPosition::Teacher->value,
                'starts_at' => $startsAt,
                'ends_at' => null,
                'created_by' => null,
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }

        if (
            in_array(UserRoles::CAREER_DIRECTOR, $roleNames, true)
            && ! $this->hasAssignment($user->id, $careerId, CareerPosition::CareerDirector->value)
        ) {
            DB::table('career_assignments')->insert([
                'user_id' => $user->id,
                'career_id' => $careerId,
                'position' => CareerPosition::CareerDirector->value,
                'starts_at' => $startsAt,
                'ends_at' => null,
                'created_by' => null,
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }
    }

    /**
     * @param  list<string>  $roleNames
     */
    private function backfillStaff(object $user, array $roleNames): void
    {
        if (DB::table('staff_profiles')->where('user_id', $user->id)->exists()) {
            return;
        }

        $primaryRole = $roleNames[0] ?? UserRoles::ADMIN;
        $jobTitle = UserRoles::label($primaryRole);

        DB::table('staff_profiles')->insert([
            'user_id' => $user->id,
            'employee_number' => null,
            'job_title' => $jobTitle,
            'created_at' => now(),
            'updated_at' => now(),
        ]);
    }

    private function validCareerId(mixed $careerId): ?int
    {
        if ($careerId === null) {
            return null;
        }

        $id = (int) $careerId;

        return DB::table('careers')->where('id', $id)->exists() ? $id : null;
    }

    private function hasAssignment(int $userId, int $careerId, string $position): bool
    {
        return DB::table('career_assignments')
            ->where('user_id', $userId)
            ->where('career_id', $careerId)
            ->where('position', $position)
            ->whereNull('ends_at')
            ->exists();
    }
};
