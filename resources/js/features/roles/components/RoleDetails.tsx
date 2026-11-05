import type { RoleDetails as RoleDetailsType } from '../types';

type RoleDetailsProps = {
    role: RoleDetailsType;
};

export const RoleDetails = ({ role }: RoleDetailsProps) => {
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
                    <ul className="space-y-2">
                        {role.permissions.map((permission) => (
                            <li
                                key={permission.id}
                                className="rounded-lg border border-slate-200 px-3 py-2 text-sm dark:border-slate-800"
                            >
                                <p className="font-medium">{permission.name}</p>
                                {permission.description ? (
                                    <p className="text-xs text-slate-500">
                                        {permission.description}
                                    </p>
                                ) : null}
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
};
