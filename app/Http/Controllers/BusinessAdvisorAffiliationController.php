<?php

namespace App\Http\Controllers;

use App\Models\BusinessAdvisorAffiliation;
use App\Services\BusinessAdvisors\VerifyEntity;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;

class BusinessAdvisorAffiliationController extends Controller
{
    public function verify(
        Request $request,
        BusinessAdvisorAffiliation $businessAdvisorAffiliation,
        VerifyEntity $verifyEntity,
    ): RedirectResponse {
        $this->authorize('verify', $businessAdvisorAffiliation);
        $verifyEntity->verify($businessAdvisorAffiliation, $request->user());

        return back()->with('status', 'Afiliacion verificada.');
    }

    public function reject(
        Request $request,
        BusinessAdvisorAffiliation $businessAdvisorAffiliation,
        VerifyEntity $verifyEntity,
    ): RedirectResponse {
        $this->authorize('verify', $businessAdvisorAffiliation);

        $validated = $request->validate([
            'reason' => ['nullable', 'string', 'max:500'],
        ]);

        $verifyEntity->reject(
            $businessAdvisorAffiliation,
            $request->user(),
            $validated['reason'] ?? null,
        );

        return back()->with('status', 'Afiliacion rechazada.');
    }
}
