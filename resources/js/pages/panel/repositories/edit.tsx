import { Head } from '@inertiajs/react';
import {
    RepositoryEditContainer,
    type Repository,
} from '@/features/repositories';
import type { RepositoryCatalog } from '@/shared/data/catalog';

type PageProps = {
    repository: Repository;
    catalog: RepositoryCatalog;
};

const RepositoriesEditPage = ({ repositorio, catalog }: PageProps) => {
    return (
        <>
            <Head title="Editar repositorio" />
            <RepositoryEditContainer
                repositorio={repository}
                catalog={catalog}
            />
        </>
    );
};

export default RepositoriesEditPage;
