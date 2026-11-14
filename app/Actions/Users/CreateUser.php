<?php

namespace App\Actions\Users;

use App\Enums\SetPasswordPurpose;
use App\Enums\UserAccountStatus;
use App\Models\User;
use App\Support\UserPasswordSetup;
use Illuminate\Support\Facades\Password;

final class CreateUser
{
    public function __construct(
        private ResolveUserCareerCatalogId $resolveCareerCatalogId,
    ) {}

    /**
     * @return array{user: User, link_status: string}
     */
    public function handle(
        User $actor,
        string $firstName,
        string $lastName,
        string $email,
        string $role,
        ?string $careerCode,
    ): array {
        $user = User::query()->create([
            'first_name' => $firstName,
            'last_name' => $lastName,
            'email' => $email,
            'password' => null,
            'status' => UserAccountStatus::PendingActivation,
            'career_catalog_id' => $this->resolveCareerCatalogId->handle(
                $actor,
                $role,
                $careerCode,
            ),
        ]);

        $user->assignRole($role);

        $linkStatus = UserPasswordSetup::send($user, SetPasswordPurpose::Activation);

        return [
            'user' => $user,
            'link_status' => $linkStatus,
        ];
    }

    public function flashMessage(string $linkStatus): string
    {
        return $linkStatus === Password::RESET_LINK_SENT
            ? 'Usuario registrado. El enlace de activación se enviará en breve.'
            : 'Usuario registrado, pero no se pudo encolar el enlace de activación. Usa “Reenviar activación”.';
    }
}
