import { Head } from '@inertiajs/react';
import {
    RepositoryEditContainer,
    type Repository,
} from '@/features/repositories';

type PageProps = {
    repositorio: Repository;
};

export default function RepositoriesEditPage({ repositorio }: PageProps) {
    return (
        <>
            <Head title="Editar repositorio" />
            <RepositoryEditContainer repositorio={repositorio} />
        </>
    );
}
