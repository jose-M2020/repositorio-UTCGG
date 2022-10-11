<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use App\Models\Repositorio;

class AuthorizeMember
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure(\Illuminate\Http\Request): (\Illuminate\Http\Response|\Illuminate\Http\RedirectResponse)  $next
     * @return \Illuminate\Http\Response|\Illuminate\Http\RedirectResponse
     */
    public function handle(Request $request, Closure $next)
    {
        $user = auth()->user();
        $repositorio = $request->route()->parameter('repositorio');
        $usuarios = $repositorio->users()
                                ->get();
            

        if($usuarios->find($user->id) || $user->hasRole('admin') ){
            return $next($request);
        }
        
        abort(403);
    }
}
