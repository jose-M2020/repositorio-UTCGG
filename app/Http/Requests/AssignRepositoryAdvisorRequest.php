<?php

namespace App\Http\Requests;

use App\Enums\AdvisorRole;
use App\Support\Permissions;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class AssignRepositoryAdvisorRequest extends FormRequest
{
    public function authorize(): bool
    {
        return $this->user()?->can(Permissions::ADVISORS_ASSIGN) ?? false;
    }

    /** @return array<string, mixed> */
    public function rules(): array
    {
        return [
            'advisor_id' => ['required', 'integer', 'exists:users,id'],
            'role' => ['nullable', Rule::enum(AdvisorRole::class)],
            'override_reason' => ['nullable', 'string', 'max:500'],
        ];
    }
}
