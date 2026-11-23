<?php

namespace App\Services\BusinessAdvisors;

use App\Models\BusinessAdvisor;
use App\Models\Company;
use App\Models\User;
use Illuminate\Support\Collection;

class CatalogSearch
{
    /**
     * @return list<array{id: int, full_name: string, job_title: ?string, company_name: ?string, email_masked: ?string, affiliation_id: ?int}>
     */
    public function advisors(string $query, User $viewer, int $limit = 10): array
    {
        $normalized = NameNormalizer::normalize($query);
        if (mb_strlen(trim($query)) < 3) {
            return [];
        }

        /** @var Collection<int, BusinessAdvisor> $advisors */
        $advisors = BusinessAdvisor::query()
            ->searchable($viewer)
            ->with(['affiliations' => fn ($q) => $q->current()->with('company:id,name')])
            ->where(function ($builder) use ($normalized, $query): void {
                $builder
                    ->where('name_normalized', 'like', '%'.$normalized.'%')
                    ->orWhere('first_name', 'like', '%'.$query.'%')
                    ->orWhere('last_name', 'like', '%'.$query.'%');
            })
            ->orderBy('last_name')
            ->limit($limit)
            ->get();

        return $advisors->map(function (BusinessAdvisor $advisor): array {
            $affiliation = $advisor->affiliations->first();

            return [
                'id' => $advisor->id,
                'full_name' => $advisor->fullName(),
                'job_title' => $affiliation?->job_title,
                'company_name' => $affiliation?->company?->name,
                'email_masked' => NameNormalizer::maskEmail($affiliation?->email),
                'affiliation_id' => $affiliation?->id,
            ];
        })->all();
    }

    /**
     * @return list<array{id: int, name: string, rfc: ?string, sector: ?string}>
     */
    public function companies(string $query, User $viewer, int $limit = 10): array
    {
        $normalized = NameNormalizer::normalizeCompanyName($query);
        if (mb_strlen(trim($query)) < 3) {
            return [];
        }

        return Company::query()
            ->searchable($viewer)
            ->where(function ($builder) use ($normalized, $query): void {
                $builder
                    ->where('name_normalized', 'like', '%'.$normalized.'%')
                    ->orWhere('name', 'like', '%'.$query.'%')
                    ->orWhere('rfc', 'like', '%'.NameNormalizer::normalizeRfc($query).'%');
            })
            ->orderBy('name')
            ->limit($limit)
            ->get(['id', 'name', 'rfc', 'sector'])
            ->map(fn (Company $company): array => [
                'id' => $company->id,
                'name' => $company->name,
                'rfc' => $company->rfc,
                'sector' => $company->sector,
            ])
            ->all();
    }
}
