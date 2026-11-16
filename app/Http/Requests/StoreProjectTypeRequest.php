<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StoreProjectTypeRequest extends FormRequest
{
    public function authorize(): bool
    {
        return $this->user()?->can('project_types.create') ?? false;
    }

    /** @return array<string, mixed> */
    public function rules(): array
    {
        return [
            'code' => ['required', 'string', 'max:40', Rule::unique('project_types', 'code')],
            'name' => ['required', 'string', 'max:255'],
            'description' => ['nullable', 'string'],
            'is_team_project' => ['nullable', 'boolean'],
            'requires_term' => ['nullable', 'boolean'],
            'requires_internship_flow' => ['nullable', 'boolean'],
            'requires_business_advisor' => ['nullable', 'boolean'],
            'sort_order' => ['required', 'integer', 'min:0'],
        ];
    }
}