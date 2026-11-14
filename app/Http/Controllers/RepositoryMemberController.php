<?php

namespace App\Http\Controllers;

use App\Http\Middleware\AuthorizeMember;
use App\Http\Requests\StoreRepositoryMemberRequest;
use App\Models\Repository;
use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Illuminate\Routing\Controllers\HasMiddleware;

class RepositoryMemberController extends Controller implements HasMiddleware
{
    public static function middleware(): array
    {
        return [
            'auth',
            AuthorizeMember::class,
        ];
    }

    public function store(StoreRepositoryMemberRequest $request, Repository $repository): RedirectResponse
    {
        $repository->users()->syncWithoutDetaching($request->input('user_ids', []));

        return redirect()
            ->route('repositories.account.show', $repository)
            ->with('status', 'Miembros agregados.');
    }

    public function destroy(Repository $repository, User $user): RedirectResponse
    {
        $repository->users()->detach($user->id);

        return redirect()
            ->route('repositories.account.show', $repository)
            ->with('status', 'Miembro removido.');
    }
}
