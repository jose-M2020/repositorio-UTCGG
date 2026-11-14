<?php

namespace App\Http\Requests;

use App\Models\User;
use App\Support\UserRoles;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;
use Illuminate\Validation\Validator;

class ChangeUserRoleRequest extends FormRequest
{
    public function authorize(): bool
    {
        return $this->user()?->can('usuarios.edit') ?? false;
    }

    /**
     * @return array<string, mixed>
     */
    public function rules(): array
    {
        $assignableRoles = UserRoles::assignableBy($this->user());

        return [
            'rol' => ['required', 'string', Rule::in($assignableRoles)],
        ];
    }

    /**
     * @return array<int, callable(Validator): void>
     */
    public function after(): array
    {
        return [
            function (Validator $validator): void {
                if ($validator->errors()->isNotEmpty()) {
                    return;
                }

                $role = $this->string('rol')->toString();

                if (! UserRoles::requiresCareer($role)) {
                    return;
                }

                /** @var User $user */
                $user = $this->route('user');
                $authUser = $this->user();

                if ($user->career_catalog_id) {
                    return;
                }

                if (UserRoles::isCareerScoped($authUser) && $authUser?->career_catalog_id) {
                    return;
                }

                $validator->errors()->add(
                    'rol',
                    'Asigna una carrera al usuario antes de darle este rol.',
                );
            },
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
