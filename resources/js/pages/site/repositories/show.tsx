import { Head } from '@inertiajs/react';
import { RepositoryFilesPanel } from '@/features/files';
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
                filesPanel={
                    <RepositoryFilesPanel
                        slug={repositorio.slug}
                        files={repositorio.files}
                        imagenes={repositorio.imagenes}
                        imagenUrls={repositorio.imagen_urls}
                    />
                }
            />
        </>
    );
};

export default RepositoriesShowPage;
