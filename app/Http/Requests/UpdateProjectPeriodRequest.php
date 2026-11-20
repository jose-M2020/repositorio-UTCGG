<?php

namespace App\Http\Requests;

use App\Enums\ProjectPeriodStatus;
use App\Models\ProjectPeriod;
use App\Support\Permissions;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateProjectPeriodRequest extends FormRequest
{
    public function authorize(): bool
    {
        return $this->user()?->can(Permissions::PROJECT_PERIODS_EDIT) ?? false;
    }

    /** @return array<string, mixed> */
    public function rules(): array
    {
        /** @var ProjectPeriod $period */
        $period = $this->route('project_period');

        return [
            'name' => [
                'required',
                'string',
                'max:255',
                Rule::unique('project_periods', 'name')
                    ->where(fn ($query) => $query->where('project_type_id', $period->project_type_id))
                    ->ignore($period->id),
            ],
            'starts_at' => ['required', 'date'],
            'ends_at' => ['required', 'date', 'after_or_equal:starts_at'],
            'advisor_default_capacity' => ['nullable', 'integer', 'min:1', 'max:100'],
            'status' => ['sometimes', Rule::enum(ProjectPeriodStatus::class)],
        ];
    }
}
