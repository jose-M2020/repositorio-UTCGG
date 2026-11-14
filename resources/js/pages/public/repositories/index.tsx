import { Head } from '@inertiajs/react';
import {
    RepositoriesIndexContainer,
    type PaginatedRepositories,
    type RepositoryFilters,
} from '@/features/repositories';
import type { RepositoryCatalog } from '@/shared/data/catalog';

type PageProps = {
    repositories: PaginatedRepositories;
    filters: RepositoryFilters;
    catalog: RepositoryCatalog;
};

const RepositoriesIndexPage = ({
    repositories,
    filters,
    catalog,
}: PageProps) => {
    return (
        <>
            <Head title="Repositorios" />
            <RepositoriesIndexContainer
                repositories={repositories}
                filters={filters}
                catalog={catalog}
            />
        </>
    );
};

export default RepositoriesIndexPage;
