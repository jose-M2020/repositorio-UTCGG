<?php

namespace App\Http\Requests;

use App\Support\Permissions;
use Illuminate\Foundation\Http\FormRequest;

class PreviewPeriodParticipantsRequest extends FormRequest
{
    public function authorize(): bool
    {
        return $this->user()?->can(Permissions::PROJECT_PERIODS_EDIT) ?? false;
    }

    /** @return array<string, mixed> */
    public function rules(): array
    {
        return [
            'career_id' => ['nullable', 'integer', 'exists:careers,id'],
            'current_term' => ['nullable', 'integer', 'min:1', 'max:20'],
            'generation' => ['nullable', 'string', 'max:9'],
        ];
    }
}
