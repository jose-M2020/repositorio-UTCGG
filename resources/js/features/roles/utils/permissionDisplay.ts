import type { RolePermission } from "../types";

export type PartitionedPermissions = {
  management: RolePermission[];
  assign: RolePermission[];
  career: RolePermission[];
};

const MODULE_LABELS: Record<string, string> = {
  usuarios: "Usuarios",
  roles: "Roles",
  catalogos: "Catalogos",
  repositorios: "Repositorios",
  archivos: "Archivos",
};

const ACTION_LABELS: Record<string, string> = {
  index: "Ver",
  create: "Crear",
  edit: "Editar",
  destroy: "Eliminar",
  search: "Buscar",
};

const toWords = (value: string): string =>
  value
    .replaceAll("_", " ")
    .split(" ")
    .map((word) =>
      word.length > 0
        ? word[0].toUpperCase() + word.slice(1).toLowerCase()
        : word,
    )
    .join(" ")
    .trim();

const moduleFromPermission = (permissionName: string): string =>
  permissionName.split(".")[0] ?? permissionName;

const actionFromPermission = (permissionName: string): string =>
  permissionName.split(".")[1] ?? permissionName;

const assignRoleFromPermission = (permissionName: string): string => {
  const roleName = permissionName.split(".assign.")[1];

  return roleName ? toWords(roleName) : permissionName;
};

export const moduleLabel = (moduleName: string): string =>
  MODULE_LABELS[moduleName] ?? toWords(moduleName);

export const partitionPermissions = (
  permissions: RolePermission[],
): PartitionedPermissions =>
  permissions.reduce<PartitionedPermissions>(
    (acc, permission) => {
      if (permission.name.includes(".assign.")) {
        acc.assign.push(permission);

        return acc;
      }

      if (permission.name.endsWith(".career.any")) {
        acc.career.push(permission);

        return acc;
      }

      acc.management.push(permission);

      return acc;
    },
    {
      management: [],
      assign: [],
      career: [],
    },
  );

export const permissionLabel = (permission: RolePermission): string => {
  if (permission.description) {
    return permission.description;
  }

  if (permission.name.includes(".assign.")) {
    return `Asignar rol ${assignRoleFromPermission(permission.name)}`;
  }

  if (permission.name.endsWith(".career.any")) {
    return "Puede elegir cualquier carrera";
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
