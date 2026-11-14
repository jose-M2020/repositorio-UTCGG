<?php

namespace App\Http\Requests;

use App\Models\Catalog;
use App\Models\User;
use App\Support\UserRoles;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateUserRequest extends FormRequest
{
    public function authorize(): bool
    {
        return $this->user()?->can('usuarios.edit') ?? false;
    }

    protected function prepareForValidation(): void
    {
        $authUser = $this->user();
        $authUser?->loadMissing('careerCatalog:id,code');

        /** @var User $user */
        $user = $this->route('user');
        $role = (string) ($user->getRoleNames()->first() ?? '');

        if (
            UserRoles::requiresCareer($role)
            && ! UserRoles::canSelectCareer($authUser)
            && $authUser?->careerCatalog?->code
        ) {
            $this->merge([
                'carrera' => $authUser->careerCatalog->code,
            ]);
        }

        if ($role !== '' && ! UserRoles::requiresCareer($role)) {
            $this->merge([
                'carrera' => null,
            ]);
        }
    }

    /**
     * @return array<string, mixed>
     */
    public function rules(): array
    {
        /** @var User $user */
        $user = $this->route('user');
        $authUser = $this->user();
        $role = (string) ($user->getRoleNames()->first() ?? '');
        $careerRequired = UserRoles::requiresCareer($role)
            && (UserRoles::canSelectCareer($authUser) || UserRoles::isCareerScoped($authUser));

        return [
            'nombre' => ['required', 'string', 'max:255'],
            'apellido' => ['required', 'string', 'max:255'],
            'email' => [
                'required',
                'string',
                'email',
                'max:255',
                Rule::unique('users', 'email')->ignore($user->id),
            ],
            'carrera' => [
                $careerRequired ? 'required' : 'nullable',
                'string',
                'max:20',
                Rule::exists('catalogs', 'code')->where(fn ($query) => $query
                    ->where('type', Catalog::TYPE_CAREER)
                    ->where('is_active', true)),
            ],
        ];
    }
}
