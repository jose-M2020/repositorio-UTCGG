import { useState } from 'react';
import { Checkbox } from '@/shared/components/ui/checkbox';
import type { PermissionGroups, RoleFormErrors } from '../types';

type RolePermissionGroupsProps = {
    permissionGroups: PermissionGroups;
    selected?: string[];
    errors?: RoleFormErrors;
};

export const RolePermissionGroups = ({
    permissionGroups,
    selected = [],
    errors,
}: RolePermissionGroupsProps) => {
    const groups = Object.entries(permissionGroups);
    const [checkedState, setCheckedState] = useState<Set<string>>(
        new Set(selected),
    );

    if (groups.length === 0) {
        return (
            <p className="text-sm text-muted-foreground">
                No hay permisos registrados.
            </p>
        );
    }

    const handleTogglePermission = (name: string, checked: boolean) => {
        const next = new Set(checkedState);
        if (checked) {
            next.add(name);
        } else {
            next.delete(name);
        }
        setCheckedState(next);
    };

    const handleToggleGroup = (permissions: { name: string }[]) => {
        const allNames = permissions.map((p) => p.name);
        const allChecked = allNames.every((name) => checkedState.has(name));

        const next = new Set(checkedState);
        if (allChecked) {
            allNames.forEach((name) => next.delete(name));
        } else {
            allNames.forEach((name) => next.add(name));
        }
        setCheckedState(next);
    };

    return (
        <div className="space-y-4">
            <p className="text-sm font-medium text-foreground">Permisos</p>
            {groups.map(([group, permissions]) => {
                const allChecked = permissions.every((p) =>
                    checkedState.has(p.name),
                );
                const someChecked = permissions.some((p) =>
                    checkedState.has(p.name),
                );
                const isIndeterminate = someChecked && !allChecked;

                return (
                    <fieldset
                        key={group}
                        className="space-y-3 rounded-lg border border-border p-4 shadow-sm"
                    >
                        <legend className="px-1 text-sm font-semibold text-foreground capitalize">
                            {group}
                        </legend>
                        <div className="mb-2 border-b border-border pb-2">
                            <label className="flex items-center gap-2 text-sm font-medium text-foreground">
                                <Checkbox
                                    checked={allChecked}
                                    indeterminate={isIndeterminate}
                                    onCheckedChange={() =>
                                        handleToggleGroup(permissions)
                                    }
                                />
                                <span>Seleccionar todos ({group})</span>
                            </label>
                        </div>
                        <div className="grid gap-x-4 gap-y-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                            {permissions.map((permission) => (
                                <label
                                    key={permission.id}
                                    className="flex items-start gap-2 text-sm text-foreground"
                                >
                                    <Checkbox
                                        name="permissions[]"
                                        value={permission.name}
                                        checked={checkedState.has(
                                            permission.name,
                                        )}
                                        onCheckedChange={(checked) =>
                                            handleTogglePermission(
                                                permission.name,
                                                checked,
                                            )
                                        }
                                        className="mt-0.5"
                                    />
                                    <span>
                                        <span className="font-medium">
                                            {permission.name}
                                        </span>
                                        {permission.description ? (
                                            <span className="block text-xs text-muted-foreground">
                                                {permission.description}
                                            </span>
                                        ) : null}
                                    </span>
                                </label>
                            ))}
                        </div>
                    </fieldset>
                );
            })}
            {errors?.permissions ? (
                <p className="text-sm text-destructive">{errors.permissions}</p>
            ) : null}
        </div>
    );
};
