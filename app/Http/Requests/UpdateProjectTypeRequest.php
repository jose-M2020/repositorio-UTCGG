<?php

namespace App\Http\Requests;

use App\Support\Permissions;
use Illuminate\Foundation\Http\FormRequest;

class UpdateProjectTypeRequest extends FormRequest
{
    public function authorize(): bool
    {
        return $this->user()?->can(Permissions::PROJECT_TYPES_EDIT) ?? false;
    }

    /** @return array<string, mixed> */
    public function rules(): array
    {
        return [
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