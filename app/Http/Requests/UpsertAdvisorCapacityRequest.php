<?php

namespace App\Http\Requests;

use App\Support\Permissions;
use Illuminate\Foundation\Http\FormRequest;

class UpsertAdvisorCapacityRequest extends FormRequest
{
    public function authorize(): bool
    {
        return $this->user()?->can(Permissions::ADVISORS_CAPACITY_MANAGE) ?? false;
    }

    /** @return array<string, mixed> */
    public function rules(): array
    {
        return [
            'user_id' => ['required', 'integer', 'exists:users,id'],
            'max_projects' => ['nullable', 'integer', 'min:0', 'max:100'],
            'is_available' => ['required', 'boolean'],
            'notes' => ['nullable', 'string', 'max:255'],
        ];
    }

    protected function prepareForValidation(): void
    {
        if ($this->has('is_available')) {
            $this->merge([
                'is_available' => filter_var($this->input('is_available'), FILTER_VALIDATE_BOOLEAN, FILTER_NULL_ON_FAILURE)
                    ?? $this->boolean('is_available'),
            ]);
        }
    }
}
