<?php

namespace App\Http\Controllers\Auth;

use App\Actions\Auth\SendGuestPasswordResetLink;
use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\ForgotPasswordRequest;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

class PasswordResetLinkController extends Controller
{
    public function create(): Response
    {
        return Inertia::render('auth/forgot-password');
    }

    public function store(
        ForgotPasswordRequest $request,
        SendGuestPasswordResetLink $sendGuestPasswordResetLink,
    ): RedirectResponse {
        $sendGuestPasswordResetLink->handle(
            $request->string('email')->toString(),
        );

        return back()->with(
            'status',
            'Si el correo está registrado, te enviaremos un enlace para continuar.',
        );
    }
}
