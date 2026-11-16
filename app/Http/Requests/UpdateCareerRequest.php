<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateCareerRequest extends FormRequest
{
    public function authorize(): bool
    {
        return $this->user()?->can('careers.edit') ?? false;
    }

    /** @return array<string, mixed> */
    public function rules(): array
    {
        return [
            'name' => ['required', 'string', 'max:255'],
            'description' => ['nullable', 'string'],
            'image_path' => ['nullable', 'string', 'max:255'],
            'show_on_home' => ['nullable', 'boolean'],
            'sort_order' => ['required', 'integer', 'min:0'],
        ];
    }
}