import { Head } from '@inertiajs/react';
import {
    RepositoriesIndexContainer,
    type PaginatedRepositories,
    type RepositoryFilters,
} from '@/features/repositories';
import type { RepositoryCatalog } from '@/shared/data/catalog';

type PageProps = {
    repositorios: PaginatedRepositories;
    filters: RepositoryFilters;
    catalog: RepositoryCatalog;
};

const RepositoriesIndexPage = ({
    repositorios,
    filters,
    catalog,
}: PageProps) => {
    return (
        <>
            <Head title="Repositorios" />
            <RepositoriesIndexContainer
                repositorios={repositorios}
                filters={filters}
                catalog={catalog}
            />
        </>
    );
};

export default RepositoriesIndexPage;
