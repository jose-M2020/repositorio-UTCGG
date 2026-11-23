<?php

namespace App\Http\Requests;

use App\Enums\ProjectPeriodStatus;
use App\Http\Requests\Concerns\ValidatesRepositoryOrganization;
use App\Models\ProjectPeriod;
use App\Models\ProjectType;
use App\Models\Repository;
use App\Support\Permissions;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;
use Illuminate\Validation\Validator;

class UpdateRepositoryRequest extends FormRequest
{
    use ValidatesRepositoryOrganization;

    public function authorize(): bool
    {
        return $this->user()?->can(Permissions::REPOSITORIES_EDIT) ?? false;
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
            'career' => [
                'required',
                'string',
                'max:80',
                Rule::exists('careers', 'code')->where(fn ($query) => $query->where('is_active', true)),
            ],
            'project_period_id' => ['nullable', 'integer', 'exists:project_periods,id'],
            'generation' => ['required', 'string', 'max:255'],
            // Advisors/company are managed via dedicated attach endpoints.
            ...$this->organizationRules(requireBusinessAdvisor: false),
        ];
    }

    public function withValidator(Validator $validator): void
    {
        $this->afterOrganizationValidation($validator, enforceRequiredAdvisor: false);

        $validator->after(function (Validator $validator): void {
            /** @var Repository $repository */
            $repository = $this->route('repository');
            $projectType = ProjectType::query()
                ->where('code', $this->string('project_type')->toString())
                ->first();

            $periodId = $this->input('project_period_id');
            $hasActiveAdvisor = $repository->activeAdvisor()->exists();

            if (
                $hasActiveAdvisor
                && $repository->project_period_id !== null
                && (int) $periodId !== (int) $repository->project_period_id
            ) {
                $validator->errors()->add(
                    'project_period_id',
                    'No puedes cambiar el periodo mientras el repositorio tenga un asesor activo.',
                );

                return;
            }

            if ($repository->project_period_id === null && blank($periodId)) {
                return;
            }

            if (! $projectType?->requires_academic_advisor) {
                return;
            }

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
                || (int) $period->project_type_id !== (int) $projectType->id
                || (
                    $period->status !== ProjectPeriodStatus::Open
                    && (int) $period->id !== (int) $repository->project_period_id
                )
            ) {
                $validator->errors()->add(
                    'project_period_id',
                    'El periodo debe corresponder al tipo de proyecto y estar abierto (o ser el actual).',
                );
            }
        });
    }
}
