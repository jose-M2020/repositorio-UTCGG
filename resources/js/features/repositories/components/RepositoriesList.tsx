import { Link } from '@inertiajs/react';
import { show } from '@/actions/App/Http/Controllers/RepositorioController';
import type { PaginatedRepositories } from '../types';

type RepositoriesListProps = {
    repositorios: PaginatedRepositories;
    hrefForItem?: (slug: string) => string;
};

const formatLabel = (label: string) =>
    label
        .replaceAll('&laquo;', '«')
        .replaceAll('&raquo;', '»')
        .replaceAll(/<[^>]+>/g, '');

export const RepositoriesList = ({
    repositorios,
    hrefForItem = (slug) => show.url(slug),
}: RepositoriesListProps) => {
    if (repositorios.data.length === 0) {
        return (
            <p className="rounded-xl border border-dashed border-slate-300 p-8 text-center text-sm text-slate-600 dark:border-slate-700 dark:text-slate-400">
                No hay repositorios para mostrar.
            </p>
        );
    }

    return (
        <div className="space-y-4">
            <ul className="space-y-3">
                {repositorios.data.map((repo) => (
                    <li
                        key={repo.id}
                        className="rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900"
                    >
                        <Link
                            href={hrefForItem(repo.slug)}
                            className="text-lg font-semibold text-slate-900 hover:underline dark:text-slate-100"
                        >
                            {repo.nombre_rep}
                        </Link>
                        <p className="mt-1 line-clamp-2 text-sm text-slate-600 dark:text-slate-400">
                            {repo.descripcion}
                        </p>
                        <p className="mt-2 text-xs text-slate-500">
                            {repo.carrera} · {repo.tipo_proyecto} ·{' '}
                            {repo.nivel_proyecto}
                            {repo.publico ? ' · Público' : ' · Privado'}
                        </p>
                    </li>
                ))}
            </ul>

            <div className="flex flex-wrap gap-2">
                {repositorios.links.map((link) => {
                    const label = formatLabel(link.label);
                    if (!link.url) {
                        return (
                            <span
                                key={`${label}-disabled`}
                                className="rounded-md border border-slate-200 px-3 py-1 text-sm text-slate-400"
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
                                    ? 'border-slate-900 bg-slate-900 text-white'
                                    : 'border-slate-300 text-slate-700'
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
