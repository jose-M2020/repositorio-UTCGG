import { Head } from '@inertiajs/react';
import { RepositoryFilesPanel } from '@/features/files';
import {
    RepositoryManageContainer,
    type Repository,
} from '@/features/repositories';

type PageProps = {
    repositorio: Repository;
};

export default function RepositoriesManagePage({ repositorio }: PageProps) {
    return (
        <>
            <Head title={`Gestionar · ${repositorio.nombre_rep}`} />
            <RepositoryManageContainer repositorio={repositorio} />
            <div className="mx-auto w-full max-w-4xl px-4 pb-8">
                <RepositoryFilesPanel
                    slug={repositorio.slug}
                    files={repositorio.files}
                    imagenes={repositorio.imagenes}
                    canManage
                />
            </div>
        </>
    );
}
