<?php

namespace App\Http\Requests;

use App\Models\Catalog;
use App\Support\UserRoles;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StoreUserRequest extends FormRequest
{
    public function authorize(): bool
    {
        return $this->user()?->can('users.create') ?? false;
    }

    protected function prepareForValidation(): void
    {
        $authUser = $this->user();
        $authUser?->loadMissing('careerCatalog:id,code');
        $role = $this->string('role')->toString();

        if (
            UserRoles::requiresCareer($role)
            && ! UserRoles::canSelectCareer($authUser)
            && $authUser?->careerCatalog?->code
        ) {
            $this->merge([
                'career' => $authUser->careerCatalog->code,
            ]);
        }

        if ($role !== '' && ! UserRoles::requiresCareer($role)) {
            $this->merge([
                'career' => null,
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
        $role = $this->string('role')->toString();
        $careerRequired = UserRoles::requiresCareer($role)
            && (UserRoles::canSelectCareer($authUser) || UserRoles::isCareerScoped($authUser));

        return [
            'first_name' => ['required', 'string', 'max:255'],
            'last_name' => ['required', 'string', 'max:255'],
            'second_last_name' => ['nullable', 'string', 'max:255'],
            'email' => ['required', 'string', 'email', 'max:255', 'unique:users,email'],
            'career' => [
                $careerRequired ? 'required' : 'nullable',
                'string',
                'max:20',
                Rule::exists('catalogs', 'code')->where(fn ($query) => $query
                    ->where('type', Catalog::TYPE_CAREER)
                    ->where('is_active', true)),
            ],
            'role' => ['required', 'string', Rule::in($assignableRoles)],
        ];
    }

    /**
     * @return array<string, string>
     */
    public function messages(): array
    {
        return [
            'role.in' => 'No tienes permiso para asignar ese rol.',
        ];
    }
}
