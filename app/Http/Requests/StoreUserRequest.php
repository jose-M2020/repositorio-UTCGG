<?php

namespace App\Http\Requests;

use App\Enums\AcademicStatus;
use App\Enums\UserType;
use App\Models\Career;
use App\Support\Permissions;
use App\Support\UserRoles;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StoreUserRequest extends FormRequest
{
    public function authorize(): bool
    {
        return $this->user()?->can(Permissions::USERS_CREATE) ?? false;
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
                    UserRoles::STUDENT => UserType::Academic->value,
                    UserRoles::TEACHER, UserRoles::CAREER_DIRECTOR => UserType::Workforce->value,
                    default => UserType::Staff->value,
                },
            ]);
        }

        $resolvedType = $this->string('user_type')->toString();
        $needsCareer = in_array($resolvedType, [UserType::Academic->value, UserType::Workforce->value], true);

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

        if ($resolvedType === UserType::Academic->value && ! $this->filled('academic_status')) {
            $this->merge(['academic_status' => AcademicStatus::Active->value]);
        }

        $this->mergePrimaryCareerFromCareers();
    }

    private function mergePrimaryCareerFromCareers(): void
    {
        if ($this->filled('career') || $this->filled('career_id')) {
            return;
        }

        $careers = $this->input('careers');
        if (! is_array($careers) || $careers === []) {
            return;
        }

        $first = $careers[0] ?? null;
        if (! is_array($first) || ! isset($first['career_id'])) {
            return;
        }

        $careerId = (int) $first['career_id'];
        $code = Career::query()->whereKey($careerId)->value('code');

        $this->merge([
            'career_id' => $careerId,
            'career' => is_string($code) ? $code : null,
        ]);
    }

    /**
     * @return array<string, mixed>
     */
    public function rules(): array
    {
        $authUser = $this->user();
        $assignableRoles = UserRoles::assignableBy($authUser);
        $userType = $this->string('user_type')->toString();
        $careerRequired = in_array($userType, [UserType::Academic->value, UserType::Workforce->value], true)
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
                Rule::requiredIf($careerRequired && ! $this->filled('career_id') && ! $this->filled('careers')),
                'nullable',
                'string',
                'max:20',
                Rule::exists('careers', 'code')->where(fn ($query) => $query->where('is_active', true)),
            ],
            'career_id' => [
                Rule::requiredIf($careerRequired && ! $this->filled('career') && ! $this->filled('careers')),
                'nullable',
                'integer',
                Rule::exists('careers', 'id')->where(fn ($query) => $query->where('is_active', true)),
            ],
            'careers' => [
                Rule::requiredIf($careerRequired && $userType === UserType::Workforce->value && ! $this->filled('career') && ! $this->filled('career_id')),
                'nullable',
                'array',
                'min:1',
            ],
            'student_number' => [
                Rule::requiredIf($userType === UserType::Academic->value && $this->boolean('require_profile_ids')),
                'nullable',
                'string',
                'max:20',
                'unique:student_profiles,student_number',
            ],
            'academic_status' => [
                Rule::requiredIf($userType === UserType::Academic->value),
                'nullable',
                Rule::enum(AcademicStatus::class),
            ],
            'education_level_id' => [
                'nullable',
                'integer',
                Rule::exists('education_levels', 'id')->where(fn ($query) => $query->where('is_active', true)),
            ],
            'employee_number' => [
                Rule::requiredIf($userType === UserType::Workforce->value && $this->boolean('require_profile_ids')),
                'nullable',
                'string',
                'max:20',
            ],
            'can_be_advisor' => [
                'nullable',
                'boolean',
            ],
            'job_title' => [
                Rule::requiredIf($userType === UserType::Staff->value),
                'nullable',
                'string',
                'max:255',
            ],
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
