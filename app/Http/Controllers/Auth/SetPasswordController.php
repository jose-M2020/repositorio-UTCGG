<?php

namespace App\Http\Controllers\Auth;

use App\Enums\UserAccountStatus;
use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\SetPasswordRequest;
use App\Models\User;
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
        return Inertia::render('auth/set-password', [
            'token' => $token,
            'email' => $request->string('email')->toString(),
            'purpose' => $request->string('purpose')->toString() ?: 'reset',
        ]);
    }

    public function store(SetPasswordRequest $request): RedirectResponse
    {
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

        if ($status !== Password::PASSWORD_RESET) {
            return back()->withErrors([
                'email' => __($status),
            ]);
        }

        return redirect()
            ->route('login')
            ->with('status', 'Contraseña establecida. Ya puedes iniciar sesión.');
    }
}
