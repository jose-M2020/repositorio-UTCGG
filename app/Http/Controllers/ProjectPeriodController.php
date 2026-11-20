<?php

namespace App\Http\Controllers;

use App\Enums\ParticipantStatus;
use App\Enums\ProjectPeriodStatus;
use App\Http\Requests\StoreProjectPeriodRequest;
use App\Http\Requests\UpdateProjectPeriodRequest;
use App\Models\Career;
use App\Models\ProjectPeriod;
use App\Models\ProjectType;
use App\Services\Advisors\AdvisorDistributionService;
use App\Services\Advisors\EligibleAdvisorsQuery;
use App\Services\Advisors\PeriodCoverageService;
use App\Support\Permissions;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Routing\Controllers\HasMiddleware;
use Illuminate\Routing\Controllers\Middleware;
use Illuminate\Validation\ValidationException;
use Inertia\Inertia;
use Inertia\Response;

class ProjectPeriodController extends Controller implements HasMiddleware
{
    public static function middleware(): array
    {
        return [
            'auth',
            new Middleware(Permissions::ability(Permissions::PROJECT_PERIODS_INDEX), only: ['index', 'show']),
            new Middleware(Permissions::ability(Permissions::PROJECT_PERIODS_CREATE), only: ['store']),
            new Middleware(Permissions::ability(Permissions::PROJECT_PERIODS_EDIT), only: ['update', 'open', 'close']),
            new Middleware(Permissions::ability(Permissions::PROJECT_PERIODS_DESTROY), only: ['destroy']),
            new Middleware(Permissions::ability(Permissions::ADVISORS_DISTRIBUTE), only: ['proposeDistribution']),
        ];
    }

    public function index(): Response
    {
        $periods = ProjectPeriod::query()
            ->with('projectType:id,code,name')
            ->latest('starts_at')
            ->paginate(12)
            ->through(fn (ProjectPeriod $period): array => $this->serializePeriod($period));

        $projectTypes = ProjectType::query()
            ->active()
            ->where('requires_academic_advisor', true)
            ->ordered()
            ->get(['id', 'code', 'name'])
            ->map(fn (ProjectType $type): array => [
                'id' => $type->id,
                'code' => $type->code,
                'name' => $type->name,
            ])
            ->values()
            ->all();

        return Inertia::render('panel/project-periods/index', [
            'periods' => $periods,
            'projectTypes' => $projectTypes,
            'defaultAdvisorCapacity' => (int) config('projects.default_advisor_capacity'),
        ]);
    }

    public function show(
        ProjectPeriod $projectPeriod,
        PeriodCoverageService $coverageService,
        EligibleAdvisorsQuery $eligibleAdvisorsQuery,
    ): Response {
        $projectPeriod->load(['projectType:id,code,name,is_team_project,requires_academic_advisor']);

        $participants = $projectPeriod->participants()
            ->with(['user:id,first_name,last_name,second_last_name,email', 'career:id,code,name'])
            ->where('status', ParticipantStatus::Enrolled->value)
            ->latest()
            ->get()
            ->map(fn ($participant): array => [
                'id' => $participant->id,
                'user_id' => $participant->user_id,
                'name' => $participant->user?->fullName() ?? '—',
                'email' => $participant->user?->email,
                'career' => $participant->career?->name,
                'status' => $participant->status->value,
            ])
            ->values()
            ->all();

        $capacities = $projectPeriod->capacities()
            ->with('user:id,first_name,last_name,second_last_name,email')
            ->get()
            ->map(fn ($capacity): array => [
                'id' => $capacity->id,
                'user_id' => $capacity->user_id,
                'name' => $capacity->user?->fullName() ?? '—',
                'max_projects' => $capacity->max_projects,
                'is_available' => $capacity->is_available,
                'notes' => $capacity->notes,
            ])
            ->values()
            ->all();

        $eligible = $eligibleAdvisorsQuery
            ->forPeriod($projectPeriod, null, requireCapacity: false)
            ->map(fn (array $row): array => [
                'user_id' => (int) $row['user']->id,
                'name' => $row['user']->fullName(),
                'load' => $row['load'],
                'capacity' => $row['capacity'],
                'ratio' => $row['ratio'],
                'career_ids' => $row['career_ids'],
            ])
            ->values()
            ->all();

        $careers = Career::query()
            ->active()
            ->ordered()
            ->get(['id', 'code', 'name'])
            ->map(fn (Career $career): array => [
                'id' => $career->id,
                'code' => $career->code,
                'name' => $career->name,
            ])
            ->values()
            ->all();

        return Inertia::render('panel/project-periods/show', [
            'period' => $this->serializePeriod($projectPeriod, detailed: true),
            'participants' => $participants,
            'capacities' => $capacities,
            'eligibleAdvisors' => $eligible,
            'coverage' => $coverageService->summarize($projectPeriod),
            'careers' => $careers,
            'defaultAdvisorCapacity' => (int) config('projects.default_advisor_capacity'),
        ]);
    }

    public function store(StoreProjectPeriodRequest $request): RedirectResponse
    {
        $validated = $request->validated();

        $period = ProjectPeriod::query()->create([
            'project_type_id' => (int) $validated['project_type_id'],
            'name' => trim((string) $validated['name']),
            'starts_at' => $validated['starts_at'],
            'ends_at' => $validated['ends_at'],
            'status' => ProjectPeriodStatus::Draft->value,
            'advisor_default_capacity' => $validated['advisor_default_capacity'] ?? null,
            'created_by' => $request->user()?->id,
        ]);

        return redirect()
            ->route('project_periods.show', $period)
            ->with('status', 'Periodo creado exitosamente.');
    }

    public function update(UpdateProjectPeriodRequest $request, ProjectPeriod $projectPeriod): RedirectResponse
    {
        $validated = $request->validated();

        $projectPeriod->update([
            'name' => trim((string) $validated['name']),
            'starts_at' => $validated['starts_at'],
            'ends_at' => $validated['ends_at'],
            'advisor_default_capacity' => $validated['advisor_default_capacity'] ?? null,
        ]);

        return redirect()
            ->route('project_periods.show', $projectPeriod)
            ->with('status', 'Periodo actualizado exitosamente.');
    }

    public function open(ProjectPeriod $projectPeriod): RedirectResponse
    {
        if ($projectPeriod->participants()->where('status', ParticipantStatus::Enrolled->value)->doesntExist()) {
            throw ValidationException::withMessages([
                'status' => 'Debes inscribir al menos un alumno antes de abrir el periodo.',
            ]);
        }

        $projectPeriod->update(['status' => ProjectPeriodStatus::Open->value]);

        return back()->with('status', 'Periodo abierto.');
    }

    public function close(ProjectPeriod $projectPeriod): RedirectResponse
    {
        $projectPeriod->update(['status' => ProjectPeriodStatus::Closed->value]);

        return back()->with('status', 'Periodo cerrado.');
    }

    public function destroy(ProjectPeriod $projectPeriod): RedirectResponse
    {
        if ($projectPeriod->repositories()->exists() || $projectPeriod->advisorAssignments()->exists()) {
            return redirect()
                ->route('project_periods.index')
                ->with('error', 'No se puede eliminar un periodo con repositorios o asignaciones.');
        }

        $projectPeriod->delete();

        return redirect()
            ->route('project_periods.index')
            ->with('status', 'Periodo eliminado.');
    }

    public function proposeDistribution(
        Request $request,
        ProjectPeriod $projectPeriod,
        AdvisorDistributionService $distributionService,
    ): RedirectResponse {
        $careerIds = array_values(array_filter(array_map(
            'intval',
            (array) $request->input('career_ids', []),
        )));

        $proposal = $distributionService->propose(
            $projectPeriod,
            $request->user(),
            $careerIds !== [] ? $careerIds : null,
        );

        return back()->with([
            'status' => 'Propuesta de reparto generada.',
            'distribution_proposal' => $proposal->all(),
        ]);
    }

    /**
     * @return array<string, mixed>
     */
    private function serializePeriod(ProjectPeriod $period, bool $detailed = false): array
    {
        $data = [
            'id' => $period->id,
            'name' => $period->name,
            'project_type_id' => $period->project_type_id,
            'project_type' => $period->projectType?->name,
            'project_type_code' => $period->projectType?->code,
            'starts_at' => $period->starts_at?->toDateString(),
            'ends_at' => $period->ends_at?->toDateString(),
            'status' => $period->status->value,
            'status_label' => $period->status->label(),
            'advisor_default_capacity' => $period->advisor_default_capacity,
            'effective_default_capacity' => $period->defaultAdvisorCapacity(),
        ];

        if ($detailed) {
            $data['is_team_project'] = (bool) $period->projectType?->is_team_project;
            $data['participants_count'] = $period->participants()
                ->where('status', ParticipantStatus::Enrolled->value)
                ->count();
            $data['repositories_count'] = $period->repositories()->count();
        }

        return $data;
    }
}
