<?php

namespace App\Http\Requests;

use App\Support\Permissions;
use Illuminate\Foundation\Http\FormRequest;

class StoreRepositoryFilesRequest extends FormRequest
{
    public function authorize(): bool
    {
        return $this->user()?->can(Permissions::FILES_CREATE) ?? false;
    }

    /**
     * @return array<string, mixed>
     */
    public function rules(): array
    {
        return [
            'files' => ['required', 'array', 'max:5'],
            'files.*' => ['required', 'file', 'mimes:zip,rar,pdf,doc,docx', 'max:20480'],
            'images' => ['nullable', 'array', 'max:5'],
            'images.*' => ['required', 'file', 'mimes:png,jpg,jpeg,svg,webp', 'max:5120'],
        ];
    }
}
