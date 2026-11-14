<?php

namespace App\Actions\Users;

use App\Enums\UserAccountStatus;
use App\Models\User;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\ValidationException;

final class ToggleUserActive
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
                'user' => 'No puedes desactivar tu propia cuenta.',
            ]);
        }

        if (! $user->status->canToggleActive()) {
            throw ValidationException::withMessages([
                'user' => 'La cuenta aún está pendiente de activación.',
            ]);
        }

        $nextStatus = $user->status === UserAccountStatus::Active
            ? UserAccountStatus::Inactive
            : UserAccountStatus::Active;

        $user->update([
            'status' => $nextStatus,
        ]);

        if ($nextStatus === UserAccountStatus::Inactive) {
            DB::table('sessions')->where('user_id', $user->id)->delete();
        }

        return [
            'user' => $user->refresh(),
            'message' => $nextStatus === UserAccountStatus::Active
                ? 'Usuario activado exitosamente.'
                : 'Usuario desactivado exitosamente.',
        ];
    }
}
