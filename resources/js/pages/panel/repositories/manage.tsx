import { Head } from '@inertiajs/react';
import {
    RepositoryManageContainer,
    type Repository,
} from '@/features/repositories';

type PageProps = {
    repository: Repository;
};

const RepositoriesManagePage = ({ repositorio }: PageProps) => {
    return (
        <>
            <Head title={`Gestionar · ${repositorio.title}`} />
            <RepositoryManageContainer repositorio={repository} />
        </>
    );
};

export default RepositoriesManagePage;
