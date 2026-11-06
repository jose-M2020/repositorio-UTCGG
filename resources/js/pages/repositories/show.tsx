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

export default function RepositoriesShowPage({
    repositorio,
    related,
}: PageProps) {
    return (
        <>
            <Head title={repositorio.nombre_rep} />
            <RepositoryShowContainer
                repositorio={repositorio}
                related={related}
            />
            <div className="mx-auto w-full max-w-4xl px-4 pb-8">
                <RepositoryFilesPanel
                    slug={repositorio.slug}
                    files={repositorio.files}
                    imagenes={repositorio.imagenes}
                    imagenUrls={repositorio.imagen_urls}
                />
            </div>
        </>
    );
}
