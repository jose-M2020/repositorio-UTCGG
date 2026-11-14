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

const RepositoriesEditPage = ({ repository, catalog }: PageProps) => {
    return (
        <>
            <Head title="Editar repositorio" />
            <RepositoryEditContainer
                repository={repository}
                catalog={catalog}
            />
        </>
    );
};

export default RepositoriesEditPage;
