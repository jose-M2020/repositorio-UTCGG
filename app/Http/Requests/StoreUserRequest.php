<?php

namespace App\Http\Requests;

use App\Enums\AcademicStatus;
use App\Enums\UserType;
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

        $role = $this->string('role')->toString();
        $roles = $this->input('roles');

        if ((! is_array($roles) || $roles === []) && $role !== '') {
            $this->merge(['roles' => [$role]]);
        }

        $userType = $this->string('user_type')->toString();
        if ($userType === '' && $role !== '') {
            $this->merge([
                'user_type' => match ($role) {
                    UserRoles::STUDENT => UserType::Student->value,
                    UserRoles::TEACHER, UserRoles::CAREER_DIRECTOR => UserType::Teacher->value,
                    default => UserType::Staff->value,
                },
            ]);
        }

        $resolvedType = $this->string('user_type')->toString();
        $needsCareer = in_array($resolvedType, [UserType::Student->value, UserType::Teacher->value], true);

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

        if ($resolvedType === UserType::Staff->value) {
            $this->merge([
                'career' => null,
                'career_id' => null,
            ]);

            if (! $this->filled('job_title')) {
                $primaryRole = is_array($this->input('roles'))
                    ? (string) ($this->input('roles')[0] ?? $role)
                    : $role;
                $this->merge([
                    'job_title' => $primaryRole !== ''
                        ? UserRoles::label($primaryRole)
                        : 'Personal',
                ]);
            }
        }

        if ($resolvedType === UserType::Student->value && ! $this->filled('academic_status')) {
            $this->merge(['academic_status' => AcademicStatus::Active->value]);
        }
    }

    /**
     * @return array<string, mixed>
     */
    public function rules(): array
    {
        $authUser = $this->user();
        $assignableRoles = UserRoles::assignableBy($authUser);
        $userType = $this->string('user_type')->toString();
        $careerRequired = in_array($userType, [UserType::Student->value, UserType::Teacher->value], true)
            && (UserRoles::canSelectCareer($authUser) || UserRoles::isCareerScoped($authUser));

        return [
            'first_name' => ['required', 'string', 'max:255'],
            'last_name' => ['required', 'string', 'max:255'],
            'second_last_name' => ['nullable', 'string', 'max:255'],
            'email' => ['required', 'string', 'email', 'max:255', 'unique:users,email'],
            'phone' => ['nullable', 'string', 'max:20'],
            'user_type' => ['required', 'string', Rule::enum(UserType::class)],
            'role' => ['required_without:roles', 'nullable', 'string', Rule::in($assignableRoles)],
            'roles' => ['required_without:role', 'nullable', 'array', 'min:1'],
            'roles.*' => ['string', Rule::in($assignableRoles)],
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
            'student_number' => [
                Rule::requiredIf($userType === UserType::Student->value && $this->boolean('require_profile_ids')),
                'nullable',
                'string',
                'max:20',
                'unique:student_profiles,student_number',
            ],
            'academic_status' => [
                Rule::requiredIf($userType === UserType::Student->value),
                'nullable',
                Rule::enum(AcademicStatus::class),
            ],
            'education_level_id' => [
                'nullable',
                'integer',
                Rule::exists('education_levels', 'id')->where(fn ($query) => $query->where('is_active', true)),
            ],
            'employee_number' => [
                Rule::requiredIf($userType === UserType::Teacher->value && $this->boolean('require_profile_ids')),
                'nullable',
                'string',
                'max:20',
            ],
            'job_title' => [
                Rule::requiredIf($userType === UserType::Staff->value),
                'nullable',
                'string',
                'max:255',
            ],
            'careers' => ['nullable', 'array'],
            'careers.*.career_id' => [
                'required_with:careers',
                'integer',
                Rule::exists('careers', 'id')->where(fn ($query) => $query->where('is_active', true)),
            ],
            'careers.*.position' => ['nullable', 'string', 'max:32'],
            'careers.*.starts_at' => ['nullable', 'date'],
            'careers.*.ends_at' => ['nullable', 'date', 'after_or_equal:careers.*.starts_at'],
        ];
    }

    /**
     * @return array<string, string>
     */
    public function messages(): array
    {
        return [
            'roles.*.in' => 'No tienes permiso para asignar ese rol.',
            'role.in' => 'No tienes permiso para asignar ese rol.',
        ];
    }
}
