<?php

namespace App\Http\Controllers;

use App\Models\BusinessAdvisor;
use App\Services\BusinessAdvisors\CatalogSearch;
use App\Services\BusinessAdvisors\ChangeAffiliation;
use App\Services\BusinessAdvisors\DuplicateDetector;
use App\Services\BusinessAdvisors\MergeEntities;
use App\Services\BusinessAdvisors\VerifyEntity;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class BusinessAdvisorController extends Controller
{
    public function search(Request $request, CatalogSearch $catalogSearch): JsonResponse
    {
        $this->authorize('search', BusinessAdvisor::class);

        $query = trim((string) $request->query('q', ''));

        return response()->json([
            'data' => $catalogSearch->advisors($query, $request->user()),
        ]);
    }

    public function duplicates(Request $request, DuplicateDetector $detector): JsonResponse
    {
        $this->authorize('create', BusinessAdvisor::class);

        $validated = $request->validate([
            'first_name' => ['required', 'string', 'max:255'],
            'last_name' => ['required', 'string', 'max:255'],
            'second_last_name' => ['nullable', 'string', 'max:255'],
            'email' => ['nullable', 'email', 'max:255'],
            'phone' => ['nullable', 'string', 'max:20'],
            'company_id' => ['nullable', 'integer', 'exists:companies,id'],
        ]);

        return response()->json([
            'data' => $detector->forPerson(
                $validated['first_name'],
                $validated['last_name'],
                $validated['second_last_name'] ?? null,
                $validated['email'] ?? null,
                $validated['phone'] ?? null,
                isset($validated['company_id']) ? (int) $validated['company_id'] : null,
            ),
        ]);
    }

    public function pending(Request $request): Response
    {
        $this->authorize('search', BusinessAdvisor::class);

        $advisors = BusinessAdvisor::query()
            ->where('status', 'pending_review')
            ->with(['createdBy:id,first_name,last_name', 'affiliations.company:id,name'])
            ->latest()
            ->paginate(20);

        return Inertia::render('panel/business-advisors/pending', [
            'advisors' => $advisors,
        ]);
    }

    public function verify(Request $request, BusinessAdvisor $businessAdvisor, VerifyEntity $verifyEntity): RedirectResponse
    {
        $this->authorize('verify', $businessAdvisor);
        $verifyEntity->verify($businessAdvisor, $request->user());

        return back()->with('status', 'Asesor empresarial verificado.');
    }

    public function reject(Request $request, BusinessAdvisor $businessAdvisor, VerifyEntity $verifyEntity): RedirectResponse
    {
        $this->authorize('verify', $businessAdvisor);

        $validated = $request->validate([
            'reason' => ['nullable', 'string', 'max:500'],
        ]);

        $verifyEntity->reject($businessAdvisor, $request->user(), $validated['reason'] ?? null);

        return back()->with('status', 'Asesor empresarial rechazado.');
    }

    public function merge(Request $request, BusinessAdvisor $businessAdvisor, MergeEntities $mergeEntities): RedirectResponse
    {
        $this->authorize('merge', BusinessAdvisor::class);

        $validated = $request->validate([
            'target_id' => ['required', 'integer', 'exists:business_advisors,id'],
        ]);

        $target = BusinessAdvisor::query()->findOrFail($validated['target_id']);
        $mergeEntities->mergeAdvisors($businessAdvisor, $target, $request->user());

        return back()->with('status', 'Asesores fusionados.');
    }

    public function storeAffiliation(
        Request $request,
        BusinessAdvisor $businessAdvisor,
        ChangeAffiliation $changeAffiliation,
    ): RedirectResponse {
        $this->authorize('create', BusinessAdvisor::class);

        $validated = $request->validate([
            'repository_id' => ['required', 'integer', 'exists:repositories,id'],
            'existing_company_id' => ['nullable', 'integer', 'exists:companies,id'],
            'company' => ['nullable', 'array'],
            'company.name' => ['nullable', 'string', 'max:255'],
            'company.rfc' => ['nullable', 'string', 'max:13'],
            'affiliation' => ['required', 'array'],
            'affiliation.job_title' => ['nullable', 'string', 'max:255'],
            'affiliation.department' => ['nullable', 'string', 'max:255'],
            'affiliation.email' => ['nullable', 'email', 'max:255'],
            'affiliation.phone' => ['nullable', 'string', 'max:20'],
        ]);

        $repository = \App\Models\Repository::query()->findOrFail($validated['repository_id']);
        $this->authorize('attach', [\App\Models\RepositoryBusinessAdvisor::class, $repository]);

        $changeAffiliation->handle($repository, $businessAdvisor, $request->user(), $validated);

        return redirect()
            ->route('repositories.account.show', $repository)
            ->with('status', 'Afiliacion actualizada y adjuntada al repositorio.');
    }
}
