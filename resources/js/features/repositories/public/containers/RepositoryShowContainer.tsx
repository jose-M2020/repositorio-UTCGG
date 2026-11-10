import { Link } from '@inertiajs/react';
import { index } from '@/actions/App/Http/Controllers/RepositorioController';
import { Button } from '@/shared/components/ui';
import type { Repository, RepositoryListItem } from '../../shared/types';
import { RepositoryPublicView } from '../components/RepositoryPublicView';

type RepositoryShowContainerProps = {
    repositorio: Repository;
    related: RepositoryListItem[];
};

export const RepositoryShowContainer = ({
    repositorio,
    related,
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

            <RepositoryPublicView
                repositorio={repositorio}
                related={related}
            />
        </main>
    );
};
