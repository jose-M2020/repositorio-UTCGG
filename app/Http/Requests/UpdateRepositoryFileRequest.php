<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateRepositoryFileRequest extends FormRequest
{
    public function authorize(): bool
    {
        return $this->user()?->can('archivos.edit') ?? false;
    }

    /**
     * @return array<string, mixed>
     */
    public function rules(): array
    {
        return [
            'is_public' => ['required', 'boolean'],
        ];
    }
}
