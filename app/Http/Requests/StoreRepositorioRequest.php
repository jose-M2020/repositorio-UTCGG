<?php

namespace App\Http\Requests;

use App\Models\Catalog;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StoreRepositorioRequest extends FormRequest
{
    public function authorize(): bool
    {
        return $this->user()?->can('repositorios.create') ?? false;
    }

    /**
     * @return array<string, mixed>
     */
    public function rules(): array
    {
        $isEstadia = $this->string('tipo_proyecto')->toString() === 'Estadía';

        return [
            'nombre_rep' => ['required', 'string', 'max:255'],
            'descripcion' => ['required', 'string'],
            'tipo_proyecto' => [
                'required',
                'string',
                'max:80',
                Rule::exists('catalogs', 'code')->where(fn ($query) => $query
                    ->where('type', Catalog::TYPE_PROJECT)
                    ->where('is_active', true)),
            ],
            'nivel_proyecto' => [
                'required',
                'string',
                'max:80',
                Rule::exists('catalogs', 'code')->where(fn ($query) => $query
                    ->where('type', Catalog::TYPE_ACADEMIC_DEGREE)
                    ->where('is_active', true)),
            ],
            'palabras_clave' => ['required', 'string', 'max:255'],
            'visibilidad' => ['required', Rule::in(['publico', 'privado'])],
            'usuario' => ['required', 'array', 'min:1', 'max:8'],
            'usuario.*' => ['required', 'string', 'email', 'distinct', 'exists:users,email'],
            'carrera' => [
                'required',
                'string',
                'max:80',
                Rule::exists('catalogs', 'code')->where(fn ($query) => $query
                    ->where('type', Catalog::TYPE_CAREER)
                    ->where('is_active', true)),
            ],
            'empresa' => ['required', 'string', 'max:255'],
            'asesor_externo' => [$isEstadia ? 'required' : 'nullable', 'string', 'max:255'],
            'generacion' => ['required', 'string', 'max:255'],
        ];
    }
}
