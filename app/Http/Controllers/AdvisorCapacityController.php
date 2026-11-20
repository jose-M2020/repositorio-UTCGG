<?php

namespace App\Http\Controllers;

use App\Http\Requests\UpsertAdvisorCapacityRequest;
use App\Models\AdvisorPeriodCapacity;
use App\Models\ProjectPeriod;
use App\Support\Permissions;
use Illuminate\Http\RedirectResponse;
use Illuminate\Routing\Controllers\HasMiddleware;
use Illuminate\Routing\Controllers\Middleware;

class AdvisorCapacityController extends Controller implements HasMiddleware
{
    public static function middleware(): array
    {
        return [
            'auth',
            new Middleware(Permissions::ability(Permissions::ADVISORS_CAPACITY_MANAGE)),
        ];
    }

    public function upsert(
        UpsertAdvisorCapacityRequest $request,
        ProjectPeriod $projectPeriod,
    ): RedirectResponse {
        $validated = $request->validated();

        AdvisorPeriodCapacity::query()->updateOrCreate(
            [
                'project_period_id' => $projectPeriod->id,
                'user_id' => (int) $validated['user_id'],
            ],
            [
                'max_projects' => $validated['max_projects'] ?? null,
                'is_available' => (bool) $validated['is_available'],
                'notes' => isset($validated['notes']) ? trim((string) $validated['notes']) : null,
            ],
        );

        return back()->with('status', 'Capacidad de asesor actualizada.');
    }
}
