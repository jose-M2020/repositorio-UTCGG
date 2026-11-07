import { Form, Link } from '@inertiajs/react';
import {
    destroy,
    edit,
    show,
} from '@/actions/App/Http/Controllers/RoleController';
import { Button } from '@/shared/components/ui';
import type { PaginatedRoles } from '../types';

type RolesTableProps = {
    roles: PaginatedRoles;
};

const formatLabel = (label: string) =>
    label
        .replaceAll('&laquo;', '«')
        .replaceAll('&raquo;', '»')
        .replaceAll(/<[^>]+>/g, '');

export const RolesTable = ({ roles }: RolesTableProps) => {
    if (roles.data.length === 0) {
        return (
            <p className="rounded-xl border border-dashed border-slate-300 p-8 text-center text-sm text-slate-600 dark:border-slate-700 dark:text-slate-400">
                No hay roles para mostrar.
            </p>
        );
    }

    return (
        <div className="space-y-4">
            <div className="overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-800">
                <table className="min-w-full divide-y divide-slate-200 text-sm dark:divide-slate-800">
                    <thead className="bg-slate-50 dark:bg-slate-900">
                        <tr>
                            <th className="px-4 py-3 text-left font-medium">
                                Rol
                            </th>
                            <th className="px-4 py-3 text-left font-medium">
                                Usuarios
                            </th>
                            <th className="px-4 py-3 text-left font-medium">
                                Permisos
                            </th>
                            <th className="px-4 py-3 text-right font-medium">
                                Acciones
                            </th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
                        {roles.data.map((role) => (
                            <tr key={role.id}>
                                <td className="px-4 py-3 font-medium">
                                    {role.name}
                                </td>
                                <td className="px-4 py-3">{role.users_count}</td>
                                <td className="px-4 py-3">
                                    {role.permissions_count}
                                </td>
                                <td className="px-4 py-3">
                                    <div className="flex justify-end gap-2">
                                        <Link href={show.url(role.id)}>
                                            <Button type="button" variant="ghost">
                                                Ver
                                            </Button>
                                        </Link>
                                        <Link href={edit.url(role.id)}>
                                            <Button
                                                type="button"
                                                variant="outline"
                                            >
                                                Editar
                                            </Button>
                                        </Link>
                                        {role.can_delete ? (
                                            <Form {...destroy.form(role.id)}>
                                                {({ processing }) => (
                                                    <Button
                                                        type="submit"
                                                        variant="destructive"
                                                        disabled={processing}
                                                    >
                                                        Eliminar
                                                    </Button>
                                                )}
                                            </Form>
                                        ) : (
                                            <Button
                                                type="button"
                                                variant="destructive"
                                                disabled
                                                title={
                                                    role.users_count > 0
                                                        ? `Asignado a ${role.users_count} usuario(s). Reasigna antes de eliminar.`
                                                        : 'Rol del sistema: no se puede eliminar.'
                                                }
                                            >
                                                Eliminar
                                            </Button>
                                        )}
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="flex flex-wrap gap-2">
                {roles.links.map((link) => {
                    const label = formatLabel(link.label);

                    if (!link.url) {
                        return (
                            <span
                                key={`${label}-disabled`}
                                className="rounded-md border border-slate-200 px-3 py-1 text-sm text-slate-400 dark:border-slate-800"
                            >
                                {label}
                            </span>
                        );
                    }

                    return (
                        <Link
                            key={`${label}-${link.url}`}
                            href={link.url}
                            className={`rounded-md border px-3 py-1 text-sm ${
                                link.active
                                    ? 'border-slate-900 bg-slate-900 text-white dark:border-slate-100 dark:bg-slate-100 dark:text-slate-900'
                                    : 'border-slate-300 text-slate-700 dark:border-slate-700 dark:text-slate-300'
                            }`}
                        >
                            {label}
                        </Link>
                    );
                })}
            </div>
        </div>
    );
};
