<?php

namespace App\Http\Controllers;

use App\Actions\Auth\UpdateAccountProfile;
use App\Http\Requests\Account\UpdateAccountProfileRequest;
use App\Support\UserRoles;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class AccountSettingsController extends Controller
{
    public function edit(Request $request): Response
    {
        $user = $request->user();
        $user->loadMissing('careerCatalog:id,code,name');

        $role = (string) ($user->getRoleNames()->first() ?? '');

        return Inertia::render('panel/account/settings', [
            'account' => [
                'first_name' => $user->first_name,
                'last_name' => $user->last_name,
                'second_last_name' => $user->second_last_name,
                'email' => $user->email,
                'role' => $role !== '' ? UserRoles::label($role) : null,
                'career' => $user->careerCatalog?->name,
            ],
        ]);
    }

    public function updateProfile(
        UpdateAccountProfileRequest $request,
        UpdateAccountProfile $updateAccountProfile,
    ): RedirectResponse {
        $updateAccountProfile->handle(
            $request->user(),
            $request->string('first_name')->toString(),
            $request->string('last_name')->toString(),
            $request->string('second_last_name')->toString() ?: null,
        );

        return back()->with('status', 'Datos de la cuenta actualizados.');
    }
}
