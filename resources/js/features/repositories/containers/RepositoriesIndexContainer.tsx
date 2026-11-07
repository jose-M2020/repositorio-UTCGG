import type { RepositoryCatalog } from '@/shared/data/catalog';
import { RepositoriesList } from '../components/RepositoriesList';
import { RepositoryFilters } from '../components/RepositoryFilters';
import type {
    PaginatedRepositories,
    RepositoryFilters as RepositoryFiltersType,
} from '../types';

type RepositoriesIndexContainerProps = {
    repositorios: PaginatedRepositories;
    filters: RepositoryFiltersType;
    catalog: RepositoryCatalog;
};

export const RepositoriesIndexContainer = ({
    repositorios,
    filters,
    catalog,
}: RepositoriesIndexContainerProps) => {
    return (
        <main className="mx-auto w-full max-w-6xl flex-1 space-y-6 px-4 py-8">
            <header className="space-y-1">
                <h1 className="text-3xl font-semibold tracking-tight text-primary">
                    Repositorios
                </h1>
                <p className="text-sm text-muted-foreground">
                    Catálogo público de proyectos.
                </p>
            </header>

            <RepositoryFilters filters={filters} catalog={catalog}>
                <RepositoriesList
                    repositorios={repositorios}
                    filters={filters}
                />
            </RepositoryFilters>
        </main>
    );
};
