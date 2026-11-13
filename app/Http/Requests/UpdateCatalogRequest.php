<?php

namespace App\Http\Requests;

use App\Models\Catalog;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateCatalogRequest extends FormRequest
{
    public function authorize(): bool
    {
        return $this->user()?->can('catalogos.edit') ?? false;
    }

    /** @return array<string, mixed> */
    public function rules(): array
    {
        /** @var Catalog $catalog */
        $catalog = $this->route('catalog');

        return [
            'type' => ['required', 'string', Rule::in([
                Catalog::TYPE_CAREER,
                Catalog::TYPE_PROJECT,
                Catalog::TYPE_ACADEMIC_DEGREE,
            ])],
            'code' => [
                'required',
                'string',
                'max:80',
                Rule::unique('catalogs', 'code')
                    ->ignore($catalog->id)
                    ->where(fn ($query) => $query->where('type', $this->string('type')->toString())),
            ],
            'name' => ['required', 'string', 'max:255'],
            'sort_order' => ['required', 'integer', 'min:0'],
            'meta_image' => [
                'nullable',
                'string',
                'max:255',
            ],
            'meta_show_on_home' => ['nullable', 'boolean'],
        ];
    }
}
