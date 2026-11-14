<?php

namespace App\Http\Controllers\Auth;

use App\Actions\Auth\ChangeUserPassword;
use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\ChangePasswordRequest;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Auth;

class PasswordController extends Controller
{
    public function update(
        ChangePasswordRequest $request,
        ChangeUserPassword $changeUserPassword,
    ): RedirectResponse {
        $user = $request->user();
        $password = $request->string('password')->toString();

        $changeUserPassword->handle($user, $password);

        Auth::guard('web')->logoutOtherDevices($password);
        $request->session()->regenerate();

        return back()->with('status', 'Contraseña actualizada correctamente.');
    }
}
