<?php

namespace App\Http\Requests;

use App\Support\Permissions;
use App\Support\UserRoles;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;
use Illuminate\Validation\Validator;
use Spatie\Permission\Models\Role;

class UpdateRoleRequest extends FormRequest
{
    public function authorize(): bool
    {
        return $this->user()?->can(Permissions::ROLES_EDIT) ?? false;
    }

    /**
     * @return array<string, mixed>
     */
    public function rules(): array
    {
        /** @var Role $role */
        $role = $this->route('role');

        return [
            'name' => [
                'required',
                'string',
                'max:255',
                Rule::unique('roles', 'name')->ignore($role->id),
            ],
            'permissions' => ['nullable', 'array'],
            'permissions.*' => ['string', Rule::exists('permissions', 'name')],
        ];
    }

    public function withValidator(Validator $validator): void
    {
        $validator->after(function (Validator $validator): void {
            /** @var Role $role */
            $role = $this->route('role');
            $newName = $this->string('name')->toString();

            if (UserRoles::isSystem($role->name) && $newName !== $role->name) {
                $validator->errors()->add(
                    'name',
                    'No se puede cambiar el nombre de un rol del sistema.',
                );
            }
        });
    }
}
