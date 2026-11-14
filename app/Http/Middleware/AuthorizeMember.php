<?php

namespace App\Http\Middleware;

use App\Models\Repository;
use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class AuthorizeMember
{
    /**
     * @param  Closure(Request): Response  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $user = $request->user();
        /** @var Repository|null $repository */
        $repository = $request->route('repository');

        if (! $user || ! $repository instanceof Repository) {
            abort(403);
        }

        if ($user->hasRole('admin') || $repository->users()->whereKey($user->id)->exists()) {
            return $next($request);
        }

        abort(403);
    }
}
