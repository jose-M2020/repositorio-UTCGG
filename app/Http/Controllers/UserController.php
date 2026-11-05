<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreUserRequest;
use App\Http\Requests\UpdateUserRequest;
use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Routing\Controllers\HasMiddleware;
use Illuminate\Routing\Controllers\Middleware;
use Inertia\Inertia;
use Inertia\Response;
use Spatie\Permission\Models\Role;

class UserController extends Controller implements HasMiddleware
{
    public static function middleware(): array
    {
        return [
            'auth',
            new Middleware('can:usuarios.index', only: ['index']),
            new Middleware('can:usuarios.create', only: ['create', 'store']),
            new Middleware('can:usuarios.edit', only: ['edit', 'update']),
            new Middleware('can:usuarios.destroy', only: ['destroy']),
        ];
    }

    public function index(Request $request): Response
    {
        $users = User::query()
            ->with('roles:id,name')
            ->latest('id')
            ->when($request->string('query')->toString(), function ($query, string $search): void {
                $query->where(function ($inner) use ($search): void {
                    $inner->where('nombre', 'like', "%{$search}%")
                        ->orWhere('apellido', 'like', "%{$search}%")
                        ->orWhere('email', 'like', "%{$search}%");
                });
            })
            ->when($request->filled('carrera'), fn ($query) => $query->where('carrera', $request->string('carrera')->toString()))
            ->when(
                $request->filled('rol') && $request->string('rol')->toString() !== 'all',
                fn ($query) => $query->role($request->string('rol')->toString()),
            )
            ->paginate(10, ['id', 'nombre', 'apellido', 'email', 'carrera', 'created_at'])
            ->withQueryString();

        return Inertia::render('users/index', [
            'users' => $users,
            'filters' => [
                'query' => $request->string('query')->toString(),
                'carrera' => $request->string('carrera')->toString(),
                'rol' => $request->string('rol')->toString() ?: 'all',
            ],
            'roles' => Role::query()->orderBy('name')->pluck('name'),
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('users/create', [
            'roles' => $this->availableRolesFor(auth()->user()),
        ]);
    }

    public function store(StoreUserRequest $request): RedirectResponse
    {
        $data = $request->safe()->except(['rol']);
        $user = User::query()->create($data);
        $user->assignRole($request->string('rol')->toString());

        return redirect()
            ->route('usuarios.index')
            ->with('status', 'Usuario registrado exitosamente.');
    }

    public function show(User $user): Response
    {
        $user->load('roles:id,name');

        return Inertia::render('users/show', [
            'user' => [
                'id' => $user->id,
                'nombre' => $user->nombre,
                'apellido' => $user->apellido,
                'email' => $user->email,
                'carrera' => $user->carrera,
                'roles' => $user->getRoleNames()->values()->all(),
                'created_at' => $user->created_at?->toDateTimeString(),
            ],
        ]);
    }

    public function edit(User $user): Response
    {
        $user->load('roles:id,name');

        return Inertia::render('users/edit', [
            'user' => [
                'id' => $user->id,
                'nombre' => $user->nombre,
                'apellido' => $user->apellido,
                'email' => $user->email,
                'carrera' => $user->carrera,
                'rol' => $user->getRoleNames()->first(),
            ],
            'roles' => $this->availableRolesFor(auth()->user()),
        ]);
    }

    public function update(UpdateUserRequest $request, User $user): RedirectResponse
    {
        $data = $request->safe()->except(['rol', 'password']);

        if ($request->filled('password')) {
            $data['password'] = $request->string('password')->toString();
        }

        $user->update($data);

        $role = $request->string('rol')->toString();
        if ($user->getRoleNames()->first() !== $role) {
            $user->syncRoles([$role]);
        }

        return redirect()
            ->route('usuarios.index')
            ->with('status', 'Usuario actualizado exitosamente.');
    }

    public function destroy(User $user): RedirectResponse
    {
        $user->delete();

        return redirect()
            ->route('usuarios.index')
            ->with('status', 'Usuario eliminado exitosamente.');
    }

    /**
     * @return list<string>
     */
    private function availableRolesFor(?User $actor): array
    {
        $roles = Role::query()->orderBy('name')->pluck('name')->all();

        if ($actor && ! $actor->hasRole('admin')) {
            return array_values(array_filter($roles, fn (string $role): bool => $role !== 'admin'));
        }

        return $roles;
    }
}
