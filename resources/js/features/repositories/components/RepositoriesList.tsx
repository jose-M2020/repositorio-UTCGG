import { Link } from '@inertiajs/react';
import { show } from '@/actions/App/Http/Controllers/RepositorioController';
import { highlightMatch } from '@/shared/lib/highlight';
import type { PaginatedRepositories, RepositoryFilters } from '../types';

type RepositoriesListProps = {
    repositorios: PaginatedRepositories;
    filters?: Pick<RepositoryFilters, 'query' | 'search_field'>;
    hrefForItem?: (slug: string) => string;
};

const formatLabel = (label: string) =>
    label
        .replaceAll('&laquo;', '«')
        .replaceAll('&raquo;', '»')
        .replaceAll(/<[^>]+>/g, '');

export const RepositoriesList = ({
    repositorios,
    filters,
    hrefForItem = (slug) => show.url(slug),
}: RepositoriesListProps) => {
    if (repositorios.data.length === 0) {
        return (
            <p className="rounded-xl border border-dashed border-border p-8 text-center text-sm text-muted-foreground">
                No hay repositorios para mostrar.
            </p>
        );
    }

    const query = filters?.query ?? '';
    const searchField = filters?.search_field || 'title';

    return (
        <div className="space-y-4">
            <ul className="space-y-3">
                {repositorios.data.map((repo) => {
                    const authorNames =
                        repo.users
                            ?.map((user) => `${user.nombre} ${user.apellido}`)
                            .join(', ') ?? '';

                    return (
                        <li
                            key={repo.id}
                            className="rounded-xl border border-border bg-card p-4"
                        >
                            <Link
                                href={hrefForItem(repo.slug)}
                                className="text-lg font-semibold text-foreground hover:text-primary hover:underline"
                            >
                                {searchField === 'title'
                                    ? highlightMatch(repo.nombre_rep, query)
                                    : repo.nombre_rep}
                            </Link>
                            <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">
                                {searchField === 'description'
                                    ? highlightMatch(repo.descripcion, query)
                                    : repo.descripcion}
                            </p>
                            {searchField === 'author' && authorNames ? (
                                <p className="mt-1 text-sm text-foreground">
                                    {highlightMatch(authorNames, query)}
                                </p>
                            ) : null}
                            <p className="mt-2 text-xs text-muted-foreground">
                                {repo.carrera} · {repo.tipo_proyecto} ·{' '}
                                {repo.nivel_proyecto}
                                {repo.publico ? ' · Público' : ' · Privado'}
                            </p>
                        </li>
                    );
                })}
            </ul>

            <div className="flex flex-wrap gap-2">
                {repositorios.links.map((link) => {
                    const label = formatLabel(link.label);
                    if (!link.url) {
                        return (
                            <span
                                key={`${label}-disabled`}
                                className="rounded-md border border-border px-3 py-1 text-sm text-muted-foreground"
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
                                    ? 'border-primary bg-primary text-primary-foreground'
                                    : 'border-border text-foreground'
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
