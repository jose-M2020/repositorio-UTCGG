<?php

namespace App\Http\Requests;

use App\Models\Catalog;
use App\Support\UserRoles;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;
use Illuminate\Validation\Rules\Password;

class StoreUserRequest extends FormRequest
{
    public function authorize(): bool
    {
        return $this->user()?->can('usuarios.create') ?? false;
    }

    protected function prepareForValidation(): void
    {
        $authUser = $this->user();
        $authUser?->loadMissing('careerCatalog:id,code');

        if (! UserRoles::canSelectCareer($authUser) && $authUser?->careerCatalog?->code) {
            $this->merge([
                'carrera' => $authUser->careerCatalog->code,
            ]);
        }
    }

    /**
     * @return array<string, mixed>
     */
    public function rules(): array
    {
        $authUser = $this->user();
        $assignableRoles = UserRoles::assignableBy($authUser);
        $careerRequired = UserRoles::canSelectCareer($authUser)
            || UserRoles::isCareerScoped($authUser);

        return [
            'nombre' => ['required', 'string', 'max:255'],
            'apellido' => ['required', 'string', 'max:255'],
            'email' => ['required', 'string', 'email', 'max:255', 'unique:users,email'],
            'password' => ['required', 'confirmed', Password::defaults()],
            'carrera' => [
                $careerRequired ? 'required' : 'nullable',
                'string',
                'max:20',
                Rule::exists('catalogs', 'code')->where(fn ($query) => $query
                    ->where('type', Catalog::TYPE_CAREER)
                    ->where('is_active', true)),
            ],
            'rol' => ['required', 'string', Rule::in($assignableRoles)],
        ];
    }

    /**
     * @return array<string, string>
     */
    public function messages(): array
    {
        return [
            'rol.in' => 'No tienes permiso para asignar ese rol.',
        ];
    }
}
