<?php

namespace App\Http\Requests;

use App\Support\Permissions;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StoreRepositoryRequest extends FormRequest
{
    public function authorize(): bool
    {
        return $this->user()?->can(Permissions::REPOSITORIES_CREATE) ?? false;
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
            'member_emails' => ['nullable', 'array', 'max:8'],
            'member_emails.*' => ['required', 'string', 'email', 'distinct', 'exists:users,email'],
            'career' => [
                'required',
                'string',
                'max:80',
                Rule::exists('careers', 'code')->where(fn ($query) => $query->where('is_active', true)),
            ],
            'company' => ['nullable', 'string', 'max:255'],
            'external_advisor' => ['nullable', 'string', 'max:255'],
            'generation' => ['required', 'string', 'max:255'],
        ];
    }

    protected function prepareForValidation(): void
    {
        $this->merge([
            'company' => $this->filled('company') ? $this->string('company')->toString() : null,
            'external_advisor' => $this->filled('external_advisor')
                ? $this->string('external_advisor')->toString()
                : null,
        ]);
    }
}
