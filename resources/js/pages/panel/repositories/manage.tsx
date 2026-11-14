import { Head } from '@inertiajs/react';
import {
    RepositoryManageContainer,
    type Repository,
} from '@/features/repositories';

type PageProps = {
    repository: Repository;
};

const RepositoriesManagePage = ({ repository }: PageProps) => {
    return (
        <>
            <Head title={`Gestionar · ${repository.title}`} />
            <RepositoryManageContainer repository={repository} />
        </>
    );
};

export default RepositoriesManagePage;
