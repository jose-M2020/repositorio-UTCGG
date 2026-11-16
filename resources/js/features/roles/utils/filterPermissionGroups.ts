import type { PermissionGroups, RolePermission } from "../types";
import { permissionLabel } from "./permissionDisplay";

export const matchesPermissionSearch = (
  permission: RolePermission,
  query: string,
): boolean => {
  if (query === "") {
    return true;
  }

  const normalizedQuery = query.toLowerCase();
  const label = permissionLabel(permission).toLowerCase();

  return (
    label.includes(normalizedQuery) ||
    permission.name.toLowerCase().includes(normalizedQuery)
  );
};

export const filterPermissionGroups = (
  permissionGroups: PermissionGroups,
  query: string,
): Array<readonly [string, RolePermission[]]> => {
  const normalizedQuery = query.trim();

  return Object.entries(permissionGroups)
    .map(([moduleName, permissions]) => {
      const filteredPermissions = permissions.filter((permission) =>
        matchesPermissionSearch(permission, normalizedQuery),
      );

      return [moduleName, filteredPermissions] as const;
    })
    .filter(([, permissions]) => permissions.length > 0);
};
