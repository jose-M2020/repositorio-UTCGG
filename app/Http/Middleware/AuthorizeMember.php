<?php

namespace App\Http\Middleware;

use App\Models\Repositorio;
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
        /** @var Repositorio|null $repositorio */
        $repositorio = $request->route('repositorio');

        if (! $user || ! $repositorio instanceof Repositorio) {
            abort(403);
        }

        if ($user->hasRole('admin') || $repositorio->users()->whereKey($user->id)->exists()) {
            return $next($request);
        }

        abort(403);
    }
}
