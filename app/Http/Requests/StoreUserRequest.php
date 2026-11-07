<?php

namespace App\Http\Requests;

use App\Models\Catalog;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;
use Illuminate\Validation\Rules\Password;

class StoreUserRequest extends FormRequest
{
    public function authorize(): bool
    {
        return $this->user()?->can('usuarios.create') ?? false;
    }

    /**
     * @return array<string, mixed>
     */
    public function rules(): array
    {
        return [
            'nombre' => ['required', 'string', 'max:255'],
            'apellido' => ['required', 'string', 'max:255'],
            'email' => ['required', 'string', 'email', 'max:255', 'unique:users,email'],
            'password' => ['required', 'confirmed', Password::defaults()],
            'carrera' => [
                'required',
                'string',
                'max:20',
                Rule::exists('catalogs', 'code')->where(fn ($query) => $query
                    ->where('type', Catalog::TYPE_CAREER)
                    ->where('is_active', true)),
            ],
            'rol' => ['required', 'string', Rule::exists('roles', 'name')],
        ];
    }
}
