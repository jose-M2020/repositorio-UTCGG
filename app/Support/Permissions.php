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

    public const PROJECT_PERIODS_INDEX = 'project_periods.index';
    public const PROJECT_PERIODS_CREATE = 'project_periods.create';
    public const PROJECT_PERIODS_EDIT = 'project_periods.edit';
    public const PROJECT_PERIODS_DESTROY = 'project_periods.destroy';
    public const ADVISORS_CAPACITY_MANAGE = 'advisors.capacity.manage';
    public const ADVISORS_ASSIGN = 'advisors.assign';
    public const ADVISORS_OVERRIDE_CAPACITY = 'advisors.override_capacity';
    public const ADVISORS_DISTRIBUTE = 'advisors.distribute';

    public const BUSINESS_ADVISORS_SEARCH = 'business_advisors.search';
    public const BUSINESS_ADVISORS_CREATE = 'business_advisors.create';
    public const BUSINESS_ADVISORS_ATTACH = 'business_advisors.attach';
    public const BUSINESS_ADVISORS_VIEW_CONTACT = 'business_advisors.view_contact';
    public const BUSINESS_ADVISORS_VERIFY = 'business_advisors.verify';
    public const BUSINESS_ADVISORS_MERGE = 'business_advisors.merge';
    public const BUSINESS_ADVISORS_MANAGE = 'business_advisors.manage';
    public const BUSINESS_ADVISORS_VIEW_AUDIT = 'business_advisors.view_audit';
    public const BUSINESS_ADVISORS_EXPORT = 'business_advisors.export';
    public const BUSINESS_ADVISORS_PRIVACY_REQUESTS = 'business_advisors.privacy_requests';
    public const COMPANIES_CREATE = 'companies.create';
    public const COMPANIES_VERIFY = 'companies.verify';
    public const COMPANIES_MERGE = 'companies.merge';

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

            ['name' => self::PROJECT_PERIODS_INDEX, 'description' => 'Ver periodos', 'section' => self::SECTION_MANAGEMENT, 'shared_as' => 'project_periods.view'],
            ['name' => self::PROJECT_PERIODS_CREATE, 'description' => 'Crear periodo', 'section' => self::SECTION_MANAGEMENT, 'shared_as' => 'project_periods.create'],
            ['name' => self::PROJECT_PERIODS_EDIT, 'description' => 'Editar periodo, inscribir alumnos, abrir/cerrar', 'section' => self::SECTION_MANAGEMENT, 'shared_as' => 'project_periods.edit'],
            ['name' => self::PROJECT_PERIODS_DESTROY, 'description' => 'Eliminar periodo', 'section' => self::SECTION_MANAGEMENT, 'shared_as' => 'project_periods.destroy'],
            ['name' => self::ADVISORS_CAPACITY_MANAGE, 'description' => 'Configurar capacidad y disponibilidad de asesores', 'section' => self::SECTION_ACTION, 'shared_as' => 'advisors.capacity.manage'],
            ['name' => self::ADVISORS_ASSIGN, 'description' => 'Asignar, reasignar y liberar asesores', 'section' => self::SECTION_ACTION, 'shared_as' => 'advisors.assign'],
            ['name' => self::ADVISORS_OVERRIDE_CAPACITY, 'description' => 'Asignar excediendo tope o elegibilidad (exige motivo)', 'section' => self::SECTION_ACTION, 'shared_as' => 'advisors.override_capacity'],
            ['name' => self::ADVISORS_DISTRIBUTE, 'description' => 'Generar y aplicar propuestas de reparto automatico', 'section' => self::SECTION_ACTION, 'shared_as' => 'advisors.distribute'],

            ['name' => self::BUSINESS_ADVISORS_SEARCH, 'description' => 'Buscar en el catalogo de asesores empresariales', 'section' => self::SECTION_ACTION, 'shared_as' => 'business_advisors.search'],
            ['name' => self::BUSINESS_ADVISORS_CREATE, 'description' => 'Crear asesor/empresa (pendiente de revision)', 'section' => self::SECTION_ACTION, 'shared_as' => 'business_advisors.create'],
            ['name' => self::BUSINESS_ADVISORS_ATTACH, 'description' => 'Adjuntar o liberar asesor empresarial en un repositorio', 'section' => self::SECTION_ACTION, 'shared_as' => 'business_advisors.attach'],
            ['name' => self::BUSINESS_ADVISORS_VIEW_CONTACT, 'description' => 'Ver contacto completo de asesor empresarial', 'section' => self::SECTION_ACTION, 'shared_as' => 'business_advisors.view_contact'],
            ['name' => self::BUSINESS_ADVISORS_VERIFY, 'description' => 'Verificar o rechazar asesores, afiliaciones y empresas', 'section' => self::SECTION_ACTION, 'shared_as' => 'business_advisors.verify'],
            ['name' => self::BUSINESS_ADVISORS_MERGE, 'description' => 'Fusionar asesores empresariales duplicados', 'section' => self::SECTION_ACTION, 'shared_as' => 'business_advisors.merge'],
            ['name' => self::BUSINESS_ADVISORS_MANAGE, 'description' => 'Editar, inactivar o reabrir asesores empresariales', 'section' => self::SECTION_ACTION, 'shared_as' => 'business_advisors.manage'],
            ['name' => self::BUSINESS_ADVISORS_VIEW_AUDIT, 'description' => 'Ver bitacora de accesos de asesores empresariales', 'section' => self::SECTION_ACTION, 'shared_as' => 'business_advisors.view_audit'],
            ['name' => self::BUSINESS_ADVISORS_EXPORT, 'description' => 'Exportar datos de contacto de asesores empresariales', 'section' => self::SECTION_ACTION, 'shared_as' => null],
            ['name' => self::BUSINESS_ADVISORS_PRIVACY_REQUESTS, 'description' => 'Atender solicitudes ARCO de asesores empresariales', 'section' => self::SECTION_ACTION, 'shared_as' => 'business_advisors.privacy_requests'],
            ['name' => self::COMPANIES_CREATE, 'description' => 'Crear empresa (pendiente de revision)', 'section' => self::SECTION_ACTION, 'shared_as' => 'companies.create'],
            ['name' => self::COMPANIES_VERIFY, 'description' => 'Verificar o rechazar empresa', 'section' => self::SECTION_ACTION, 'shared_as' => 'companies.verify'],
            ['name' => self::COMPANIES_MERGE, 'description' => 'Fusionar empresas duplicadas', 'section' => self::SECTION_ACTION, 'shared_as' => 'companies.merge'],
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
                self::PROJECT_PERIODS_INDEX,
                self::PROJECT_PERIODS_CREATE,
                self::PROJECT_PERIODS_EDIT,
                self::PROJECT_PERIODS_DESTROY,
                self::ADVISORS_CAPACITY_MANAGE,
                self::ADVISORS_ASSIGN,
                self::ADVISORS_OVERRIDE_CAPACITY,
                self::ADVISORS_DISTRIBUTE,
                self::BUSINESS_ADVISORS_SEARCH,
                self::BUSINESS_ADVISORS_CREATE,
                self::BUSINESS_ADVISORS_ATTACH,
                self::BUSINESS_ADVISORS_VIEW_CONTACT,
                self::BUSINESS_ADVISORS_VERIFY,
                self::BUSINESS_ADVISORS_MERGE,
                self::BUSINESS_ADVISORS_MANAGE,
                self::BUSINESS_ADVISORS_VIEW_AUDIT,
                self::BUSINESS_ADVISORS_PRIVACY_REQUESTS,
                self::COMPANIES_CREATE,
                self::COMPANIES_VERIFY,
                self::COMPANIES_MERGE,
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
                self::PROJECT_PERIODS_INDEX,
                self::ADVISORS_ASSIGN,
                self::ADVISORS_DISTRIBUTE,
                self::BUSINESS_ADVISORS_SEARCH,
                self::BUSINESS_ADVISORS_CREATE,
                self::BUSINESS_ADVISORS_ATTACH,
                self::BUSINESS_ADVISORS_VIEW_CONTACT,
                self::BUSINESS_ADVISORS_VERIFY,
                self::BUSINESS_ADVISORS_MERGE,
                self::COMPANIES_CREATE,
                self::COMPANIES_VERIFY,
                self::COMPANIES_MERGE,
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
                self::BUSINESS_ADVISORS_SEARCH,
                self::BUSINESS_ADVISORS_CREATE,
                self::BUSINESS_ADVISORS_ATTACH,
                self::BUSINESS_ADVISORS_VIEW_CONTACT,
                self::BUSINESS_ADVISORS_VERIFY,
                self::COMPANIES_CREATE,
                self::COMPANIES_VERIFY,
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
                self::BUSINESS_ADVISORS_SEARCH,
                self::BUSINESS_ADVISORS_CREATE,
                self::BUSINESS_ADVISORS_ATTACH,
                self::BUSINESS_ADVISORS_VIEW_CONTACT,
                self::COMPANIES_CREATE,
            ],
            default => [],
        };
    }
}
