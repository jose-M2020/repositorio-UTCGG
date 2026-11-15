<?php

namespace Database\Factories;

use App\Enums\AcademicStatus;
use App\Models\Career;
use App\Models\StudentProfile;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<StudentProfile>
 */
class StudentProfileFactory extends Factory
{
    protected $model = StudentProfile::class;

    /**
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'user_id' => User::factory(),
            'student_number' => fake()->unique()->numerify('##########'),
            'career_id' => Career::factory(),
            'education_level_id' => null,
            'academic_status' => AcademicStatus::Active,
        ];
    }
}
