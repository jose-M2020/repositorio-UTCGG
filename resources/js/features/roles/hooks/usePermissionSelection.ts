import { useState } from "react";
import type { RolePermission } from "../types";

type UsePermissionSelectionResult = {
  checkedState: Set<string>;
  selectedCount: number;
  togglePermission: (name: string, checked: boolean) => void;
  toggleGroup: (permissions: RolePermission[]) => void;
  isAllChecked: (permissions: RolePermission[]) => boolean;
  isIndeterminate: (permissions: RolePermission[]) => boolean;
};

export const usePermissionSelection = (
  selected: string[] = [],
): UsePermissionSelectionResult => {
  const [checkedState, setCheckedState] = useState<Set<string>>(
    () => new Set(selected),
  );

  const togglePermission = (name: string, checked: boolean) => {
    const next = new Set(checkedState);
    if (checked) {
      next.add(name);
    } else {
      next.delete(name);
    }
    setCheckedState(next);
  };

  const toggleGroup = (permissions: RolePermission[]) => {
    const names = permissions.map((permission) => permission.name);
    const allChecked = names.every((name) => checkedState.has(name));
    const next = new Set(checkedState);

    if (allChecked) {
      names.forEach((name) => next.delete(name));
    } else {
      names.forEach((name) => next.add(name));
    }

    setCheckedState(next);
  };

  const isAllChecked = (permissions: RolePermission[]): boolean =>
    permissions.length > 0 &&
    permissions.every((permission) => checkedState.has(permission.name));

  const isIndeterminate = (permissions: RolePermission[]): boolean =>
    permissions.some((permission) => checkedState.has(permission.name)) &&
    !isAllChecked(permissions);

  return {
    checkedState,
    selectedCount: checkedState.size,
    togglePermission,
    toggleGroup,
    isAllChecked,
    isIndeterminate,
  };
};
