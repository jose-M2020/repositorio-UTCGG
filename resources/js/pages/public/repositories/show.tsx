import { Head } from '@inertiajs/react';
import {
    RepositoryShowContainer,
    type Repository,
    type RepositoryListItem,
} from '@/features/repositories';

type PageProps = {
    repository: Repository;
    related: RepositoryListItem[];
};

const RepositoriesShowPage = ({ repositorio, related }: PageProps) => {
    return (
        <>
            <Head title={repositorio.title} />
            <RepositoryShowContainer
                repositorio={repository}
                related={related}
            />
        </>
    );
};

export default RepositoriesShowPage;
