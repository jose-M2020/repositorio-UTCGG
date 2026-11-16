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
        $careerCode = $user?->careerCode();

        return [
            ...parent::share($request),
            'name' => config('app.name'),
            'auth' => [
                'user' => $user
                    ? [
                        'id' => $user->id,
                        'first_name' => $user->first_name,
                        'last_name' => $user->last_name,
                        'second_last_name' => $user->second_last_name,
                        'email' => $user->email,
                        'career' => $careerCode,
                        'roles' => $user->getRoleNames()->values()->all(),
                    ]
                    : null,
                'abilities' => [
                    'repositories.create' => $user?->can('repositories.create') ?? false,
                    'users.view' => $user?->can('users.index') ?? false,
                    'users.create' => $user?->can('users.create') ?? false,
                    'users.edit' => $user?->can('users.edit') ?? false,
                    'users.toggle-active' => $user?->can('users.toggle-active') ?? false,
                    'users.update-role' => $user?->can('users.update-role') ?? false,
                    'users.password-link' => $user?->can('users.password-link') ?? false,
                    'users.destroy' => $user?->can('users.destroy') ?? false,
                    'roles.view' => $user?->can('roles.index') ?? false,
                    'careers.view' => $user?->can('careers.index') ?? false,
                    'careers.create' => $user?->can('careers.create') ?? false,
                    'careers.edit' => $user?->can('careers.edit') ?? false,
                    'careers.toggle-active' => $user?->can('careers.toggle-active') ?? false,
                    'careers.destroy' => $user?->can('careers.destroy') ?? false,
                    'project_types.view' => $user?->can('project_types.index') ?? false,
                    'project_types.create' => $user?->can('project_types.create') ?? false,
                    'project_types.edit' => $user?->can('project_types.edit') ?? false,
                    'project_types.toggle-active' => $user?->can('project_types.toggle-active') ?? false,
                    'project_types.destroy' => $user?->can('project_types.destroy') ?? false,
                    'education_levels.view' => $user?->can('education_levels.index') ?? false,
                    'education_levels.create' => $user?->can('education_levels.create') ?? false,
                    'education_levels.edit' => $user?->can('education_levels.edit') ?? false,
                    'education_levels.toggle-active' => $user?->can('education_levels.toggle-active') ?? false,
                    'education_levels.destroy' => $user?->can('education_levels.destroy') ?? false,
                ],
            ],
            'flash' => [
                'status' => fn () => $request->session()->get('status'),
                'error' => fn () => $request->session()->get('error'),
            ],
            'sidebarOpen' => ! $request->hasCookie('sidebar_state')
                || $request->cookie('sidebar_state') === 'true',
        ];
    }
}
