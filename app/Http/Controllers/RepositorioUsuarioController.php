<?php

namespace App\Http\Controllers;

use App\Http\Middleware\AuthorizeMember;
use App\Http\Requests\StoreRepositorioMemberRequest;
use App\Models\Repositorio;
use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Illuminate\Routing\Controllers\HasMiddleware;

class RepositorioUsuarioController extends Controller implements HasMiddleware
{
    public static function middleware(): array
    {
        return [
            'auth',
            AuthorizeMember::class,
        ];
    }

    public function store(StoreRepositorioMemberRequest $request, Repositorio $repositorio): RedirectResponse
    {
        $repositorio->users()->syncWithoutDetaching($request->input('user_ids', []));

        return redirect()
            ->route('repositorios.user.show', $repositorio)
            ->with('status', 'Miembros agregados.');
    }

    public function destroy(Repositorio $repositorio, User $user): RedirectResponse
    {
        $repositorio->users()->detach($user->id);

        return redirect()
            ->route('repositorios.user.show', $repositorio)
            ->with('status', 'Miembro removido.');
    }
}
