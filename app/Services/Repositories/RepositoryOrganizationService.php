<?php

namespace App\Services\Repositories;

use App\Enums\BusinessAdvisorAcceptanceStatus;
use App\Models\Address;
use App\Models\Company;
use App\Models\Repository;
use App\Models\RepositoryBusinessAdvisor;
use App\Models\User;
use Illuminate\Support\Facades\DB;

class RepositoryOrganizationService
{
    /**
     * @param  array{
     *     name?: string|null,
     *     rfc?: string|null,
     *     sector?: string|null,
     *     phone?: string|null,
     *     email?: string|null,
     *     notes?: string|null,
     *     address?: array<string, mixed>|null
     * }|null  $companyData
     * @param  array{
     *     first_name?: string|null,
     *     last_name?: string|null,
     *     second_last_name?: string|null,
     *     email?: string|null,
     *     phone?: string|null,
     *     job_title?: string|null,
     *     department?: string|null,
     *     notes?: string|null,
     *     acceptance_status?: string|null
     * }|null  $advisorData
     */
    public function sync(
        Repository $repository,
        ?array $companyData,
        ?array $advisorData,
        ?User $actor = null,
    ): void {
        DB::transaction(function () use ($repository, $companyData, $advisorData, $actor): void {
            $company = $this->resolveCompany($companyData);

            $repository->update([
                'company_id' => $company?->id,
            ]);

            $this->syncPrimaryBusinessAdvisor($repository, $company, $advisorData, $actor);
        });
    }

    /**
     * @param  array<string, mixed>|null  $companyData
     */
    private function resolveCompany(?array $companyData): ?Company
    {
        if ($companyData === null) {
            return null;
        }

        $name = trim((string) ($companyData['name'] ?? ''));
        if ($name === '') {
            return null;
        }

        $existing = null;
        $rfc = $this->nullableString($companyData['rfc'] ?? null);
        if ($rfc !== null) {
            $existing = Company::query()->where('rfc', $rfc)->first();
        }

        if ($existing === null) {
            $existing = Company::query()->where('name', $name)->first();
        }

        $address = $this->resolveAddress(
            is_array($companyData['address'] ?? null) ? $companyData['address'] : null,
            $existing?->address,
        );

        $payload = [
            'name' => $name,
            'rfc' => $rfc,
            'sector' => $this->nullableString($companyData['sector'] ?? null),
            'phone' => $this->nullableString($companyData['phone'] ?? null),
            'email' => $this->nullableString($companyData['email'] ?? null),
            'address_id' => $address?->id,
            'notes' => $this->nullableString($companyData['notes'] ?? null),
        ];

        if ($existing !== null) {
            if ($address === null && $existing->address_id !== null && ! $this->hasAddressInput($companyData)) {
                unset($payload['address_id']);
            }

            $existing->fill($payload)->save();

            return $existing->fresh(['address']);
        }

        return Company::query()->create($payload);
    }

    /**
     * @param  array<string, mixed>|null  $addressData
     */
    private function resolveAddress(?array $addressData, ?Address $existing = null): ?Address
    {
        if ($addressData === null) {
            return null;
        }

        $streetLine = trim((string) ($addressData['street_line'] ?? ''));
        if ($streetLine === '') {
            return null;
        }

        $payload = [
            'street_line' => $streetLine,
            'street_line_2' => $this->nullableString($addressData['street_line_2'] ?? null),
            'neighborhood' => $this->nullableString($addressData['neighborhood'] ?? null),
            'city' => $this->nullableString($addressData['city'] ?? null),
            'state' => $this->nullableString($addressData['state'] ?? null),
            'postal_code' => $this->nullableString($addressData['postal_code'] ?? null),
            'country' => $this->nullableString($addressData['country'] ?? null) ?? 'MX',
            'references' => $this->nullableString($addressData['references'] ?? null),
        ];

        if ($existing !== null) {
            $existing->fill($payload)->save();

            return $existing;
        }

        return Address::query()->create($payload);
    }

    /**
     * @param  array<string, mixed>  $companyData
     */
    private function hasAddressInput(array $companyData): bool
    {
        return array_key_exists('address', $companyData);
    }

    /**
     * @param  array<string, mixed>|null  $advisorData
     */
    private function syncPrimaryBusinessAdvisor(
        Repository $repository,
        ?Company $company,
        ?array $advisorData,
        ?User $actor,
    ): void {
        $firstName = trim((string) ($advisorData['first_name'] ?? ''));
        $lastName = trim((string) ($advisorData['last_name'] ?? ''));

        $activePrimary = RepositoryBusinessAdvisor::query()
            ->where('repository_id', $repository->id)
            ->active()
            ->primary()
            ->lockForUpdate()
            ->first();

        if ($firstName === '' || $lastName === '') {
            if ($activePrimary !== null) {
                $activePrimary->update(['released_at' => now()]);
            }

            return;
        }

        $payload = [
            'company_id' => $company?->id,
            'first_name' => $firstName,
            'last_name' => $lastName,
            'second_last_name' => $this->nullableString($advisorData['second_last_name'] ?? null),
            'email' => $this->nullableString($advisorData['email'] ?? null),
            'phone' => $this->nullableString($advisorData['phone'] ?? null),
            'job_title' => $this->nullableString($advisorData['job_title'] ?? null),
            'department' => $this->nullableString($advisorData['department'] ?? null),
            'notes' => $this->nullableString($advisorData['notes'] ?? null),
            'acceptance_status' => $advisorData['acceptance_status']
                ?? BusinessAdvisorAcceptanceStatus::Confirmed->value,
            'is_primary' => true,
        ];

        if ($activePrimary !== null) {
            $activePrimary->update($payload);

            return;
        }

        RepositoryBusinessAdvisor::query()->create([
            ...$payload,
            'repository_id' => $repository->id,
            'created_by' => $actor?->id,
            'assigned_at' => now(),
            'released_at' => null,
        ]);
    }

    private function nullableString(mixed $value): ?string
    {
        if ($value === null) {
            return null;
        }

        $trimmed = trim((string) $value);

        return $trimmed === '' ? null : $trimmed;
    }
}
