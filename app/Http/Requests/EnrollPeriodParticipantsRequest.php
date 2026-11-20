<?php

namespace App\Http\Requests;

use App\Support\Permissions;
use Illuminate\Foundation\Http\FormRequest;

class EnrollPeriodParticipantsRequest extends FormRequest
{
    public function authorize(): bool
    {
        return $this->user()?->can(Permissions::PROJECT_PERIODS_EDIT) ?? false;
    }

    /** @return array<string, mixed> */
    public function rules(): array
    {
        return [
            'user_ids' => ['required', 'array', 'min:1'],
            'user_ids.*' => ['required', 'integer', 'exists:users,id'],
        ];
    }
}
