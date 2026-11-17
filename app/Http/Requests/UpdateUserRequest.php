<?php

namespace App\Http\Requests;

use App\Support\Permissions;
use App\Enums\UserType;
use App\Models\User;
use App\Support\UserRoles;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateUserRequest extends FormRequest
{
    public function authorize(): bool
    {
        return $this->user()?->can(Permissions::USERS_EDIT) ?? false;
    }

    protected function prepareForValidation(): void
    {
        $authUser = $this->user();

        /** @var User $user */
        $user = $this->route('user');
        $role = (string) ($user->getRoleNames()->first() ?? '');
        $userType = $user->user_type;
        $needsCareer = ($userType === UserType::Student || $userType === UserType::Teacher)
            || UserRoles::requiresCareer($role);

        $lockedCode = $authUser?->careerCode();
        $lockedCareerId = $authUser?->managedCareerIds()->first()
            ?? $authUser?->primaryCareer()?->id;

        if (
            $needsCareer
            && ! UserRoles::canSelectCareer($authUser)
            && $lockedCode
        ) {
            $this->merge([
                'career' => $lockedCode,
                'career_id' => $lockedCareerId,
            ]);
        }

        if (! $needsCareer) {
            $this->merge([
                'career' => null,
                'career_id' => null,
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
        $userType = $user->user_type?->value;
        $role = (string) ($user->getRoleNames()->first() ?? '');
        $needsCareer = in_array($userType, [UserType::Student->value, UserType::Teacher->value], true)
            || UserRoles::requiresCareer($role);
        $careerRequired = $needsCareer
            && (UserRoles::canSelectCareer($authUser) || UserRoles::isCareerScoped($authUser));

        return [
            'first_name' => ['required', 'string', 'max:255'],
            'last_name' => ['required', 'string', 'max:255'],
            'second_last_name' => ['nullable', 'string', 'max:255'],
            'email' => [
                'required',
                'string',
                'email',
                'max:255',
                Rule::unique('users', 'email')->ignore($user->id),
            ],
            'phone' => ['nullable', 'string', 'max:20'],
            'career' => [
                Rule::requiredIf($careerRequired && ! $this->filled('career_id')),
                'nullable',
                'string',
                'max:20',
                Rule::exists('careers', 'code')->where(fn ($query) => $query->where('is_active', true)),
            ],
            'career_id' => [
                Rule::requiredIf($careerRequired && ! $this->filled('career')),
                'nullable',
                'integer',
                Rule::exists('careers', 'id')->where(fn ($query) => $query->where('is_active', true)),
            ],
        ];
    }
}
