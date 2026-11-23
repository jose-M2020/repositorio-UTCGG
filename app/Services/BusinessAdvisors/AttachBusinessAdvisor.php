<?php

namespace App\Services\BusinessAdvisors;

use App\Enums\BusinessAdvisorAcceptanceStatus;
use App\Enums\BusinessAdvisorAuditAction;
use App\Enums\CatalogReviewStatus;
use App\Enums\CatalogSource;
use App\Models\Address;
use App\Models\BusinessAdvisor;
use App\Models\BusinessAdvisorAffiliation;
use App\Models\Company;
use App\Models\Repository;
use App\Models\RepositoryBusinessAdvisor;
use App\Models\User;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\ValidationException;

class AttachBusinessAdvisor
{
    public function __construct(
        private readonly BusinessAdvisorAuditLogger $auditLogger,
        private readonly SendAdvisorConfirmation $sendAdvisorConfirmation,
    ) {}

    /**
     * @param  array{
     *     existing_affiliation_id?: int|null,
     *     existing_advisor_id?: int|null,
     *     existing_company_id?: int|null,
     *     advisor?: array{first_name?: string, last_name?: string, second_last_name?: string|null}|null,
     *     company?: array{name?: string, rfc?: string|null, sector?: string|null, phone?: string|null, email?: string|null, notes?: string|null, address?: array<string, mixed>|null}|null,
     *     affiliation?: array{job_title?: string|null, department?: string|null, email?: string|null, phone?: string|null}|null,
     *     notes?: string|null,
     *     is_primary?: bool,
     *     send_confirmation?: bool
     * }  $input
     */
    public function handle(Repository $repository, User $actor, array $input): RepositoryBusinessAdvisor
    {
        $max = (int) config('projects.max_business_advisors', 3);

        return DB::transaction(function () use ($repository, $actor, $input, $max): RepositoryBusinessAdvisor {
            $activeCount = RepositoryBusinessAdvisor::query()
                ->where('repository_id', $repository->id)
                ->active()
                ->lockForUpdate()
                ->count();

            if ($activeCount >= $max) {
                throw ValidationException::withMessages([
                    'business_advisor' => "El repositorio ya tiene el maximo de {$max} asesores empresariales activos.",
                ]);
            }

            [$advisor, $affiliation, $company] = $this->resolveEntities($actor, $input);

            $alreadyActive = RepositoryBusinessAdvisor::query()
                ->where('repository_id', $repository->id)
                ->where('business_advisor_id', $advisor->id)
                ->active()
                ->exists();

            if ($alreadyActive) {
                throw ValidationException::withMessages([
                    'business_advisor' => 'Este asesor empresarial ya esta activo en el repositorio.',
                ]);
            }

            $isPrimary = (bool) ($input['is_primary'] ?? $activeCount === 0);

            if ($isPrimary) {
                RepositoryBusinessAdvisor::query()
                    ->where('repository_id', $repository->id)
                    ->active()
                    ->primary()
                    ->update(['is_primary' => false]);
            }

            $snapshot = $this->buildSnapshot($advisor, $company, $affiliation);

            $assignment = RepositoryBusinessAdvisor::query()->create([
                'repository_id' => $repository->id,
                'business_advisor_id' => $advisor->id,
                'business_advisor_affiliation_id' => $affiliation->id,
                'snapshot' => $snapshot,
                'company_id' => $company->id,
                'first_name' => $advisor->first_name,
                'last_name' => $advisor->last_name,
                'second_last_name' => $advisor->second_last_name,
                'email' => $affiliation->email,
                'phone' => $affiliation->phone,
                'job_title' => $affiliation->job_title,
                'department' => $affiliation->department,
                'is_primary' => $isPrimary,
                'acceptance_status' => BusinessAdvisorAcceptanceStatus::Pending->value,
                'notes' => $this->nullableString($input['notes'] ?? null),
                'created_by' => $actor->id,
                'assigned_at' => now(),
                'released_at' => null,
            ]);

            if ($isPrimary) {
                $repository->update(['company_id' => $company->id]);
            }

            $this->auditLogger->log(
                BusinessAdvisorAuditAction::Attached,
                $actor,
                $advisor->id,
                $repository->id,
                ['assignment_id' => $assignment->id, 'affiliation_id' => $affiliation->id],
            );

            if (($input['send_confirmation'] ?? true) && filled($affiliation->email)) {
                $this->sendAdvisorConfirmation->send($assignment);
            }

            return $assignment->fresh(['businessAdvisor', 'affiliation.company', 'company']);
        });
    }

    /**
     * @param  array<string, mixed>  $input
     * @return array{0: BusinessAdvisor, 1: BusinessAdvisorAffiliation, 2: Company}
     */
    private function resolveEntities(User $actor, array $input): array
    {
        if (! empty($input['existing_affiliation_id'])) {
            $affiliation = BusinessAdvisorAffiliation::query()
                ->with(['businessAdvisor', 'company'])
                ->findOrFail($input['existing_affiliation_id']);

            return [$affiliation->businessAdvisor, $affiliation, $affiliation->company];
        }

        $company = $this->resolveCompany($actor, $input);
        $advisor = $this->resolveAdvisor($actor, $input);
        $affiliation = $this->resolveAffiliation($actor, $advisor, $company, $input);

        return [$advisor, $affiliation, $company];
    }

    /**
     * @param  array<string, mixed>  $input
     */
    private function resolveCompany(User $actor, array $input): Company
    {
        if (! empty($input['existing_company_id'])) {
            return Company::query()->findOrFail($input['existing_company_id']);
        }

        $companyData = is_array($input['company'] ?? null) ? $input['company'] : [];
        $name = trim((string) ($companyData['name'] ?? ''));
        if ($name === '') {
            throw ValidationException::withMessages([
                'company.name' => 'El nombre de la empresa es obligatorio.',
            ]);
        }

        $rfc = NameNormalizer::normalizeRfc($companyData['rfc'] ?? null);
        $existing = null;

        if ($rfc !== null) {
            $existing = Company::query()->where('rfc', $rfc)->first();
        }

        if ($existing === null) {
            $existing = Company::query()
                ->where('name_normalized', NameNormalizer::normalizeCompanyName($name))
                ->first();
        }

        $address = $this->resolveAddress(
            is_array($companyData['address'] ?? null) ? $companyData['address'] : null,
            $existing?->address,
        );

        if ($existing !== null) {
            return $existing;
        }

        return Company::query()->create([
            'name' => $name,
            'name_normalized' => NameNormalizer::normalizeCompanyName($name),
            'rfc' => $rfc,
            'sector' => $this->nullableString($companyData['sector'] ?? null),
            'phone' => NameNormalizer::normalizePhone($companyData['phone'] ?? null),
            'email' => NameNormalizer::normalizeEmail($companyData['email'] ?? null),
            'address_id' => $address?->id,
            'notes' => $this->nullableString($companyData['notes'] ?? null),
            'status' => CatalogReviewStatus::PendingReview->value,
            'source' => CatalogSource::User->value,
            'created_by' => $actor->id,
        ]);
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
     * @param  array<string, mixed>  $input
     */
    private function resolveAdvisor(User $actor, array $input): BusinessAdvisor
    {
        if (! empty($input['existing_advisor_id'])) {
            return BusinessAdvisor::query()->findOrFail($input['existing_advisor_id']);
        }

        $advisorData = is_array($input['advisor'] ?? null) ? $input['advisor'] : [];
        $firstName = trim((string) ($advisorData['first_name'] ?? ''));
        $lastName = trim((string) ($advisorData['last_name'] ?? ''));

        if ($firstName === '' || $lastName === '') {
            throw ValidationException::withMessages([
                'advisor.first_name' => 'El nombre y apellido del asesor son obligatorios.',
            ]);
        }

        $secondLastName = $this->nullableString($advisorData['second_last_name'] ?? null);

        return BusinessAdvisor::query()->create([
            'first_name' => $firstName,
            'last_name' => $lastName,
            'second_last_name' => $secondLastName,
            'name_normalized' => NameNormalizer::normalizePersonName($firstName, $lastName, $secondLastName),
            'status' => CatalogReviewStatus::PendingReview->value,
            'source' => CatalogSource::User->value,
            'created_by' => $actor->id,
        ]);
    }

    /**
     * @param  array<string, mixed>  $input
     */
    private function resolveAffiliation(
        User $actor,
        BusinessAdvisor $advisor,
        Company $company,
        array $input,
    ): BusinessAdvisorAffiliation {
        $affiliationData = is_array($input['affiliation'] ?? null) ? $input['affiliation'] : [];
        $email = NameNormalizer::normalizeEmail($affiliationData['email'] ?? null);
        $phone = NameNormalizer::normalizePhone($affiliationData['phone'] ?? null);

        if ($email === null && $phone === null) {
            throw ValidationException::withMessages([
                'affiliation.email' => 'Se requiere correo o telefono de contacto del asesor.',
            ]);
        }

        $current = BusinessAdvisorAffiliation::query()
            ->where('business_advisor_id', $advisor->id)
            ->where('company_id', $company->id)
            ->current()
            ->lockForUpdate()
            ->first();

        if ($current !== null) {
            $current->fill([
                'job_title' => $this->nullableString($affiliationData['job_title'] ?? null) ?? $current->job_title,
                'department' => $this->nullableString($affiliationData['department'] ?? null) ?? $current->department,
                'email' => $email ?? $current->email,
                'phone' => $phone ?? $current->phone,
            ])->save();

            return $current->fresh();
        }

        return BusinessAdvisorAffiliation::query()->create([
            'business_advisor_id' => $advisor->id,
            'company_id' => $company->id,
            'job_title' => $this->nullableString($affiliationData['job_title'] ?? null),
            'department' => $this->nullableString($affiliationData['department'] ?? null),
            'email' => $email,
            'phone' => $phone,
            'starts_at' => now()->toDateString(),
            'ends_at' => null,
            'status' => CatalogReviewStatus::PendingReview->value,
            'source' => CatalogSource::User->value,
            'created_by' => $actor->id,
        ]);
    }

    private function buildSnapshot(
        BusinessAdvisor $advisor,
        Company $company,
        BusinessAdvisorAffiliation $affiliation,
    ): array {
        return [
            'first_name' => $advisor->first_name,
            'last_name' => $advisor->last_name,
            'second_last_name' => $advisor->second_last_name,
            'company' => [
                'id' => $company->id,
                'name' => $company->name,
                'rfc' => $company->rfc,
            ],
            'job_title' => $affiliation->job_title,
            'department' => $affiliation->department,
            'email' => $affiliation->email,
            'phone' => $affiliation->phone,
            'captured_at' => now()->toIso8601String(),
        ];
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
