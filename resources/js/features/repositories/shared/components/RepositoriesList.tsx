import { Link } from '@inertiajs/react';
import { show } from '@/actions/App/Http/Controllers/RepositoryController';
import { formatUserName } from '@/shared/lib';
import { highlightMatch } from '@/shared/lib/highlight';
import type { PaginatedRepositories, RepositoryFilters } from '../types';

type RepositoriesListProps = {
  repositories: PaginatedRepositories;
  filters?: Pick<RepositoryFilters, 'query' | 'search_field'>;
  hrefForItem?: (slug: string) => string;
};

const formatLabel = (label: string) =>
  label
    .replaceAll('&laquo;', '«')
    .replaceAll('&raquo;', '»')
    .replaceAll(/<[^>]+>/g, '');

export const RepositoriesList = ({
  repositories,
  filters,
  hrefForItem = (slug) => show.url(slug),
}: RepositoriesListProps) => {
  if (repositories.data.length === 0) {
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
        {repositories.data.map((repo) => {
          const authorNames =
            repo.users?.map((user) => formatUserName(user)).join(', ') ?? '';

          return (
            <li
              key={repo.id}
              className="overflow-hidden rounded-xl border border-border bg-card"
            >
              <Link
                href={hrefForItem(repo.slug)}
                className="grid gap-4 p-4 sm:grid-cols-[160px_minmax(0,1fr)]"
              >
                <img
                  src={repo.cover_url || '/img/no-image.jpg'}
                  alt=""
                  className="h-36 w-full rounded-lg object-cover sm:h-28"
                />
                <div className="min-w-0">
                  <h3 className="text-lg font-semibold text-foreground hover:text-primary">
                    {searchField === 'title'
                      ? highlightMatch(repo.title, query)
                      : repo.title}
                  </h3>
                  <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">
                    {searchField === 'description'
                      ? highlightMatch(repo.description, query)
                      : repo.description}
                  </p>
                  {searchField === 'author' && authorNames ? (
                    <p className="mt-1 text-sm text-foreground">
                      {highlightMatch(authorNames, query)}
                    </p>
                  ) : null}
                  <p className="mt-2 text-xs text-muted-foreground">
                    {repo.career} · {repo.project_type} · {repo.academic_degree}
                    {repo.is_public ? ' · Público' : ' · Privado'}
                  </p>
                </div>
              </Link>
            </li>
          );
        })}
      </ul>

      <div className="flex flex-wrap gap-2">
        {repositories.links.map((link) => {
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
