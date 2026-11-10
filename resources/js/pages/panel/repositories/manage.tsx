import { Head } from '@inertiajs/react';
import {
    RepositoryManageContainer,
    type Repository,
} from '@/features/repositories';

type PageProps = {
    repositorio: Repository;
};

const RepositoriesManagePage = ({ repositorio }: PageProps) => {
    return (
        <>
            <Head title={`Gestionar · ${repositorio.nombre_rep}`} />
            <RepositoryManageContainer repositorio={repositorio} />
        </>
    );
};

export default RepositoriesManagePage;
