<?php

namespace Tests\Feature\Advisors;

use App\Enums\ProjectPeriodStatus;
use App\Models\AdvisorPeriodCapacity;
use App\Models\ProjectPeriod;
use App\Models\ProjectType;
use App\Models\Repository;
use App\Models\RepositoryAdvisor;
use App\Models\User;
use App\Services\Advisors\AdvisorCapacityResolver;
use App\Services\Advisors\EligibleAdvisorsQuery;
use Database\Seeders\PermissionsSeeder;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class AdvisorCapacityAndEligibilityTest extends TestCase
{
    use RefreshDatabase;

    protected function setUp(): void
    {
        parent::setUp();

        $this->seedDomainLookups();
        $this->seed(PermissionsSeeder::class);
    }

    public function test_effective_capacity_prefers_override_then_period_then_config(): void
    {
        config(['projects.default_advisor_capacity' => 5]);

        $period = $this->makePeriod(['advisor_default_capacity' => 7]);
        $resolver = app(AdvisorCapacityResolver::class);

        $this->assertSame(7, $resolver->effectiveCapacity($period, null));

        $capacity = AdvisorPeriodCapacity::factory()->create([
            'project_period_id' => $period->id,
            'max_projects' => 3,
            'is_available' => true,
        ]);

        $this->assertSame(3, $resolver->effectiveCapacity($period, $capacity));

        $capacity->update(['is_available' => false]);
        $this->assertSame(0, $resolver->effectiveCapacity($period, $capacity->fresh()));
    }

    public function test_eligibility_excludes_unavailable_filled_or_without_career_overlap(): void
    {
        $period = $this->makePeriod([
            'status' => ProjectPeriodStatus::Open->value,
            'advisor_default_capacity' => 1,
        ]);

        $eligible = User::factory()->teacher()->create();
        $this->seedTeacherCareer($eligible, 'TIC');

        $unavailable = User::factory()->teacher()->create();
        $this->seedTeacherCareer($unavailable, 'TIC');
        AdvisorPeriodCapacity::factory()->create([
            'project_period_id' => $period->id,
            'user_id' => $unavailable->id,
            'is_available' => false,
        ]);

        $otherCareer = User::factory()->teacher()->create();
        $this->seedTeacherCareer($otherCareer, 'MM');

        $full = User::factory()->teacher()->create();
        $this->seedTeacherCareer($full, 'TIC');
        $repo = $this->makeRepository($period, 'TIC');
        RepositoryAdvisor::factory()->create([
            'repository_id' => $repo->id,
            'user_id' => $full->id,
            'project_period_id' => $period->id,
            'released_at' => null,
        ]);

        $cannotAdvise = User::factory()->teacher()->create();
        $this->seedTeacherCareer($cannotAdvise, 'TIC');
        $cannotAdvise->teacherProfile()->update(['can_be_advisor' => false]);

        $repository = $this->makeRepository($period, 'TIC');
        $rows = app(EligibleAdvisorsQuery::class)->forRepository($repository);

        $ids = $rows->map(fn (array $row): int => (int) $row['user']->id)->all();

        $this->assertContains($eligible->id, $ids);
        $this->assertNotContains($unavailable->id, $ids);
        $this->assertNotContains($otherCareer->id, $ids);
        $this->assertNotContains($full->id, $ids);
        $this->assertNotContains($cannotAdvise->id, $ids);
    }

    public function test_capacity_is_global_across_careers_in_same_period(): void
    {
        $period = $this->makePeriod([
            'status' => ProjectPeriodStatus::Open->value,
            'advisor_default_capacity' => 4,
        ]);

        $advisor = User::factory()->teacher()->create();
        $this->seedTeacherCareer($advisor, 'TIC');
        $this->seedTeacherCareer($advisor, 'MM');

        foreach (range(1, 4) as $i) {
            $repo = $this->makeRepository($period, $i <= 2 ? 'TIC' : 'MM');
            RepositoryAdvisor::factory()->create([
                'repository_id' => $repo->id,
                'user_id' => $advisor->id,
                'project_period_id' => $period->id,
            ]);
        }

        $pending = $this->makeRepository($period, 'TIC');
        $rows = app(EligibleAdvisorsQuery::class)->forRepository($pending, requireCapacity: true);

        $this->assertFalse(
            $rows->contains(fn (array $row): bool => (int) $row['user']->id === (int) $advisor->id),
        );
    }

    public function test_load_does_not_mix_periods(): void
    {
        $type = ProjectType::query()->where('code', 'internship')->firstOrFail();
        $periodA = $this->makePeriod([
            'project_type_id' => $type->id,
            'status' => ProjectPeriodStatus::Open->value,
            'name' => 'Period A',
        ]);
        $periodB = $this->makePeriod([
            'project_type_id' => $type->id,
            'status' => ProjectPeriodStatus::Open->value,
            'name' => 'Period B',
        ]);

        $advisor = User::factory()->teacher()->create();
        $this->seedTeacherCareer($advisor, 'TIC');

        $repoA = $this->makeRepository($periodA, 'TIC');
        RepositoryAdvisor::factory()->create([
            'repository_id' => $repoA->id,
            'user_id' => $advisor->id,
            'project_period_id' => $periodA->id,
        ]);

        $resolver = app(AdvisorCapacityResolver::class);
        $this->assertSame(1, $resolver->currentLoad($advisor->id, $periodA->id));
        $this->assertSame(0, $resolver->currentLoad($advisor->id, $periodB->id));
    }

    /**
     * @param  array<string, mixed>  $overrides
     */
    private function makePeriod(array $overrides = []): ProjectPeriod
    {
        $type = ProjectType::query()->where('code', 'internship')->firstOrFail();

        return ProjectPeriod::factory()->create([
            'project_type_id' => $type->id,
            'status' => ProjectPeriodStatus::Draft->value,
            ...$overrides,
        ]);
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
