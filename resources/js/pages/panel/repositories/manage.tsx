import { Head } from '@inertiajs/react';
import { RepositoryFilesPanel } from '@/features/files';
import {
    RepositoryManageContainer,
    type Repository,
} from '@/features/repositories';

type PageProps = {
    repositorio: Repository;
};

const RepositoriesManagePage = ({ repositorio }: PageProps) => {
    const publicFiles = repositorio.files.filter((file) => file.is_public);

    return (
        <>
            <Head title={`Gestionar · ${repositorio.nombre_rep}`} />
            <RepositoryManageContainer
                repositorio={repositorio}
                previewFilesPanel={
                    <RepositoryFilesPanel
                        slug={repositorio.slug}
                        files={publicFiles}
                        imagenes={repositorio.imagenes}
                        imagenUrls={repositorio.imagen_urls}
                    />
                }
                manageFilesPanel={
                    <RepositoryFilesPanel
                        slug={repositorio.slug}
                        files={repositorio.files}
                        imagenes={repositorio.imagenes}
                        imagenUrls={repositorio.imagen_urls}
                        canManage
                    />
                }
            />
        </>
    );
};

export default RepositoriesManagePage;
