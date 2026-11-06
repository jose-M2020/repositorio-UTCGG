import { Head } from '@inertiajs/react';
import {
    RepositoryEditContainer,
    type Repository,
} from '@/features/repositories';
import type { RepositoryCatalog } from '@/shared/data/catalog';

type PageProps = {
    repositorio: Repository;
    catalog?: RepositoryCatalog;
};

export default function RepositoriesEditPage({
    repositorio,
    catalog,
}: PageProps) {
    return (
        <>
            <Head title="Editar repositorio" />
            <RepositoryEditContainer
                repositorio={repositorio}
                catalog={catalog}
            />
        </>
    );
}
