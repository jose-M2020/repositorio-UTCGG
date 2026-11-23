<?php

namespace App\Http\Controllers;

use App\Models\Company;
use App\Services\BusinessAdvisors\CatalogSearch;
use App\Services\BusinessAdvisors\DuplicateDetector;
use App\Services\BusinessAdvisors\MergeEntities;
use App\Services\BusinessAdvisors\VerifyEntity;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;

class CompanyCatalogController extends Controller
{
    public function search(Request $request, CatalogSearch $catalogSearch): JsonResponse
    {
        $this->authorize('search', Company::class);

        $query = trim((string) $request->query('q', ''));

        return response()->json([
            'data' => $catalogSearch->companies($query, $request->user()),
        ]);
    }

    public function duplicates(Request $request, DuplicateDetector $detector): JsonResponse
    {
        $this->authorize('create', Company::class);

        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'rfc' => ['nullable', 'string', 'max:13'],
        ]);

        return response()->json([
            'data' => $detector->forCompany($validated['name'], $validated['rfc'] ?? null),
        ]);
    }

    public function verify(Request $request, Company $company, VerifyEntity $verifyEntity): RedirectResponse
    {
        $this->authorize('verify', $company);
        $verifyEntity->verify($company, $request->user());

        return back()->with('status', 'Empresa verificada.');
    }

    public function reject(Request $request, Company $company, VerifyEntity $verifyEntity): RedirectResponse
    {
        $this->authorize('verify', $company);

        $validated = $request->validate([
            'reason' => ['nullable', 'string', 'max:500'],
        ]);

        $verifyEntity->reject($company, $request->user(), $validated['reason'] ?? null);

        return back()->with('status', 'Empresa rechazada.');
    }

    public function merge(Request $request, Company $company, MergeEntities $mergeEntities): RedirectResponse
    {
        $this->authorize('merge', Company::class);

        $validated = $request->validate([
            'target_id' => ['required', 'integer', 'exists:companies,id'],
        ]);

        $target = Company::query()->findOrFail($validated['target_id']);
        $mergeEntities->mergeCompanies($company, $target, $request->user());

        return back()->with('status', 'Empresas fusionadas.');
    }
}
