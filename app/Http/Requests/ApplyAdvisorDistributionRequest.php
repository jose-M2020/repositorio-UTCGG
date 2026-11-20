<?php

namespace App\Http\Requests;

use App\Support\Permissions;
use Illuminate\Foundation\Http\FormRequest;

class ApplyAdvisorDistributionRequest extends FormRequest
{
    public function authorize(): bool
    {
        return $this->user()?->can(Permissions::ADVISORS_DISTRIBUTE) ?? false;
    }

    /** @return array<string, mixed> */
    public function rules(): array
    {
        return [
            'assignments' => ['required', 'array'],
            'assignments.*.repository_id' => ['required', 'integer', 'exists:repositories,id'],
            'assignments.*.advisor_id' => ['nullable', 'integer', 'exists:users,id'],
            'assignments.*.uncovered' => ['nullable', 'boolean'],
            'career_ids' => ['nullable', 'array'],
            'career_ids.*' => ['integer', 'exists:careers,id'],
        ];
    }
}
