<?php

namespace App\Http\Controllers;

use App\Http\Requests\EnrollPeriodParticipantsRequest;
use App\Http\Requests\PreviewPeriodParticipantsRequest;
use App\Models\ProjectPeriod;
use App\Services\Advisors\PeriodEnrollmentService;
use App\Support\Permissions;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\RedirectResponse;
use Illuminate\Routing\Controllers\HasMiddleware;
use Illuminate\Routing\Controllers\Middleware;

class ProjectPeriodParticipantController extends Controller implements HasMiddleware
{
    public static function middleware(): array
    {
        return [
            'auth',
            new Middleware(Permissions::ability(Permissions::PROJECT_PERIODS_EDIT)),
        ];
    }

    public function preview(
        PreviewPeriodParticipantsRequest $request,
        ProjectPeriod $projectPeriod,
        PeriodEnrollmentService $enrollmentService,
    ): JsonResponse {
        $users = $enrollmentService->preview($request->validated());

        return response()->json([
            'users' => $users->map(fn ($user): array => [
                'id' => $user->id,
                'name' => $user->fullName(),
                'email' => $user->email,
                'career' => $user->studentProfile?->career?->name,
                'current_term' => $user->studentProfile?->current_term,
                'generation' => $user->studentProfile?->generation,
            ])->values()->all(),
        ]);
    }

    public function store(
        EnrollPeriodParticipantsRequest $request,
        ProjectPeriod $projectPeriod,
        PeriodEnrollmentService $enrollmentService,
    ): RedirectResponse {
        $enrollmentService->enrollMany(
            $projectPeriod,
            array_map('intval', $request->validated('user_ids')),
        );

        return back()->with('status', 'Alumnos inscritos al periodo.');
    }
}
