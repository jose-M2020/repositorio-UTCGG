import { Head } from '@inertiajs/react';
import {
    RepositoryShowContainer,
    type Repository,
    type RepositoryListItem,
} from '@/features/repositories';

type PageProps = {
    repositorio: Repository;
    related: RepositoryListItem[];
};

const RepositoriesShowPage = ({ repositorio, related }: PageProps) => {
    return (
        <>
            <Head title={repositorio.nombre_rep} />
            <RepositoryShowContainer
                repositorio={repositorio}
                related={related}
            />
        </>
    );
};

export default RepositoriesShowPage;
