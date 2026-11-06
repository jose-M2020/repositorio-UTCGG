import { Head } from '@inertiajs/react';
import {
    RepositoryManageContainer,
    type Repository,
} from '@/features/repositories';

type PageProps = {
    repositorio: Repository;
};

export default function RepositoriesManagePage({ repositorio }: PageProps) {
    return (
        <>
            <Head title={`Gestionar · ${repositorio.nombre_rep}`} />
            <RepositoryManageContainer repositorio={repositorio} />
        </>
    );
}
