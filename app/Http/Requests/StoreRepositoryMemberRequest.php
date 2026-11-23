<?php

namespace App\Http\Requests;

use App\Models\User;
use App\Support\UserRoles;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;
use Illuminate\Validation\Validator;

class StoreRepositoryMemberRequest extends FormRequest
{
    public function authorize(): bool
    {
        return $this->user() !== null;
    }

    /**
     * @return array<string, mixed>
     */
    public function rules(): array
    {
        return [
            'user_ids' => ['required', 'array', 'min:1'],
            'user_ids.*' => ['required', 'integer', 'distinct', Rule::exists('users', 'id')],
        ];
    }

    public function withValidator(Validator $validator): void
    {
        $validator->after(function (Validator $validator): void {
            /** @var list<int> $userIds */
            $userIds = array_map('intval', $this->input('user_ids', []));

            if ($userIds === []) {
                return;
            }

            $studentIds = User::query()
                ->role(UserRoles::STUDENT)
                ->whereIn('id', $userIds)
                ->pluck('id')
                ->all();

            if (count($studentIds) !== count(array_unique($userIds))) {
                $validator->errors()->add(
                    'user_ids',
                    'Solo puedes agregar alumnos como colaboradores.',
                );
            }
        });
    }
}
