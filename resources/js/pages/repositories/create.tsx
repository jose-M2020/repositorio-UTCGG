import { Head } from '@inertiajs/react';
import { RepositoryCreateContainer } from '@/features/repositories';
import type { RepositoryCatalog } from '@/shared/data/catalog';

type PageProps = {
    catalog?: RepositoryCatalog;
};

export default function RepositoriesCreatePage({ catalog }: PageProps) {
    return (
        <>
            <Head title="Nuevo repositorio" />
            <RepositoryCreateContainer catalog={catalog} />
        </>
    );
}
