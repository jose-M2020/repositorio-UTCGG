<?php

namespace App\Http\Controllers;

use App\Models\RepositoryBusinessAdvisor;
use App\Services\BusinessAdvisors\SendAdvisorConfirmation;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class BusinessAdvisorConfirmationController extends Controller
{
    public function __invoke(
        Request $request,
        RepositoryBusinessAdvisor $pivot,
        SendAdvisorConfirmation $sendAdvisorConfirmation,
    ): Response {
        abort_unless($request->hasValidSignature(), 403);

        $validated = $request->validate([
            'token' => ['required', 'string'],
            'decision' => ['required', 'in:confirm,reject'],
        ]);

        if ($validated['decision'] === 'confirm') {
            $sendAdvisorConfirmation->confirmWithToken($pivot, $validated['token']);
            $status = 'confirmed';
        } else {
            $sendAdvisorConfirmation->rejectWithToken($pivot, $validated['token']);
            $status = 'rejected';
        }

        return Inertia::render('public/business-advisors/confirmation', [
            'status' => $status,
            'project_title' => $pivot->repository?->title,
        ]);
    }
}
