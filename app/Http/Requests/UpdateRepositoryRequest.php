<?php

namespace App\Http\Requests;

use App\Models\Catalog;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateRepositoryRequest extends FormRequest
{
    public function authorize(): bool
    {
        return $this->user()?->can('repositories.edit') ?? false;
    }

    /**
     * @return array<string, mixed>
     */
    public function rules(): array
    {
        $isEstadia = $this->string('project_type')->toString() === 'internship';

        return [
            'title' => ['required', 'string', 'max:255'],
            'description' => ['required', 'string'],
            'project_type' => [
                'required',
                'string',
                'max:80',
                Rule::exists('catalogs', 'code')->where(fn ($query) => $query
                    ->where('type', Catalog::TYPE_PROJECT)
                    ->where('is_active', true)),
            ],
            'academic_degree' => [
                'required',
                'string',
                'max:80',
                Rule::exists('catalogs', 'code')->where(fn ($query) => $query
                    ->where('type', Catalog::TYPE_ACADEMIC_DEGREE)
                    ->where('is_active', true)),
            ],
            'keywords' => ['required', 'string', 'max:255'],
            'visibility' => ['required', Rule::in(['public', 'private'])],
            'career' => [
                'required',
                'string',
                'max:80',
                Rule::exists('catalogs', 'code')->where(fn ($query) => $query
                    ->where('type', Catalog::TYPE_CAREER)
                    ->where('is_active', true)),
            ],
            'company' => ['required', 'string', 'max:255'],
            'external_advisor' => [$isEstadia ? 'required' : 'nullable', 'string', 'max:255'],
            'generation' => ['required', 'string', 'max:255'],
        ];
    }
}
