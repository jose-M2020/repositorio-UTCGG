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

    if (groups.length === 0) {
        return (
            <p className="text-sm text-slate-600 dark:text-slate-400">
                No hay permisos registrados.
            </p>
        );
    }

    return (
        <div className="space-y-4">
            <p className="text-sm font-medium text-slate-700 dark:text-slate-300">
                Permisos
            </p>
            {groups.map(([group, permissions]) => (
                <fieldset
                    key={group}
                    className="space-y-2 rounded-lg border border-slate-200 p-3 dark:border-slate-800"
                >
                    <legend className="px-1 text-sm font-semibold capitalize text-slate-800 dark:text-slate-200">
                        {group}
                    </legend>
                    <div className="grid gap-2 sm:grid-cols-2">
                        {permissions.map((permission) => (
                            <label
                                key={permission.id}
                                className="flex items-start gap-2 text-sm text-slate-700 dark:text-slate-300"
                            >
                                <input
                                    type="checkbox"
                                    name="permissions[]"
                                    value={permission.name}
                                    defaultChecked={selected.includes(
                                        permission.name,
                                    )}
                                    className="mt-0.5"
                                />
                                <span>
                                    <span className="font-medium">
                                        {permission.name}
                                    </span>
                                    {permission.description ? (
                                        <span className="block text-xs text-slate-500">
                                            {permission.description}
                                        </span>
                                    ) : null}
                                </span>
                            </label>
                        ))}
                    </div>
                </fieldset>
            ))}
            {errors?.permissions ? (
                <p className="text-sm text-red-600">{errors.permissions}</p>
            ) : null}
        </div>
    );
};
