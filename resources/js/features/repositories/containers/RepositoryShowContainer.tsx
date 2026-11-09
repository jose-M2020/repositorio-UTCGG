import { Link } from '@inertiajs/react';
import type { ReactNode } from 'react';
import { index } from '@/actions/App/Http/Controllers/RepositorioController';
import { Button } from '@/shared/components/ui';
import { RepositoryPublicPreview } from '../components/RepositoryPublicPreview';
import type { Repository, RepositoryListItem } from '../types';

type RepositoryShowContainerProps = {
    repositorio: Repository;
    related: RepositoryListItem[];
    filesPanel?: ReactNode;
};

export const RepositoryShowContainer = ({
    repositorio,
    related,
    filesPanel,
}: RepositoryShowContainerProps) => {
    return (
        <main className="mx-auto w-full max-w-4xl space-y-8 px-4 py-8">
            <div className="flex justify-between gap-3">
                <Link href={index.url()}>
                    <Button type="button" variant="outline">
                        Volver al catálogo
                    </Button>
                </Link>
            </div>

            <RepositoryPublicPreview
                repositorio={repositorio}
                related={related}
                filesPanel={filesPanel}
            />
        </main>
    );
};
