<?php

namespace App\Http\Middleware;

use Illuminate\Http\Request;
use Inertia\Middleware;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that's loaded on the first page visit.
     *
     * @see https://inertiajs.com/server-side-setup#root-template
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determines the current asset version.
     *
     * @see https://inertiajs.com/asset-versioning
     */
    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @see https://inertiajs.com/shared-data
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        $user = $request->user();

        return [
            ...parent::share($request),
            'name' => config('app.name'),
            'auth' => [
                'user' => $user
                    ? [
                        'id' => $user->id,
                        'nombre' => $user->nombre,
                        'apellido' => $user->apellido,
                        'email' => $user->email,
                        'carrera' => $user->carrera,
                        'roles' => $user->getRoleNames()->values()->all(),
                    ]
                    : null,
                'abilities' => [
                    'repositories.create' => $user?->can('repositorios.create') ?? false,
                    'users.view' => $user?->can('usuarios.index') ?? false,
                    'users.create' => $user?->can('usuarios.create') ?? false,
                    'roles.view' => $user?->can('roles.index') ?? false,
                ],
            ],
            'flash' => [
                'status' => fn () => $request->session()->get('status'),
            ],
            'sidebarOpen' => ! $request->hasCookie('sidebar_state')
                || $request->cookie('sidebar_state') === 'true',
        ];
    }
}
