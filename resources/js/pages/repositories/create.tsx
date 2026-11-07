import { Head } from '@inertiajs/react';
import { RepositoryCreateContainer } from '@/features/repositories';
import type { RepositoryCatalog } from '@/shared/data/catalog';

type PageProps = {
    catalog?: RepositoryCatalog;
};

const RepositoriesCreatePage = ({ catalog }: PageProps) => {
    return (
        <>
            <Head title="Nuevo repositorio" />
            <RepositoryCreateContainer catalog={catalog} />
        </>
    );
};

export default RepositoriesCreatePage;
