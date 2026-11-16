<?php

namespace Tests;

use App\Enums\CareerPosition;
use App\Enums\UserType;
use App\Models\Career;
use App\Models\CareerAssignment;
use App\Models\StudentProfile;
use App\Models\TeacherProfile;
use App\Models\User;
use Database\Seeders\CareerSeeder;
use Database\Seeders\EducationLevelSeeder;
use Database\Seeders\ProjectTypeSeeder;
use Illuminate\Foundation\Testing\TestCase as BaseTestCase;

abstract class TestCase extends BaseTestCase
{
    protected function seedDomainLookups(): void
    {
        $this->seed([
            CareerSeeder::class,
            ProjectTypeSeeder::class,
            EducationLevelSeeder::class,
        ]);
    }

    protected function careerId(string $code): int
    {
        return (int) Career::query()->where('code', $code)->value('id');
    }

    protected function seedStudentCareer(User $user, string $code = 'TIC'): void
    {
        $user->forceFill(['user_type' => UserType::Student])->save();

        StudentProfile::query()->updateOrCreate(
            ['user_id' => $user->id],
            [
                'career_id' => $this->careerId($code),
                'academic_status' => 'active',
            ],
        );
    }

    protected function seedTeacherCareer(User $user, string $code = 'TIC'): void
    {
        $careerId = $this->careerId($code);
        $user->forceFill(['user_type' => UserType::Teacher])->save();

        TeacherProfile::query()->updateOrCreate(
            ['user_id' => $user->id],
            [
                'primary_career_id' => $careerId,
                'can_be_advisor' => true,
            ],
        );

        CareerAssignment::query()->firstOrCreate(
            [
                'user_id' => $user->id,
                'career_id' => $careerId,
                'position' => CareerPosition::Teacher->value,
                'ends_at' => null,
            ],
            [
                'starts_at' => now()->toDateString(),
            ],
        );
    }

    protected function seedCareerDirector(User $user, string $code = 'TIC'): void
    {
        $this->seedTeacherCareer($user, $code);

        $careerId = $this->careerId($code);

        CareerAssignment::query()->firstOrCreate(
            [
                'user_id' => $user->id,
                'career_id' => $careerId,
                'position' => CareerPosition::CareerDirector->value,
                'ends_at' => null,
            ],
            [
                'starts_at' => now()->toDateString(),
            ],
        );
    }
}