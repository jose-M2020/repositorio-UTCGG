<?php

namespace App\Http\Requests\Concerns;

use App\Enums\BusinessAdvisorAcceptanceStatus;
use App\Models\ProjectType;
use Illuminate\Validation\Rule;
use Illuminate\Validation\Validator;

trait ValidatesRepositoryOrganization
{
    /**
     * @return array<string, mixed>
     */
    protected function organizationRules(bool $requireBusinessAdvisor): array
    {
        $advisorRequired = $requireBusinessAdvisor ? 'required' : 'nullable';

        return [
            'company' => ['nullable', 'array'],
            'company.name' => ['nullable', 'string', 'max:255'],
            'company.rfc' => ['nullable', 'string', 'max:13'],
            'company.sector' => ['nullable', 'string', 'max:255'],
            'company.phone' => ['nullable', 'string', 'max:20'],
            'company.email' => ['nullable', 'email', 'max:255'],
            'company.address' => ['nullable', 'array'],
            'company.address.street_line' => ['nullable', 'string', 'max:255'],
            'company.address.street_line_2' => ['nullable', 'string', 'max:255'],
            'company.address.neighborhood' => ['nullable', 'string', 'max:255'],
            'company.address.city' => ['nullable', 'string', 'max:255'],
            'company.address.state' => ['nullable', 'string', 'max:255'],
            'company.address.postal_code' => ['nullable', 'string', 'max:12'],
            'company.address.country' => ['nullable', 'string', 'max:2'],
            'company.address.references' => ['nullable', 'string', 'max:255'],
            'company.notes' => ['nullable', 'string'],

            'business_advisor' => ['nullable', 'array'],
            'business_advisor.first_name' => [$advisorRequired, 'string', 'max:255'],
            'business_advisor.last_name' => [$advisorRequired, 'string', 'max:255'],
            'business_advisor.second_last_name' => ['nullable', 'string', 'max:255'],
            'business_advisor.email' => ['nullable', 'email', 'max:255'],
            'business_advisor.phone' => ['nullable', 'string', 'max:20'],
            'business_advisor.job_title' => ['nullable', 'string', 'max:255'],
            'business_advisor.department' => ['nullable', 'string', 'max:255'],
            'business_advisor.notes' => ['nullable', 'string'],
            'business_advisor.acceptance_status' => [
                'nullable',
                Rule::enum(BusinessAdvisorAcceptanceStatus::class),
            ],
        ];
    }

    protected function projectTypeRequiresBusinessAdvisor(): bool
    {
        return (bool) ProjectType::query()
            ->where('code', $this->string('project_type')->toString())
            ->value('requires_business_advisor');
    }

    protected function afterOrganizationValidation(
        Validator $validator,
        bool $enforceRequiredAdvisor = true,
    ): void {
        $validator->after(function (Validator $validator) use ($enforceRequiredAdvisor): void {
            $firstName = trim((string) $this->input('business_advisor.first_name', ''));
            $lastName = trim((string) $this->input('business_advisor.last_name', ''));
            $hasAdvisorNames = $firstName !== '' && $lastName !== '';

            if ($enforceRequiredAdvisor && $this->projectTypeRequiresBusinessAdvisor()) {
                if ($firstName === '') {
                    $validator->errors()->add(
                        'business_advisor.first_name',
                        'El nombre del asesor empresarial es obligatorio para este tipo de proyecto.',
                    );
                }

                if ($lastName === '') {
                    $validator->errors()->add(
                        'business_advisor.last_name',
                        'El apellido del asesor empresarial es obligatorio para este tipo de proyecto.',
                    );
                }
            }

            if (! $hasAdvisorNames) {
                return;
            }

            $email = trim((string) $this->input('business_advisor.email', ''));
            $phone = trim((string) $this->input('business_advisor.phone', ''));
            $companyName = trim((string) $this->input('company.name', ''));

            if ($email === '' && $phone === '') {
                $validator->errors()->add(
                    'business_advisor.email',
                    'Se requiere correo o telefono de contacto del asesor empresarial.',
                );
            }

            if ($companyName === '' && ! $this->filled('company.existing_company_id')) {
                $validator->errors()->add(
                    'company.name',
                    'La empresa es obligatoria al registrar un asesor empresarial.',
                );
            }
        });
    }
}
