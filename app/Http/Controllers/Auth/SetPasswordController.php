<?php

namespace App\Http\Controllers\Auth;

use App\Enums\UserAccountStatus;
use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\SetPasswordRequest;
use App\Models\User;
use App\Support\UserPasswordSetup;
use Illuminate\Auth\Events\PasswordReset;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Password;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Inertia\Response;

class SetPasswordController extends Controller
{
    public function create(Request $request, string $token): Response
    {
        $email = $request->string('email')->toString();
        $purpose = $request->string('purpose')->toString() ?: 'reset';

        return Inertia::render('auth/set-password', [
            'token' => $token,
            'email' => $email,
            'purpose' => $purpose,
            'linkStatus' => Inertia::defer(
                fn (): string => UserPasswordSetup::isValidLink($email, $token)
                    ? 'valid'
                    : 'invalid',
                'default',
                true,
            ),
        ]);
    }

    public function store(SetPasswordRequest $request): RedirectResponse
    {
        $token = $request->string('token')->toString();
        $email = $request->string('email')->toString();
        $purpose = $request->string('purpose')->toString() ?: 'reset';

        $status = Password::reset(
            $request->only('email', 'password', 'password_confirmation', 'token'),
            function (User $user, string $password): void {
                $nextStatus = $user->status === UserAccountStatus::PendingActivation
                    ? UserAccountStatus::Active
                    : $user->status;

                $user->forceFill([
                    'password' => $password,
                    'status' => $nextStatus,
                    'remember_token' => Str::random(60),
                ])->save();

                event(new PasswordReset($user));
            },
        );

        $redirect = redirect()->route('password.set', [
            'token' => $token,
            'email' => $email,
            'purpose' => $purpose,
        ]);

        if ($status !== Password::PASSWORD_RESET) {
            return $redirect;
        }

        return $redirect->with('status', 'password_set');
    }
}
