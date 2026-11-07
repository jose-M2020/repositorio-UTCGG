import type { RoleDetails as RoleDetailsType } from '../types';
import {
    groupPermissionsByModule,
    moduleLabel,
    partitionPermissions,
    permissionLabel,
} from '../lib/permissionDisplay';

type RoleDetailsProps = {
    role: RoleDetailsType;
};

export const RoleDetails = ({ role }: RoleDetailsProps) => {
    const groupedPermissions = groupPermissionsByModule(role.permissions);
    const groups = Object.entries(groupedPermissions).sort(([left], [right]) =>
        left.localeCompare(right),
    );

    return (
        <div className="space-y-6">
            <div>
                <p className="text-sm text-slate-500">Nombre</p>
                <p className="text-lg font-semibold">{role.name}</p>
            </div>

            <div className="space-y-2">
                <p className="text-sm text-slate-500">Permisos</p>
                {role.permissions.length === 0 ? (
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                        Sin permisos asignados.
                    </p>
                ) : (
                    <div className="space-y-4">
                        {groups.map(([groupName, permissions]) => {
                            const sections = partitionPermissions(permissions);

                            return (
                                <section
                                    key={groupName}
                                    className="space-y-3 rounded-lg border border-slate-200 p-4 dark:border-slate-800"
                                >
                                    <h3 className="text-sm font-semibold text-slate-800 dark:text-slate-200">
                                        {moduleLabel(groupName)}
                                    </h3>

                                    <RoleDetailsSection
                                        title="Gestion"
                                        permissions={sections.management}
                                    />
                                    <RoleDetailsSection
                                        title="Roles que puede asignar"
                                        permissions={sections.assign}
                                    />
                                    <RoleDetailsSection
                                        title="Alcance de carrera"
                                        permissions={sections.career}
                                    />
                                </section>
                            );
                        })}
                    </div>
                )}
            </div>
        </div>
    );
};

type RoleDetailsSectionProps = {
    title: string;
    permissions: RoleDetailsType['permissions'];
};

const RoleDetailsSection = ({ title, permissions }: RoleDetailsSectionProps) => {
    if (permissions.length === 0) {
        return null;
    }

    return (
        <div className="space-y-2">
            <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
                {title}
            </p>
            <ul className="space-y-2">
                {permissions.map((permission) => (
                    <li
                        key={permission.id}
                        className="rounded-lg border border-slate-200 px-3 py-2 text-sm dark:border-slate-800"
                    >
                        <p className="font-medium">{permissionLabel(permission)}</p>
                        <p className="text-xs text-slate-500">{permission.name}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};
