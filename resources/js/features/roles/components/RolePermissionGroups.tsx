import { useState } from 'react';
import { Checkbox } from '@/shared/components/ui/checkbox';
import type { PermissionGroups, RoleFormErrors } from '../types';
import {
    moduleLabel,
    partitionPermissions,
    permissionLabel,
} from '../lib/permissionDisplay';

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

    const isAllChecked = (permissions: { name: string }[]): boolean =>
        permissions.length > 0 &&
        permissions.every((permission) => checkedState.has(permission.name));

    const isIndeterminate = (permissions: { name: string }[]): boolean =>
        permissions.some((permission) => checkedState.has(permission.name)) &&
        !isAllChecked(permissions);

    return (
        <div className="space-y-4">
            <p className="text-sm font-medium text-foreground">Permisos</p>
            {groups.map(([group, permissions]) => {
                const partitioned = partitionPermissions(permissions);
                const hasSpecialSections =
                    partitioned.assign.length > 0 ||
                    partitioned.career.length > 0;

                return (
                    <fieldset
                        key={group}
                        className="space-y-3 rounded-lg border border-border p-4 shadow-sm"
                    >
                        <legend className="px-1 text-sm font-semibold text-foreground capitalize">
                            {moduleLabel(group)}
                        </legend>
                        {hasSpecialSections ? (
                            <div className="space-y-4">
                                <PermissionSection
                                    title="Gestion"
                                    description="Permisos base para ver y administrar este modulo."
                                    permissions={partitioned.management}
                                    isAllChecked={isAllChecked}
                                    isIndeterminate={isIndeterminate}
                                    checkedState={checkedState}
                                    onToggleGroup={handleToggleGroup}
                                    onTogglePermission={handleTogglePermission}
                                />
                                <PermissionSection
                                    title="Roles que puede asignar"
                                    description="Al crear o editar usuarios, este rol podra asignar estos roles."
                                    permissions={partitioned.assign}
                                    isAllChecked={isAllChecked}
                                    isIndeterminate={isIndeterminate}
                                    checkedState={checkedState}
                                    onToggleGroup={handleToggleGroup}
                                    onTogglePermission={handleTogglePermission}
                                />
                                <PermissionSection
                                    title="Alcance de carrera"
                                    description="Define si puede elegir cualquier carrera o se fuerza su carrera."
                                    permissions={partitioned.career}
                                    isAllChecked={isAllChecked}
                                    isIndeterminate={isIndeterminate}
                                    checkedState={checkedState}
                                    onToggleGroup={handleToggleGroup}
                                    onTogglePermission={handleTogglePermission}
                                />
                            </div>
                        ) : (
                            <PermissionSection
                                title={`Permisos de ${moduleLabel(group).toLowerCase()}`}
                                permissions={permissions}
                                isAllChecked={isAllChecked}
                                isIndeterminate={isIndeterminate}
                                checkedState={checkedState}
                                onToggleGroup={handleToggleGroup}
                                onTogglePermission={handleTogglePermission}
                            />
                        )}
                    </fieldset>
                );
            })}
            {errors?.permissions ? (
                <p className="text-sm text-destructive">{errors.permissions}</p>
            ) : null}
        </div>
    );
};

type PermissionSectionProps = {
    title: string;
    description?: string;
    permissions: { id: number; name: string; description: string | null }[];
    checkedState: Set<string>;
    isAllChecked: (permissions: { name: string }[]) => boolean;
    isIndeterminate: (permissions: { name: string }[]) => boolean;
    onToggleGroup: (permissions: { name: string }[]) => void;
    onTogglePermission: (name: string, checked: boolean) => void;
};

const PermissionSection = ({
    title,
    description,
    permissions,
    checkedState,
    isAllChecked,
    isIndeterminate,
    onToggleGroup,
    onTogglePermission,
}: PermissionSectionProps) => {
    if (permissions.length === 0) {
        return null;
    }

    return (
        <section className="space-y-3">
            <div className="space-y-1 border-b border-border pb-2">
                <p className="text-sm font-medium text-foreground">{title}</p>
                {description ? (
                    <p className="text-xs text-muted-foreground">
                        {description}
                    </p>
                ) : null}
                <label className="mt-2 inline-flex items-center gap-2 text-sm text-foreground">
                    <Checkbox
                        checked={isAllChecked(permissions)}
                        indeterminate={isIndeterminate(permissions)}
                        onCheckedChange={() => onToggleGroup(permissions)}
                    />
                    <span>Seleccionar todos</span>
                </label>
            </div>

            <div className="grid gap-x-4 gap-y-3 sm:grid-cols-2 md:grid-cols-3">
                {permissions.map((permission) => (
                    <label
                        key={permission.id}
                        className="flex items-start gap-2 text-sm text-foreground"
                    >
                        <Checkbox
                            name="permissions[]"
                            value={permission.name}
                            checked={checkedState.has(permission.name)}
                            onCheckedChange={(checked) =>
                                onTogglePermission(permission.name, checked)
                            }
                            className="mt-0.5"
                        />
                        <span>
                            <span className="font-medium">
                                {permissionLabel(permission)}
                            </span>
                            <span className="block text-xs text-muted-foreground">
                                {permission.name}
                            </span>
                        </span>
                    </label>
                ))}
            </div>
        </section>
    );
};
