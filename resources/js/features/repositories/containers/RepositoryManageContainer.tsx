import { usePage } from '@inertiajs/react';
import type { ReactNode } from 'react';
import { RepositoryDetails } from '../components/RepositoryDetails';
import type { Repository } from '../types';

type RepositoryManageContainerProps = {
    repositorio: Repository;
    previewFilesPanel: ReactNode;
    manageFilesPanel: ReactNode;
};

export const RepositoryManageContainer = ({
    repositorio,
    previewFilesPanel,
    manageFilesPanel,
}: RepositoryManageContainerProps) => {
    const { flash } = usePage().props;

    return (
        <main className="mx-auto w-full max-w-4xl space-y-6 px-4 py-8">
            <header>
                <h1 className="text-2xl font-semibold text-primary">
                    Gestionar repositorio
                </h1>
                <p className="text-sm text-muted-foreground">
                    {repositorio.nombre_rep}
                </p>
            </header>

            {flash.status ? (
                <p className="rounded-lg border border-primary/20 bg-accent px-3 py-2 text-sm text-accent-foreground">
                    {flash.status}
                </p>
            ) : null}

            <RepositoryDetails
                repositorio={repositorio}
                previewFilesPanel={previewFilesPanel}
                manageFilesPanel={manageFilesPanel}
            />
        </main>
    );
};
