<?php

namespace App\Http\Controllers;

use App\Models\Repository;
use App\Models\RepositoryBusinessAdvisor;
use App\Services\BusinessAdvisors\AttachBusinessAdvisor;
use App\Services\BusinessAdvisors\ReleaseBusinessAdvisor;
use App\Services\BusinessAdvisors\SendAdvisorConfirmation;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;

class RepositoryBusinessAdvisorController extends Controller
{
    public function store(
        Request $request,
        Repository $repository,
        AttachBusinessAdvisor $attachBusinessAdvisor,
    ): RedirectResponse {
        $this->authorize('attach', [RepositoryBusinessAdvisor::class, $repository]);

        $validated = $request->validate([
            'existing_affiliation_id' => ['nullable', 'integer', 'exists:business_advisor_affiliations,id'],
            'existing_advisor_id' => ['nullable', 'integer', 'exists:business_advisors,id'],
            'existing_company_id' => ['nullable', 'integer', 'exists:companies,id'],
            'advisor' => ['nullable', 'array'],
            'advisor.first_name' => ['nullable', 'string', 'max:255'],
            'advisor.last_name' => ['nullable', 'string', 'max:255'],
            'advisor.second_last_name' => ['nullable', 'string', 'max:255'],
            'company' => ['nullable', 'array'],
            'company.name' => ['nullable', 'string', 'max:255'],
            'company.rfc' => ['nullable', 'string', 'max:13'],
            'company.sector' => ['nullable', 'string', 'max:255'],
            'company.phone' => ['nullable', 'string', 'max:20'],
            'company.email' => ['nullable', 'email', 'max:255'],
            'company.notes' => ['nullable', 'string'],
            'affiliation' => ['nullable', 'array'],
            'affiliation.job_title' => ['nullable', 'string', 'max:255'],
            'affiliation.department' => ['nullable', 'string', 'max:255'],
            'affiliation.email' => ['nullable', 'email', 'max:255'],
            'affiliation.phone' => ['nullable', 'string', 'max:20'],
            'notes' => ['nullable', 'string'],
            'is_primary' => ['nullable', 'boolean'],
            'send_confirmation' => ['nullable', 'boolean'],
        ]);

        $attachBusinessAdvisor->handle($repository, $request->user(), $validated);

        return redirect()
            ->route('repositories.account.show', $repository)
            ->with('status', 'Asesor empresarial adjuntado.');
    }

    public function destroy(
        Request $request,
        Repository $repository,
        RepositoryBusinessAdvisor $assignment,
        ReleaseBusinessAdvisor $releaseBusinessAdvisor,
    ): RedirectResponse {
        abort_unless($assignment->repository_id === $repository->id, 404);

        $this->authorize('release', $assignment);
        $releaseBusinessAdvisor->handle($assignment, $request->user());

        return redirect()
            ->route('repositories.account.show', $repository)
            ->with('status', 'Asesor empresarial liberado.');
    }

    public function resend(
        Request $request,
        Repository $repository,
        RepositoryBusinessAdvisor $assignment,
        SendAdvisorConfirmation $sendAdvisorConfirmation,
    ): RedirectResponse {
        abort_unless($assignment->repository_id === $repository->id, 404);

        $this->authorize('resend', $assignment);
        $sendAdvisorConfirmation->send($assignment);

        return back()->with('status', 'Correo de confirmacion reenviado.');
    }
}
