<?php

namespace App\Actions\Users;

use App\Enums\SetPasswordPurpose;
use App\Enums\UserAccountStatus;
use App\Models\User;
use App\Support\UserPasswordSetup;
use Illuminate\Support\Facades\Password;
use Illuminate\Validation\ValidationException;

final class SendUserPasswordLink
{
    public function __construct(
        private EnsureCanManageUser $ensureCanManageUser,
    ) {}

    /**
     * @return array{user: User, message: string}
     */
    public function handle(User $actor, User $user): array
    {
        $this->ensureCanManageUser->handle($actor, $user);

        if ($user->is($actor)) {
            throw ValidationException::withMessages([
                'user' => 'No puedes restablecer tu propia contraseña desde aquí.',
            ]);
        }

        $purpose = $user->status === UserAccountStatus::PendingActivation
            ? SetPasswordPurpose::Activation
            : SetPasswordPurpose::Reset;

        $linkStatus = UserPasswordSetup::send($user, $purpose);

        if ($linkStatus !== Password::RESET_LINK_SENT) {
            throw ValidationException::withMessages([
                'user' => 'No se pudo encolar el enlace. Intenta de nuevo en un momento.',
            ]);
        }

        return [
            'user' => $user,
            'message' => $purpose === SetPasswordPurpose::Activation
                ? 'Enlace de activación encolado. Se enviará en breve.'
                : 'Enlace para restablecer contraseña encolado. Se enviará en breve.',
        ];
    }
}
