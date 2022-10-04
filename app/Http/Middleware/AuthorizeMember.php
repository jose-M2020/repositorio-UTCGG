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
        $repositorio = $request->route()->parameter('repositorio');
        // dd($request)
        $usuarios = $repositorio->users()
                                ->get();

        if(($usuarios->find(auth()->user()->id)) || (auth()->user()->roles[0]->name === 'admin')){
            return $next($request);
        }
        
        abort(403);
    }
}
