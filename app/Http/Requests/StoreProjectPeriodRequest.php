<?php

namespace App\Http\Requests;

use App\Support\Permissions;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StoreProjectPeriodRequest extends FormRequest
{
    public function authorize(): bool
    {
        return $this->user()?->can(Permissions::PROJECT_PERIODS_CREATE) ?? false;
    }

    /** @return array<string, mixed> */
    public function rules(): array
    {
        return [
            'project_type_id' => [
                'required',
                'integer',
                Rule::exists('project_types', 'id')->where(fn ($query) => $query
                    ->where('is_active', true)
                    ->where('requires_academic_advisor', true)),
            ],
            'name' => [
                'required',
                'string',
                'max:255',
                Rule::unique('project_periods', 'name')->where(
                    fn ($query) => $query->where('project_type_id', $this->integer('project_type_id')),
                ),
            ],
            'starts_at' => ['required', 'date'],
            'ends_at' => ['required', 'date', 'after_or_equal:starts_at'],
            'advisor_default_capacity' => ['nullable', 'integer', 'min:1', 'max:100'],
        ];
    }
}
