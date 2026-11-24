import type { RolePermission } from '../types';

export type PartitionedPermissions = {
  management: RolePermission[];
  actions: RolePermission[];
  assign: RolePermission[];
  career: RolePermission[];
};

const MODULE_LABELS: Record<string, string> = {
  users: 'Usuarios',
  roles: 'Roles',
  careers: 'Carreras',
  project_types: 'Tipos de proyecto',
  education_levels: 'Niveles educativos',
  repositories: 'Repositorios',
  files: 'Archivos',
};

const ACTION_LABELS: Record<string, string> = {
  index: 'Ver',
  create: 'Crear',
  edit: 'Editar',
  destroy: 'Eliminar',
  search: 'Buscar',
  'toggle-active': 'Activar/desactivar',
  'update-role': 'Cambiar rol',
  'password-link': 'Enviar enlace de contraseña',
};

const toWords = (value: string): string =>
  value
    .replaceAll('_', ' ')
    .split(' ')
    .map((word) =>
      word.length > 0
        ? word[0].toUpperCase() + word.slice(1).toLowerCase()
        : word,
    )
    .join(' ')
    .trim();

const moduleFromPermission = (permissionName: string): string =>
  permissionName.split('.')[0] ?? permissionName;

const actionFromPermission = (permissionName: string): string =>
  permissionName.split('.')[1] ?? permissionName;

const assignRoleFromPermission = (permissionName: string): string => {
  const roleName = permissionName.split('.assign.')[1];

  return roleName ? toWords(roleName) : permissionName;
};

const resolveSection = (
  permission: RolePermission,
): keyof PartitionedPermissions => {
  if (permission.section === 'assign' || permission.name.includes('.assign.')) {
    return 'assign';
  }

  if (
    permission.section === 'career' ||
    permission.name.endsWith('.career.any')
  ) {
    return 'career';
  }

  if (permission.section === 'action') {
    return 'actions';
  }

  return 'management';
};

export const moduleLabel = (moduleName: string): string =>
  MODULE_LABELS[moduleName] ?? toWords(moduleName);

export const partitionPermissions = (
  permissions: RolePermission[],
): PartitionedPermissions =>
  permissions.reduce<PartitionedPermissions>(
    (acc, permission) => {
      const section = resolveSection(permission);
      acc[section].push(permission);

      return acc;
    },
    {
      management: [],
      actions: [],
      assign: [],
      career: [],
    },
  );

export const permissionLabel = (permission: RolePermission): string => {
  if (permission.description) {
    return permission.description;
  }

  if (permission.name.includes('.assign.')) {
    return `Asignar rol ${assignRoleFromPermission(permission.name)}`;
  }

  if (permission.name.endsWith('.career.any')) {
    return 'Puede elegir cualquier carrera';
  }

  const action = actionFromPermission(permission.name);

  return `${ACTION_LABELS[action] ?? toWords(action)} ${moduleLabel(moduleFromPermission(permission.name)).toLowerCase()}`;
};

export const groupPermissionsByModule = (
  permissions: RolePermission[],
): Record<string, RolePermission[]> =>
  permissions.reduce<Record<string, RolePermission[]>>((acc, permission) => {
    const moduleName = moduleFromPermission(permission.name);
    acc[moduleName] = [...(acc[moduleName] ?? []), permission];

    return acc;
  }, {});
