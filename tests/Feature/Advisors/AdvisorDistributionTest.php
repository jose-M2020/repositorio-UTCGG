<?php

namespace Tests\Feature\Advisors;

use App\Enums\ParticipantStatus;
use App\Enums\ProjectPeriodStatus;
use App\Models\AdvisorPeriodCapacity;
use App\Models\ProjectPeriod;
use App\Models\ProjectPeriodParticipant;
use App\Models\ProjectType;
use App\Models\Repository;
use App\Models\RepositoryAdvisor;
use App\Models\User;
use App\Services\Advisors\AdvisorCapacityResolver;
use App\Services\Advisors\AdvisorDistributionService;
use Database\Seeders\PermissionsSeeder;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class AdvisorDistributionTest extends TestCase
{
    use RefreshDatabase;

    protected function setUp(): void
    {
        parent::setUp();

        $this->seedDomainLookups();
        $this->seed(PermissionsSeeder::class);
    }

    public function test_propose_does_not_write_assignments(): void
    {
        [$period, $actor] = $this->setupSimplePeriod(repositories: 3, advisors: 2, capacity: 5);

        $before = RepositoryAdvisor::query()->count();
        $proposal = app(AdvisorDistributionService::class)->propose($period, $actor);
        $after = RepositoryAdvisor::query()->count();

        $this->assertSame($before, $after);
        $this->assertCount(3, $proposal);
        $this->assertTrue($proposal->every(fn (array $row): bool => $row['advisor_id'] !== null));
    }

    public function test_distribution_is_proportional_to_capacity(): void
    {
        $period = $this->makeOpenPeriod(capacity: 8);
        $actor = User::factory()->staff()->create();
        $actor->assignRole('director');

        $high = User::factory()->teacher()->create();
        $this->seedTeacherCareer($high, 'TIC');
        AdvisorPeriodCapacity::factory()->create([
            'project_period_id' => $period->id,
            'user_id' => $high->id,
            'max_projects' => 8,
        ]);

        $low = User::factory()->teacher()->create();
        $this->seedTeacherCareer($low, 'TIC');
        AdvisorPeriodCapacity::factory()->create([
            'project_period_id' => $period->id,
            'user_id' => $low->id,
            'max_projects' => 4,
        ]);

        foreach (range(1, 12) as $i) {
            $this->makeRepository($period, 'TIC');
        }

        $service = app(AdvisorDistributionService::class);
        $proposal = $service->propose($period, $actor);
        $result = $service->apply($proposal, $actor);

        $this->assertCount(12, $result['applied']);
        $this->assertSame([], $result['failed']);

        $resolver = app(AdvisorCapacityResolver::class);
        $this->assertSame(8, $resolver->currentLoad($high->id, $period->id));
        $this->assertSame(4, $resolver->currentLoad($low->id, $period->id));
    }

    public function test_example_eight_five_distribution_bounds(): void
    {
        $period = $this->makeOpenPeriod(capacity: 6);
        $actor = User::factory()->staff()->create();
        $actor->assignRole('director');

        $teachers = collect(range(1, 6))->map(function (int $index) use ($period): User {
            $teacher = User::factory()->teacher()->create();
            $careers = match (true) {
                $index <= 2 => ['TIC'],
                $index <= 4 => ['TIC', 'MM'],
                default => ['MM'],
            };

            foreach ($careers as $career) {
                $this->seedTeacherCareer($teacher, $career);
            }

            AdvisorPeriodCapacity::factory()->create([
                'project_period_id' => $period->id,
                'user_id' => $teacher->id,
                'max_projects' => 6,
            ]);

            return $teacher;
        });

        foreach (range(1, 20) as $i) {
            $this->makeRepository($period, 'TIC');
        }
        foreach (range(1, 12) as $i) {
            $this->makeRepository($period, 'MM');
        }

        $service = app(AdvisorDistributionService::class);
        $proposal = $service->propose($period, $actor);
        $result = $service->apply($proposal, $actor);

        $this->assertCount(32, $result['applied']);
        $this->assertSame([], $result['failed']);

        $resolver = app(AdvisorCapacityResolver::class);
        $loads = $teachers->map(
            fn (User $teacher): int => $resolver->currentLoad($teacher->id, $period->id),
        );

        $this->assertSame(32, $loads->sum());
        $this->assertTrue($loads->every(fn (int $load): bool => $load >= 5 && $load <= 6));
    }

    /**
     * @return array{0: ProjectPeriod, 1: User}
     */
    private function setupSimplePeriod(int $repositories, int $advisors, int $capacity): array
    {
        $period = $this->makeOpenPeriod(capacity: $capacity);
        $actor = User::factory()->staff()->create();
        $actor->assignRole('director');

        foreach (range(1, $advisors) as $i) {
            $teacher = User::factory()->teacher()->create();
            $this->seedTeacherCareer($teacher, 'TIC');
        }

        foreach (range(1, $repositories) as $i) {
            $this->makeRepository($period, 'TIC');
        }

        return [$period, $actor];
    }

    private function makeOpenPeriod(int $capacity): ProjectPeriod
    {
        $type = ProjectType::query()->where('code', 'internship')->firstOrFail();
        $period = ProjectPeriod::factory()->open()->create([
            'project_type_id' => $type->id,
            'advisor_default_capacity' => $capacity,
            'status' => ProjectPeriodStatus::Open->value,
        ]);

        $student = User::factory()->student()->create();
        $this->seedStudentCareer($student, 'TIC');
        ProjectPeriodParticipant::factory()->create([
            'project_period_id' => $period->id,
            'user_id' => $student->id,
            'career_id' => $this->careerId('TIC'),
            'status' => ParticipantStatus::Enrolled->value,
        ]);

        return $period;
    }

    private function makeRepository(ProjectPeriod $period, string $careerCode): Repository
    {
        return Repository::factory()->create([
            'project_period_id' => $period->id,
            'project_type_id' => $period->project_type_id,
            'career_id' => $this->careerId($careerCode),
        ]);
    }
}
