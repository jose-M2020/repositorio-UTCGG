<?php

namespace App\Http\Requests;

use App\Enums\UserType;
use App\Models\Career;
use App\Models\User;
use App\Support\Permissions;
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
        $needsCareer = ($userType === UserType::Academic || $userType === UserType::Workforce)
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
                'careers' => null,
            ]);
        }

        $this->mergePrimaryCareerFromCareers();
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
        $needsCareer = in_array($userType, [UserType::Academic->value, UserType::Workforce->value], true)
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
}
