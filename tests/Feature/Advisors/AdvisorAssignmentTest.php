<?php

namespace Tests\Feature\Advisors;

use App\Enums\AdvisorRole;
use App\Enums\ParticipantStatus;
use App\Enums\ProjectPeriodStatus;
use App\Models\ProjectPeriod;
use App\Models\ProjectPeriodParticipant;
use App\Models\ProjectType;
use App\Models\Repository;
use App\Models\RepositoryAdvisor;
use App\Models\User;
use App\Services\Advisors\AdvisorAssignmentService;
use App\Services\Advisors\AdvisorCapacityResolver;
use Database\Seeders\PermissionsSeeder;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Validation\ValidationException;
use Symfony\Component\HttpKernel\Exception\HttpException;
use Tests\TestCase;

class AdvisorAssignmentTest extends TestCase
{
    use RefreshDatabase;

    protected function setUp(): void
    {
        parent::setUp();

        $this->seedDomainLookups();
        $this->seed(PermissionsSeeder::class);
    }

    public function test_assign_fails_at_capacity_without_override(): void
    {
        [$period, $repository, $advisor, $actor] = $this->setupAssignmentContext(capacity: 1);

        $existing = $this->makeRepository($period, 'TIC');
        app(AdvisorAssignmentService::class)->assign($existing, $advisor, $actor);

        $this->expectException(ValidationException::class);
        app(AdvisorAssignmentService::class)->assign($repository, $advisor, $actor);
    }

    public function test_override_requires_permission_and_reason(): void
    {
        [$period, $repository, $advisor, $actor] = $this->setupAssignmentContext(capacity: 1);
        $actor->givePermissionTo('advisors.override_capacity');

        $existing = $this->makeRepository($period, 'TIC');
        app(AdvisorAssignmentService::class)->assign($existing, $advisor, $actor);

        try {
            app(AdvisorAssignmentService::class)->assign($repository, $advisor, $actor, null);
            $this->fail('Expected validation exception without reason');
        } catch (ValidationException) {
            // expected
        }

        $assignment = app(AdvisorAssignmentService::class)->assign(
            $repository,
            $advisor,
            $actor,
            'Carga excepcional aprobada',
        );

        $this->assertSame('Carga excepcional aprobada', $assignment->override_reason);
    }

    public function test_reassign_releases_previous_primary(): void
    {
        [$period, $repository, $advisor, $actor] = $this->setupAssignmentContext(capacity: 5);
        $replacement = User::factory()->teacher()->create();
        $this->seedTeacherCareer($replacement, 'TIC');

        $first = app(AdvisorAssignmentService::class)->assign($repository, $advisor, $actor);
        $second = app(AdvisorAssignmentService::class)->reassign($repository, $replacement, $actor);

        $this->assertNotNull($first->fresh()->released_at);
        $this->assertNull($second->released_at);
        $this->assertSame($replacement->id, $second->user_id);
        $this->assertSame(
            1,
            RepositoryAdvisor::query()
                ->where('repository_id', $repository->id)
                ->where('role', AdvisorRole::Primary->value)
                ->whereNull('released_at')
                ->count(),
        );
    }

    public function test_closed_period_rejects_assignment(): void
    {
        [$period, $repository, $advisor, $actor] = $this->setupAssignmentContext(capacity: 5);
        $period->update(['status' => ProjectPeriodStatus::Closed->value]);

        $this->expectException(ValidationException::class);
        app(AdvisorAssignmentService::class)->assign($repository->fresh(), $advisor, $actor);
    }

    public function test_career_director_cannot_assign_outside_managed_careers(): void
    {
        $period = $this->makeOpenPeriod();
        $repository = $this->makeRepository($period, 'MM');
        $advisor = User::factory()->teacher()->create();
        $this->seedTeacherCareer($advisor, 'MM');

        $director = User::factory()->teacher()->create();
        $director->assignRole('career_director');
        $this->seedCareerDirector($director, 'TIC');

        $this->expectException(HttpException::class);
        app(AdvisorAssignmentService::class)->assign($repository, $advisor, $director);
    }

    public function test_legacy_repository_without_period_is_rejected_for_assignment(): void
    {
        $actor = User::factory()->staff()->create();
        $actor->assignRole('director');

        $advisor = User::factory()->teacher()->create();
        $this->seedTeacherCareer($advisor, 'TIC');

        $repository = Repository::factory()->create([
            'project_period_id' => null,
            'career_id' => $this->careerId('TIC'),
        ]);

        $this->expectException(ValidationException::class);
        app(AdvisorAssignmentService::class)->assign($repository, $advisor, $actor);
    }

    public function test_co_advisor_requires_active_primary(): void
    {
        [, $repository, $advisor, $actor] = $this->setupAssignmentContext(capacity: 5);

        $this->expectException(ValidationException::class);
        app(AdvisorAssignmentService::class)->assign(
            $repository,
            $advisor,
            $actor,
            null,
            AdvisorRole::CoAdvisor,
        );
    }

    public function test_assign_co_advisor_when_primary_exists(): void
    {
        [, $repository, $advisor, $actor] = $this->setupAssignmentContext(capacity: 5);
        $coAdvisor = User::factory()->teacher()->create();
        $this->seedTeacherCareer($coAdvisor, 'TIC');

        app(AdvisorAssignmentService::class)->assign($repository, $advisor, $actor);

        $assignment = app(AdvisorAssignmentService::class)->assign(
            $repository,
            $coAdvisor,
            $actor,
            null,
            AdvisorRole::CoAdvisor,
        );

        $this->assertSame(AdvisorRole::CoAdvisor, $assignment->role);
        $this->assertNull($assignment->released_at);
        $this->assertSame($coAdvisor->id, $assignment->user_id);
        $this->assertSame($advisor->id, $repository->fresh()->activeAdvisor?->user_id);
    }

    public function test_rejects_duplicate_active_advisor_on_same_repository(): void
    {
        [, $repository, $advisor, $actor] = $this->setupAssignmentContext(capacity: 5);

        app(AdvisorAssignmentService::class)->assign($repository, $advisor, $actor);

        $this->expectException(ValidationException::class);
        app(AdvisorAssignmentService::class)->assign(
            $repository,
            $advisor,
            $actor,
            null,
            AdvisorRole::CoAdvisor,
        );
    }

    public function test_rejects_co_advisor_above_configured_maximum(): void
    {
        config(['projects.max_co_advisors' => 2]);

        [, $repository, $primary, $actor] = $this->setupAssignmentContext(capacity: 5);
        app(AdvisorAssignmentService::class)->assign($repository, $primary, $actor);

        $first = User::factory()->teacher()->create();
        $second = User::factory()->teacher()->create();
        $third = User::factory()->teacher()->create();
        $this->seedTeacherCareer($first, 'TIC');
        $this->seedTeacherCareer($second, 'TIC');
        $this->seedTeacherCareer($third, 'TIC');

        app(AdvisorAssignmentService::class)->assign($repository, $first, $actor, null, AdvisorRole::CoAdvisor);
        app(AdvisorAssignmentService::class)->assign($repository, $second, $actor, null, AdvisorRole::CoAdvisor);

        $this->expectException(ValidationException::class);
        app(AdvisorAssignmentService::class)->assign($repository, $third, $actor, null, AdvisorRole::CoAdvisor);
    }

    public function test_co_advisor_counts_toward_period_load(): void
    {
        [$period, $repository, $advisor, $actor] = $this->setupAssignmentContext(capacity: 5);
        $primary = User::factory()->teacher()->create();
        $this->seedTeacherCareer($primary, 'TIC');

        app(AdvisorAssignmentService::class)->assign($repository, $primary, $actor);
        app(AdvisorAssignmentService::class)->assign(
            $repository,
            $advisor,
            $actor,
            null,
            AdvisorRole::CoAdvisor,
        );

        $otherRepo = $this->makeRepository($period, 'TIC');
        app(AdvisorAssignmentService::class)->assign($otherRepo, $advisor, $actor);

        $this->assertSame(
            2,
            app(AdvisorCapacityResolver::class)->currentLoad($advisor->id, $period->id),
        );
    }

    public function test_reassign_primary_does_not_release_co_advisors(): void
    {
        [, $repository, $primary, $actor] = $this->setupAssignmentContext(capacity: 5);
        $coAdvisor = User::factory()->teacher()->create();
        $replacement = User::factory()->teacher()->create();
        $this->seedTeacherCareer($coAdvisor, 'TIC');
        $this->seedTeacherCareer($replacement, 'TIC');

        app(AdvisorAssignmentService::class)->assign($repository, $primary, $actor);
        $coAssignment = app(AdvisorAssignmentService::class)->assign(
            $repository,
            $coAdvisor,
            $actor,
            null,
            AdvisorRole::CoAdvisor,
        );

        app(AdvisorAssignmentService::class)->reassign($repository, $replacement, $actor);

        $this->assertNull($coAssignment->fresh()->released_at);
        $this->assertSame($replacement->id, $repository->fresh()->activeAdvisor?->user_id);
    }

    /**
     * @return array{0: ProjectPeriod, 1: Repository, 2: User, 3: User}
     */
    private function setupAssignmentContext(int $capacity): array
    {
        $period = $this->makeOpenPeriod(['advisor_default_capacity' => $capacity]);
        $repository = $this->makeRepository($period, 'TIC');

        $advisor = User::factory()->teacher()->create();
        $this->seedTeacherCareer($advisor, 'TIC');

        $actor = User::factory()->staff()->create();
        $actor->assignRole('director');

        return [$period, $repository, $advisor, $actor];
    }

    /**
     * @param  array<string, mixed>  $overrides
     */
    private function makeOpenPeriod(array $overrides = []): ProjectPeriod
    {
        $type = ProjectType::query()->where('code', 'internship')->firstOrFail();
        $period = ProjectPeriod::factory()->open()->create([
            'project_type_id' => $type->id,
            ...$overrides,
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
