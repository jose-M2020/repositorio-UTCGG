<?php

namespace App\Http\Requests;

use App\Support\Permissions;
use App\Models\User;
use App\Support\UserRoles;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;
use Illuminate\Validation\Validator;

class ChangeUserRoleRequest extends FormRequest
{
    public function authorize(): bool
    {
        return $this->user()?->can(Permissions::USERS_UPDATE_ROLE) ?? false;
    }

    /**
     * @return array<string, mixed>
     */
    public function rules(): array
    {
        $assignableRoles = UserRoles::assignableBy($this->user());

        return [
            'role' => ['required', 'string', Rule::in($assignableRoles)],
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

                $role = $this->string('role')->toString();

                if (! UserRoles::requiresCareer($role)) {
                    return;
                }

                /** @var User $user */
                $user = $this->route('user');
                $authUser = $this->user();

                if ($user->careerIds()->isNotEmpty()) {
                    return;
                }

                if (UserRoles::isCareerScoped($authUser) && $authUser?->managedCareerIds()->isNotEmpty()) {
                    return;
                }

                $validator->errors()->add(
                    'role',
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
            'role.in' => 'No tienes permiso para asignar ese rol.',
        ];
    }
}
