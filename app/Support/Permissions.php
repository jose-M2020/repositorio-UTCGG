<?php

namespace App\Support;

use App\Models\User;

/**
 * Single source of truth for static permission definitions.
 * Dynamic assign permissions stay in RoleAssignPermissionSync.
 *
 * Use the constants in controllers/requests so typos fail at compile/analysis time:
 * new Middleware(Permissions::ability(Permissions::ROLES_INDEX), only: ['index'])
 */
final class Permissions
{
    /** sections */
    public const SECTION_MANAGEMENT = 'management';
    public const SECTION_ACTION = 'action';
    public const SECTION_CAREER = 'career';
    public const SECTION_ASSIGN = 'assign';

    /** Permissions */
    public const USERS_INDEX = 'users.index';
    public const USERS_CREATE = 'users.create';
    public const USERS_EDIT = 'users.edit';
    public const USERS_TOGGLE_ACTIVE = 'users.toggle-active';
    public const USERS_UPDATE_ROLE = 'users.update-role';
    public const USERS_PASSWORD_LINK = 'users.password-link';
    public const USERS_DESTROY = 'users.destroy';
    public const USERS_SEARCH = 'users.search';
    public const USERS_CAREER_ANY = UserRoles::CAREER_ANY;
    public const ROLES_INDEX = 'roles.index';
    public const ROLES_CREATE = 'roles.create';
    public const ROLES_EDIT = 'roles.edit';
    public const ROLES_DESTROY = 'roles.destroy';
    public const CAREERS_INDEX = 'careers.index';
    public const CAREERS_CREATE = 'careers.create';
    public const CAREERS_EDIT = 'careers.edit';
    public const CAREERS_TOGGLE_ACTIVE = 'careers.toggle-active';
    public const CAREERS_DESTROY = 'careers.destroy';
    public const PROJECT_TYPES_INDEX = 'project_types.index';
    public const PROJECT_TYPES_CREATE = 'project_types.create';
    public const PROJECT_TYPES_EDIT = 'project_types.edit';
    public const PROJECT_TYPES_TOGGLE_ACTIVE = 'project_types.toggle-active';
    public const PROJECT_TYPES_DESTROY = 'project_types.destroy';
    public const EDUCATION_LEVELS_INDEX = 'education_levels.index';
    public const EDUCATION_LEVELS_CREATE = 'education_levels.create';
    public const EDUCATION_LEVELS_EDIT = 'education_levels.edit';
    public const EDUCATION_LEVELS_TOGGLE_ACTIVE = 'education_levels.toggle-active';
    public const EDUCATION_LEVELS_DESTROY = 'education_levels.destroy';
    public const REPOSITORIES_INDEX = 'repositories.index';
    public const REPOSITORIES_CREATE = 'repositories.create';
    public const REPOSITORIES_EDIT = 'repositories.edit';
    public const REPOSITORIES_DESTROY = 'repositories.destroy';
    public const FILES_INDEX = 'files.index';
    public const FILES_CREATE = 'files.create';
    public const FILES_EDIT = 'files.edit';
    public const FILES_DESTROY = 'files.destroy';

    public static function ability(string $permission): string
    {
        return 'can:'.$permission;
    }

    /**
     * @return list<array{name: string, description: string, section: string, shared_as: ?string}>
     */
    public static function definitions(): array
    {
        return [
            ['name' => self::USERS_INDEX, 'description' => 'Ver usuarios', 'section' => self::SECTION_MANAGEMENT, 'shared_as' => 'users.view'],
            ['name' => self::USERS_CREATE, 'description' => 'Crear usuario', 'section' => self::SECTION_MANAGEMENT, 'shared_as' => 'users.create'],
            ['name' => self::USERS_EDIT, 'description' => 'Editar usuario', 'section' => self::SECTION_MANAGEMENT, 'shared_as' => 'users.edit'],
            ['name' => self::USERS_TOGGLE_ACTIVE, 'description' => 'Activar/desactivar usuario', 'section' => self::SECTION_ACTION, 'shared_as' => 'users.toggle-active'],
            ['name' => self::USERS_UPDATE_ROLE, 'description' => 'Cambiar rol de usuario', 'section' => self::SECTION_ACTION, 'shared_as' => 'users.update-role'],
            ['name' => self::USERS_PASSWORD_LINK, 'description' => 'Enviar enlace de contraseña', 'section' => self::SECTION_ACTION, 'shared_as' => 'users.password-link'],
            ['name' => self::USERS_DESTROY, 'description' => 'Borrar usuario', 'section' => self::SECTION_MANAGEMENT, 'shared_as' => 'users.destroy'],
            ['name' => self::USERS_SEARCH, 'description' => 'Buscar usuarios', 'section' => self::SECTION_MANAGEMENT, 'shared_as' => null],
            ['name' => self::USERS_CAREER_ANY, 'description' => 'Seleccionar cualquier carrera al registrar usuarios', 'section' => self::SECTION_CAREER, 'shared_as' => null],

            ['name' => self::ROLES_INDEX, 'description' => 'Ver roles', 'section' => self::SECTION_MANAGEMENT, 'shared_as' => 'roles.view'],
            ['name' => self::ROLES_CREATE, 'description' => 'Crear rol', 'section' => self::SECTION_MANAGEMENT, 'shared_as' => null],
            ['name' => self::ROLES_EDIT, 'description' => 'Editar rol', 'section' => self::SECTION_MANAGEMENT, 'shared_as' => null],
            ['name' => self::ROLES_DESTROY, 'description' => 'Borrar rol', 'section' => self::SECTION_MANAGEMENT, 'shared_as' => null],

            ['name' => self::CAREERS_INDEX, 'description' => 'Ver carreras', 'section' => self::SECTION_MANAGEMENT, 'shared_as' => 'careers.view'],
            ['name' => self::CAREERS_CREATE, 'description' => 'Crear carrera', 'section' => self::SECTION_MANAGEMENT, 'shared_as' => 'careers.create'],
            ['name' => self::CAREERS_EDIT, 'description' => 'Editar carrera', 'section' => self::SECTION_MANAGEMENT, 'shared_as' => 'careers.edit'],
            ['name' => self::CAREERS_TOGGLE_ACTIVE, 'description' => 'Activar/desactivar carrera', 'section' => self::SECTION_ACTION, 'shared_as' => 'careers.toggle-active'],
            ['name' => self::CAREERS_DESTROY, 'description' => 'Borrar carrera', 'section' => self::SECTION_MANAGEMENT, 'shared_as' => 'careers.destroy'],

            ['name' => self::PROJECT_TYPES_INDEX, 'description' => 'Ver tipos de proyecto', 'section' => self::SECTION_MANAGEMENT, 'shared_as' => 'project_types.view'],
            ['name' => self::PROJECT_TYPES_CREATE, 'description' => 'Crear tipo de proyecto', 'section' => self::SECTION_MANAGEMENT, 'shared_as' => 'project_types.create'],
            ['name' => self::PROJECT_TYPES_EDIT, 'description' => 'Editar tipo de proyecto', 'section' => self::SECTION_MANAGEMENT, 'shared_as' => 'project_types.edit'],
            ['name' => self::PROJECT_TYPES_TOGGLE_ACTIVE, 'description' => 'Activar/desactivar tipo de proyecto', 'section' => self::SECTION_ACTION, 'shared_as' => 'project_types.toggle-active'],
            ['name' => self::PROJECT_TYPES_DESTROY, 'description' => 'Borrar tipo de proyecto', 'section' => self::SECTION_MANAGEMENT, 'shared_as' => 'project_types.destroy'],

            ['name' => self::EDUCATION_LEVELS_INDEX, 'description' => 'Ver niveles educativos', 'section' => self::SECTION_MANAGEMENT, 'shared_as' => 'education_levels.view'],
            ['name' => self::EDUCATION_LEVELS_CREATE, 'description' => 'Crear nivel educativo', 'section' => self::SECTION_MANAGEMENT, 'shared_as' => 'education_levels.create'],
            ['name' => self::EDUCATION_LEVELS_EDIT, 'description' => 'Editar nivel educativo', 'section' => self::SECTION_MANAGEMENT, 'shared_as' => 'education_levels.edit'],
            ['name' => self::EDUCATION_LEVELS_TOGGLE_ACTIVE, 'description' => 'Activar/desactivar nivel educativo', 'section' => self::SECTION_ACTION, 'shared_as' => 'education_levels.toggle-active'],
            ['name' => self::EDUCATION_LEVELS_DESTROY, 'description' => 'Borrar nivel educativo', 'section' => self::SECTION_MANAGEMENT, 'shared_as' => 'education_levels.destroy'],

            ['name' => self::REPOSITORIES_INDEX, 'description' => 'Ver repositorios', 'section' => self::SECTION_MANAGEMENT, 'shared_as' => null],
            ['name' => self::REPOSITORIES_CREATE, 'description' => 'Crear repositorio', 'section' => self::SECTION_MANAGEMENT, 'shared_as' => 'repositories.create'],
            ['name' => self::REPOSITORIES_EDIT, 'description' => 'Editar repositorio', 'section' => self::SECTION_MANAGEMENT, 'shared_as' => null],
            ['name' => self::REPOSITORIES_DESTROY, 'description' => 'Borrar repositorio', 'section' => self::SECTION_MANAGEMENT, 'shared_as' => null],

            ['name' => self::FILES_INDEX, 'description' => 'Ver archivos', 'section' => self::SECTION_MANAGEMENT, 'shared_as' => null],
            ['name' => self::FILES_CREATE, 'description' => 'Subir archivo', 'section' => self::SECTION_MANAGEMENT, 'shared_as' => null],
            ['name' => self::FILES_EDIT, 'description' => 'Editar archivo', 'section' => self::SECTION_MANAGEMENT, 'shared_as' => null],
            ['name' => self::FILES_DESTROY, 'description' => 'Borrar archivo', 'section' => self::SECTION_MANAGEMENT, 'shared_as' => null],
        ];
    }

    /**
     * @return list<array{name: string, description: string}>
     */
    public static function catalog(): array
    {
        return array_map(
            static fn (array $definition): array => [
                'name' => $definition['name'],
                'description' => $definition['description'],
            ],
            self::definitions(),
        );
    }

    public static function sectionFor(string $permissionName): string
    {
        if (str_contains($permissionName, '.assign.')) {
            return self::SECTION_ASSIGN;
        }

        foreach (self::definitions() as $definition) {
            if ($definition['name'] === $permissionName) {
                return $definition['section'];
            }
        }

        return self::SECTION_MANAGEMENT;
    }

    /**
     * @return array<string, bool>
     */
    public static function sharedAbilities(?User $user): array
    {
        $abilities = [];

        foreach (self::definitions() as $definition) {
            if ($definition['shared_as'] === null) {
                continue;
            }

            $abilities[$definition['shared_as']] = $user?->can($definition['name']) ?? false;
        }

        return $abilities;
    }

    /**
     * @return list<string>
     */
    public static function defaultsForRole(string $role): array
    {
        return match ($role) {
            UserRoles::DIRECTOR => [
                self::USERS_INDEX,
                self::USERS_CREATE,
                self::USERS_EDIT,
                self::USERS_TOGGLE_ACTIVE,
                self::USERS_UPDATE_ROLE,
                self::USERS_PASSWORD_LINK,
                self::USERS_DESTROY,
                self::USERS_SEARCH,
                self::USERS_CAREER_ANY,
                RoleAssignPermissionSync::permissionName(UserRoles::CAREER_DIRECTOR),
                RoleAssignPermissionSync::permissionName(UserRoles::TEACHER),
                RoleAssignPermissionSync::permissionName(UserRoles::STUDENT),
                self::REPOSITORIES_INDEX,
                self::REPOSITORIES_CREATE,
                self::REPOSITORIES_EDIT,
                self::REPOSITORIES_DESTROY,
                self::FILES_INDEX,
                self::FILES_CREATE,
                self::FILES_EDIT,
                self::FILES_DESTROY,
            ],
            UserRoles::CAREER_DIRECTOR => [
                self::USERS_INDEX,
                self::USERS_CREATE,
                self::USERS_EDIT,
                self::USERS_TOGGLE_ACTIVE,
                self::USERS_UPDATE_ROLE,
                self::USERS_PASSWORD_LINK,
                self::USERS_SEARCH,
                RoleAssignPermissionSync::permissionName(UserRoles::TEACHER),
                RoleAssignPermissionSync::permissionName(UserRoles::STUDENT),
                self::REPOSITORIES_INDEX,
                self::REPOSITORIES_CREATE,
                self::REPOSITORIES_EDIT,
                self::REPOSITORIES_DESTROY,
                self::FILES_INDEX,
                self::FILES_CREATE,
                self::FILES_EDIT,
                self::FILES_DESTROY,
            ],
            UserRoles::TEACHER => [
                self::USERS_SEARCH,
                self::REPOSITORIES_INDEX,
                self::REPOSITORIES_CREATE,
                self::REPOSITORIES_EDIT,
                self::REPOSITORIES_DESTROY,
                self::FILES_INDEX,
                self::FILES_CREATE,
                self::FILES_EDIT,
                self::FILES_DESTROY,
            ],
            UserRoles::STUDENT => [
                self::USERS_SEARCH,
                self::REPOSITORIES_INDEX,
                self::REPOSITORIES_CREATE,
                self::REPOSITORIES_EDIT,
                self::FILES_INDEX,
                self::FILES_CREATE,
                self::FILES_EDIT,
                self::FILES_DESTROY,
            ],
            default => [],
        };
    }
}
