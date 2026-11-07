<?php

namespace App\Support;

use App\Models\User;
use Spatie\Permission\Models\Role;

final class UserRoles
{
    public const ADMIN = 'admin';

    public const DIRECTOR = 'director';

    public const DIRECTOR_CARRERA = 'director_carrera';

    public const DOCENTE = 'docente';

    public const ALUMNO = 'alumno';

    public const CAREER_ANY = 'usuarios.career.any';

    /**
     * @return array<string, string>
     */
    public static function labels(): array
    {
        return [
            self::ADMIN => 'Administrador',
            self::DIRECTOR => 'Director',
            self::DIRECTOR_CARRERA => 'Director de carrera',
            self::DOCENTE => 'Docente',
            self::ALUMNO => 'Alumno',
        ];
    }

    public static function label(string $role): string
    {
        return self::labels()[$role] ?? $role;
    }

    public static function assignPermissionName(string $role): string
    {
        return RoleAssignPermissionSync::permissionName($role);
    }

    public static function canSelectCareer(?User $user): bool
    {
        return $user?->can(self::CAREER_ANY) ?? false;
    }

    public static function isCareerScoped(?User $user): bool
    {
        if (! $user || self::canSelectCareer($user)) {
            return false;
        }

        return $user->can('usuarios.index')
            || $user->can('usuarios.create')
            || $user->can('usuarios.edit')
            || $user->can('usuarios.destroy');
    }

    /**
     * Roles que el usuario autenticado puede asignar al crear/editar usuarios.
     *
     * @return list<string>
     */
    public static function assignableBy(?User $authUser): array
    {
        if (! $authUser) {
            return [];
        }

        return Role::query()
            ->orderBy('name')
            ->pluck('name')
            ->map(fn ($name): string => (string) $name)
            ->filter(fn (string $role): bool => $authUser->can(self::assignPermissionName($role)))
            ->values()
            ->all();
    }

    /**
     * @return list<array{value: string, label: string}>
     */
    public static function assignableOptionsFor(?User $authUser): array
    {
        return array_map(
            fn (string $role): array => [
                'value' => $role,
                'label' => self::label($role),
            ],
            self::assignableBy($authUser),
        );
    }

    /**
     * @return list<array{value: string, label: string}>
     */
    public static function filterOptions(): array
    {
        return Role::query()
            ->orderBy('name')
            ->pluck('name')
            ->map(fn ($name): array => [
                'value' => (string) $name,
                'label' => self::label((string) $name),
            ])
            ->values()
            ->all();
    }

    /**
     * @return array{
     *     can_select_career: bool,
     *     locked_career: string|null,
     *     locked_career_label: string|null
     * }
     */
    public static function careerFormPolicyFor(?User $authUser): array
    {
        if (self::canSelectCareer($authUser)) {
            return [
                'can_select_career' => true,
                'locked_career' => null,
                'locked_career_label' => null,
            ];
        }

        $authUser?->loadMissing('careerCatalog:id,code,name');
        $code = $authUser?->careerCatalog?->code;
        $label = $authUser?->careerCatalog?->name;

        return [
            'can_select_career' => false,
            'locked_career' => $code,
            'locked_career_label' => $code && $label ? "{$code} — {$label}" : $code,
        ];
    }
}
