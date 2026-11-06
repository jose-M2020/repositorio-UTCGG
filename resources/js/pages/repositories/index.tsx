import { Head } from '@inertiajs/react';
import {
    RepositoriesIndexContainer,
    type PaginatedRepositories,
    type RepositoryFilters,
} from '@/features/repositories';

type PageProps = {
    repositorios: PaginatedRepositories;
    filters: RepositoryFilters;
};

export default function RepositoriesIndexPage({
    repositorios,
    filters,
}: PageProps) {
    return (
        <>
            <Head title="Repositorios" />
            <RepositoriesIndexContainer
                repositorios={repositorios}
                filters={filters}
            />
        </>
    );
}
