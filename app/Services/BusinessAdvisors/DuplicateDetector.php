<?php

namespace App\Services\BusinessAdvisors;

use App\Enums\CatalogReviewStatus;
use App\Models\BusinessAdvisor;
use App\Models\BusinessAdvisorAffiliation;
use App\Models\Company;
use Illuminate\Support\Collection;

class DuplicateDetector
{
    /**
     * @return list<array{id: int, full_name: string, strength: string, reason: string, company_name: ?string}>
     */
    public function forPerson(
        string $firstName,
        string $lastName,
        ?string $secondLastName = null,
        ?string $email = null,
        ?string $phone = null,
        ?int $companyId = null,
    ): array {
        $nameNormalized = NameNormalizer::normalizePersonName($firstName, $lastName, $secondLastName);
        $emailNormalized = NameNormalizer::normalizeEmail($email);
        $phoneNormalized = NameNormalizer::normalizePhone($phone);

        /** @var Collection<int, array{id: int, full_name: string, strength: string, reason: string, company_name: ?string}> $candidates */
        $candidates = collect();

        if ($emailNormalized !== null) {
            BusinessAdvisorAffiliation::query()
                ->with(['businessAdvisor', 'company:id,name'])
                ->where('email', $emailNormalized)
                ->whereHas('businessAdvisor', fn ($q) => $q->whereNotIn('status', [
                    CatalogReviewStatus::Merged->value,
                    CatalogReviewStatus::Rejected->value,
                    CatalogReviewStatus::Inactive->value,
                ]))
                ->limit(20)
                ->get()
                ->each(function (BusinessAdvisorAffiliation $affiliation) use ($candidates): void {
                    $advisor = $affiliation->businessAdvisor;
                    if ($advisor === null) {
                        return;
                    }

                    $candidates->put($advisor->id, [
                        'id' => $advisor->id,
                        'full_name' => $advisor->fullName(),
                        'strength' => 'strong',
                        'reason' => 'same_email',
                        'company_name' => $affiliation->company?->name,
                    ]);
                });
        }

        if ($companyId !== null && $nameNormalized !== '') {
            BusinessAdvisor::query()
                ->with(['affiliations' => fn ($q) => $q->current()->with('company:id,name')])
                ->where('name_normalized', $nameNormalized)
                ->whereNotIn('status', [
                    CatalogReviewStatus::Merged->value,
                    CatalogReviewStatus::Rejected->value,
                    CatalogReviewStatus::Inactive->value,
                ])
                ->whereHas('affiliations', fn ($q) => $q->current()->where('company_id', $companyId))
                ->limit(20)
                ->get()
                ->each(function (BusinessAdvisor $advisor) use ($candidates, $companyId): void {
                    if ($candidates->has($advisor->id)) {
                        return;
                    }

                    $companyName = $advisor->affiliations
                        ->firstWhere('company_id', $companyId)
                        ?->company
                        ?->name;

                    $candidates->put($advisor->id, [
                        'id' => $advisor->id,
                        'full_name' => $advisor->fullName(),
                        'strength' => 'strong',
                        'reason' => 'same_name_and_company',
                        'company_name' => $companyName,
                    ]);
                });
        }

        if ($phoneNormalized !== null) {
            BusinessAdvisorAffiliation::query()
                ->with(['businessAdvisor', 'company:id,name'])
                ->where('phone', $phoneNormalized)
                ->whereHas('businessAdvisor', fn ($q) => $q->whereNotIn('status', [
                    CatalogReviewStatus::Merged->value,
                    CatalogReviewStatus::Rejected->value,
                    CatalogReviewStatus::Inactive->value,
                ]))
                ->limit(20)
                ->get()
                ->each(function (BusinessAdvisorAffiliation $affiliation) use ($candidates): void {
                    $advisor = $affiliation->businessAdvisor;
                    if ($advisor === null || $candidates->has($advisor->id)) {
                        return;
                    }

                    $candidates->put($advisor->id, [
                        'id' => $advisor->id,
                        'full_name' => $advisor->fullName(),
                        'strength' => 'medium',
                        'reason' => 'same_phone',
                        'company_name' => $affiliation->company?->name,
                    ]);
                });
        }

        if ($nameNormalized !== '') {
            BusinessAdvisor::query()
                ->with(['affiliations' => fn ($q) => $q->current()->with('company:id,name')])
                ->where('name_normalized', $nameNormalized)
                ->whereNotIn('status', [
                    CatalogReviewStatus::Merged->value,
                    CatalogReviewStatus::Rejected->value,
                    CatalogReviewStatus::Inactive->value,
                ])
                ->limit(20)
                ->get()
                ->each(function (BusinessAdvisor $advisor) use ($candidates): void {
                    if ($candidates->has($advisor->id)) {
                        return;
                    }

                    $candidates->put($advisor->id, [
                        'id' => $advisor->id,
                        'full_name' => $advisor->fullName(),
                        'strength' => 'medium',
                        'reason' => 'same_name',
                        'company_name' => $advisor->affiliations->first()?->company?->name,
                    ]);
                });
        }

        return $candidates
            ->sortBy(fn (array $row): int => $row['strength'] === 'strong' ? 0 : 1)
            ->values()
            ->all();
    }

    /**
     * @return list<array{id: int, name: string, strength: string, reason: string, rfc: ?string}>
     */
    public function forCompany(string $name, ?string $rfc = null): array
    {
        $nameNormalized = NameNormalizer::normalizeCompanyName($name);
        $rfcNormalized = NameNormalizer::normalizeRfc($rfc);

        /** @var Collection<int, array{id: int, name: string, strength: string, reason: string, rfc: ?string}> $candidates */
        $candidates = collect();

        if ($rfcNormalized !== null) {
            Company::query()
                ->where('rfc', $rfcNormalized)
                ->whereNotIn('status', [
                    CatalogReviewStatus::Merged->value,
                    CatalogReviewStatus::Rejected->value,
                    CatalogReviewStatus::Inactive->value,
                ])
                ->limit(10)
                ->get()
                ->each(function (Company $company) use ($candidates): void {
                    $candidates->put($company->id, [
                        'id' => $company->id,
                        'name' => $company->name,
                        'strength' => 'strong',
                        'reason' => 'same_rfc',
                        'rfc' => $company->rfc,
                    ]);
                });
        }

        if ($nameNormalized !== '') {
            Company::query()
                ->where('name_normalized', $nameNormalized)
                ->whereNotIn('status', [
                    CatalogReviewStatus::Merged->value,
                    CatalogReviewStatus::Rejected->value,
                    CatalogReviewStatus::Inactive->value,
                ])
                ->limit(10)
                ->get()
                ->each(function (Company $company) use ($candidates): void {
                    if ($candidates->has($company->id)) {
                        return;
                    }

                    $candidates->put($company->id, [
                        'id' => $company->id,
                        'name' => $company->name,
                        'strength' => 'strong',
                        'reason' => 'same_name',
                        'rfc' => $company->rfc,
                    ]);
                });

            Company::query()
                ->where('name_normalized', 'like', '%'.$nameNormalized.'%')
                ->where('name_normalized', '!=', $nameNormalized)
                ->whereNotIn('status', [
                    CatalogReviewStatus::Merged->value,
                    CatalogReviewStatus::Rejected->value,
                    CatalogReviewStatus::Inactive->value,
                ])
                ->limit(20)
                ->get()
                ->each(function (Company $company) use ($candidates, $nameNormalized): void {
                    if ($candidates->has($company->id)) {
                        return;
                    }

                    similar_text($nameNormalized, (string) $company->name_normalized, $percent);
                    if ($percent < 85) {
                        return;
                    }

                    $candidates->put($company->id, [
                        'id' => $company->id,
                        'name' => $company->name,
                        'strength' => 'medium',
                        'reason' => 'similar_name',
                        'rfc' => $company->rfc,
                    ]);
                });
        }

        return $candidates
            ->sortBy(fn (array $row): int => $row['strength'] === 'strong' ? 0 : 1)
            ->values()
            ->all();
    }
}
