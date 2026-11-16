import { RepositoriesList } from '../../shared/components/RepositoriesList';
import type {
    PaginatedRepositories,
    RepositoryFilters as RepositoryFiltersType,
    RepositoryLookups,
} from '../../shared/types';
import { RepositoryFilters } from '../components/RepositoryFilters';

type RepositoriesIndexContainerProps = {
    repositories: PaginatedRepositories;
    filters: RepositoryFiltersType;
    lookups: RepositoryLookups;
};

export const RepositoriesIndexContainer = ({
    repositories,
    filters,
    lookups,
}: RepositoriesIndexContainerProps) => {
    return (
        <main className="page-container flex-1 space-y-6 py-8">
            <header className="space-y-1">
                <h1 className="text-3xl font-semibold tracking-tight text-primary">
                    Repositorios
                </h1>
                <p className="text-sm text-muted-foreground">
                    Catálogo público de proyectos.
                </p>
            </header>

            <RepositoryFilters filters={filters} lookups={lookups}>
                <RepositoriesList
                    repositories={repositories}
                    filters={filters}
                />
            </RepositoryFilters>
        </main>
    );
};
