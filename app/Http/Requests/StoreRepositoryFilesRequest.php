<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreRepositoryFilesRequest extends FormRequest
{
    public function authorize(): bool
    {
        return $this->user()?->can('archivos.create') ?? false;
    }

    /**
     * @return array<string, mixed>
     */
    public function rules(): array
    {
        return [
            'archivos' => ['required', 'array', 'max:5'],
            'archivos.*' => ['required', 'file', 'mimes:zip,rar,pdf,doc,docx', 'max:20480'],
            'imagenes' => ['nullable', 'array', 'max:5'],
            'imagenes.*' => ['required', 'file', 'mimes:png,jpg,jpeg,svg,webp', 'max:5120'],
        ];
    }
}
