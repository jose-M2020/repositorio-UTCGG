<?php

namespace App\Http\Requests;

use App\Enums\ProjectPeriodStatus;
use App\Http\Requests\Concerns\ValidatesRepositoryOrganization;
use App\Models\ProjectPeriod;
use App\Models\ProjectType;
use App\Support\Permissions;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;
use Illuminate\Validation\Validator;

class StoreRepositoryRequest extends FormRequest
{
    use ValidatesRepositoryOrganization;

    public function authorize(): bool
    {
        return $this->user()?->can(Permissions::REPOSITORIES_CREATE) ?? false;
    }

    /**
     * @return array<string, mixed>
     */
    public function rules(): array
    {
        return [
            'title' => ['required', 'string', 'max:255'],
            'description' => ['required', 'string'],
            'project_type' => [
                'required',
                'string',
                'max:80',
                Rule::exists('project_types', 'code')->where(fn ($query) => $query->where('is_active', true)),
            ],
            'academic_degree' => [
                'required',
                'string',
                'max:80',
                Rule::exists('education_levels', 'code')->where(fn ($query) => $query->where('is_active', true)),
            ],
            'keywords' => ['required', 'string', 'max:255'],
            'visibility' => ['required', Rule::in(['public', 'private'])],
            'member_emails' => ['nullable', 'array', 'max:8'],
            'member_emails.*' => ['required', 'string', 'email', 'distinct', 'exists:users,email'],
            'career' => [
                'required',
                'string',
                'max:80',
                Rule::exists('careers', 'code')->where(fn ($query) => $query->where('is_active', true)),
            ],
            'project_period_id' => ['nullable', 'integer', 'exists:project_periods,id'],
            'generation' => ['required', 'string', 'max:255'],
            // Organization / business advisors are attached after create.
            ...$this->organizationRules(requireBusinessAdvisor: false),
        ];
    }

    public function withValidator(Validator $validator): void
    {
        $this->afterOrganizationValidation($validator, enforceRequiredAdvisor: false);

        $validator->after(function (Validator $validator): void {
            $projectType = ProjectType::query()
                ->where('code', $this->string('project_type')->toString())
                ->first();

            if (! $projectType?->requires_academic_advisor) {
                return;
            }

            $periodId = $this->input('project_period_id');
            if (blank($periodId)) {
                $validator->errors()->add(
                    'project_period_id',
                    'Debes seleccionar un periodo abierto para este tipo de proyecto.',
                );

                return;
            }

            $period = ProjectPeriod::query()->find($periodId);
            if (
                $period === null
                || $period->status !== ProjectPeriodStatus::Open
                || (int) $period->project_type_id !== (int) $projectType->id
            ) {
                $validator->errors()->add(
                    'project_period_id',
                    'El periodo debe estar abierto y corresponder al tipo de proyecto.',
                );
            }
        });
    }
}
