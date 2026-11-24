<?php

namespace App\Http\Controllers;

use App\Enums\AdvisorRole;
use App\Http\Requests\ApplyAdvisorDistributionRequest;
use App\Http\Requests\AssignRepositoryAdvisorRequest;
use App\Models\ProjectPeriod;
use App\Models\Repository;
use App\Models\RepositoryAdvisor;
use App\Models\User;
use App\Services\Advisors\AdvisorAssignmentService;
use App\Services\Advisors\AdvisorDistributionService;
use App\Support\Permissions;
use Illuminate\Http\RedirectResponse;
use Illuminate\Routing\Controllers\HasMiddleware;
use Illuminate\Routing\Controllers\Middleware;

class RepositoryAdvisorController extends Controller implements HasMiddleware
{
    public static function middleware(): array
    {
        return [
            'auth',
            new Middleware(Permissions::ability(Permissions::ADVISORS_ASSIGN), only: ['assign', 'reassign', 'release']),
            new Middleware(Permissions::ability(Permissions::ADVISORS_DISTRIBUTE), only: ['applyDistribution']),
        ];
    }

    public function assign(
        AssignRepositoryAdvisorRequest $request,
        Repository $repository,
        AdvisorAssignmentService $assignmentService,
    ): RedirectResponse {
        $advisor = User::query()->findOrFail((int) $request->validated('advisor_id'));
        $role = $request->enum('role', AdvisorRole::class) ?? AdvisorRole::Primary;

        $assignmentService->assign(
            $repository,
            $advisor,
            $request->user(),
            $request->validated('override_reason'),
            $role,
        );

        $status = $role === AdvisorRole::CoAdvisor
            ? 'Co-asesor academico asignado.'
            : 'Asesor academico asignado.';

        return back()->with('status', $status);
    }

    public function reassign(
        AssignRepositoryAdvisorRequest $request,
        Repository $repository,
        AdvisorAssignmentService $assignmentService,
    ): RedirectResponse {
        $advisor = User::query()->findOrFail((int) $request->validated('advisor_id'));

        $assignmentService->reassign(
            $repository,
            $advisor,
            $request->user(),
            $request->validated('override_reason'),
        );

        return back()->with('status', 'Asesor academico reasignado.');
    }

    public function release(
        Repository $repository,
        RepositoryAdvisor $repositoryAdvisor,
        AdvisorAssignmentService $assignmentService,
    ): RedirectResponse {
        abort_unless($repositoryAdvisor->repository_id === $repository->id, 404);

        $assignmentService->release($repositoryAdvisor, request()->user());

        return back()->with('status', 'Asesor academico liberado.');
    }

    public function applyDistribution(
        ApplyAdvisorDistributionRequest $request,
        ProjectPeriod $projectPeriod,
        AdvisorDistributionService $distributionService,
    ): RedirectResponse {
        $result = $distributionService->apply(
            collect($request->validated('assignments')),
            $request->user(),
        );

        $applied = count($result['applied']);
        $failed = count($result['failed']);

        return back()->with([
            'status' => sprintf('Reparto aplicado: %d ok, %d fallaron.', $applied, $failed),
            'distribution_failures' => $result['failed'],
        ]);
    }
}
