import { Head } from '@inertiajs/react';
import {
    RepositoriesMineContainer,
    type PaginatedRepositories,
} from '@/features/repositories';

type PageProps = {
    repositories: PaginatedRepositories;
};

const RepositoriesMinePage = ({ repositories }: PageProps) => {
    return (
        <>
            <Head title="Mis repositorios" />
            <RepositoriesMineContainer repositories={repositories} />
        </>
    );
};

export default RepositoriesMinePage;
