<?php

namespace Database\Factories;

use App\Enums\ParticipantStatus;
use App\Models\Career;
use App\Models\ProjectPeriod;
use App\Models\ProjectPeriodParticipant;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<ProjectPeriodParticipant>
 */
class ProjectPeriodParticipantFactory extends Factory
{
    protected $model = ProjectPeriodParticipant::class;

    /**
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'project_period_id' => ProjectPeriod::factory(),
            'user_id' => User::factory()->student(),
            'career_id' => Career::factory(),
            'status' => ParticipantStatus::Enrolled->value,
        ];
    }
}
