<?php

namespace App\Http\Middleware;

use App\Enums\UserAccountStatus;
use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation\Response;

class EnsureUserIsActive
{
    /**
     * @param  Closure(Request): Response  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $user = $request->user();

        if ($user && ! $user->status->canLogin()) {
            $message = $user->status === UserAccountStatus::PendingActivation
                ? 'Tu cuenta aún no está activada. Revisa tu correo para establecer la contraseña.'
                : 'Tu cuenta está desactivada. Contacta al administrador.';

            Auth::logout();

            $request->session()->invalidate();
            $request->session()->regenerateToken();

            return redirect()
                ->route('login')
                ->withErrors([
                    'email' => $message,
                ]);
        }

        return $next($request);
    }
}
