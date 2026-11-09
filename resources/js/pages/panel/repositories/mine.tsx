import { Head } from '@inertiajs/react';
import {
    RepositoriesMineContainer,
    type PaginatedRepositories,
} from '@/features/repositories';

type PageProps = {
    repositorios: PaginatedRepositories;
};

const RepositoriesMinePage = ({ repositorios }: PageProps) => {
    return (
        <>
            <Head title="Mis repositorios" />
            <RepositoriesMineContainer repositorios={repositorios} />
        </>
    );
};

export default RepositoriesMinePage;
