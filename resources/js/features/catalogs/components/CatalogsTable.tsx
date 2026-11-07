import { Form, Link } from '@inertiajs/react';
import {
    destroy,
    edit,
    show,
} from '@/actions/App/Http/Controllers/CatalogController';
import { Button } from '@/shared/components/ui';
import type { CatalogTypesMap, PaginatedCatalogs } from '../types';

type CatalogsTableProps = {
    catalogs: PaginatedCatalogs;
    catalogTypes: CatalogTypesMap;
};

const formatLabel = (label: string) =>
    label
        .replaceAll('&laquo;', '«')
        .replaceAll('&raquo;', '»')
        .replaceAll(/<[^>]+>/g, '');

export const CatalogsTable = ({
    catalogs,
    catalogTypes,
}: CatalogsTableProps) => {
    if (catalogs.data.length === 0) {
        return (
            <p className="rounded-xl border border-dashed border-slate-300 p-8 text-center text-sm text-slate-600 dark:border-slate-700 dark:text-slate-400">
                No hay elementos de catalogo para mostrar.
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
                                Tipo
                            </th>
                            <th className="px-4 py-3 text-left font-medium">
                                Codigo
                            </th>
                            <th className="px-4 py-3 text-left font-medium">
                                Nombre
                            </th>
                            <th className="px-4 py-3 text-left font-medium">
                                Estado
                            </th>
                            <th className="px-4 py-3 text-right font-medium">
                                Acciones
                            </th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
                        {catalogs.data.map((catalog) => (
                            <tr key={catalog.id}>
                                <td className="px-4 py-3">
                                    {catalogTypes[catalog.type]}
                                </td>
                                <td className="px-4 py-3 font-medium">
                                    {catalog.code}
                                </td>
                                <td className="px-4 py-3">{catalog.name}</td>
                                <td className="px-4 py-3">
                                    {catalog.is_active ? 'Activo' : 'Inactivo'}
                                </td>
                                <td className="px-4 py-3">
                                    <div className="flex justify-end gap-2">
                                        <Link href={show.url(catalog.id)}>
                                            <Button type="button" variant="ghost">
                                                Ver
                                            </Button>
                                        </Link>
                                        <Link href={edit.url(catalog.id)}>
                                            <Button
                                                type="button"
                                                variant="outline"
                                            >
                                                Editar
                                            </Button>
                                        </Link>
                                        <Form {...destroy.form(catalog.id)}>
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
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="flex flex-wrap gap-2">
                {catalogs.links.map((link) => {
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
