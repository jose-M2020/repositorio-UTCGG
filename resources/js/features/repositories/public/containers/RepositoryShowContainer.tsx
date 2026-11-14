import { Link } from '@inertiajs/react';
import { index } from '@/actions/App/Http/Controllers/RepositoryController';
import { Button } from '@/shared/components/ui';
import type { Repository, RepositoryListItem } from '../../shared/types';
import { RepositoryPublicView } from '../components/RepositoryPublicView';

type RepositoryShowContainerProps = {
    repository: Repository;
    related: RepositoryListItem[];
};

export const RepositoryShowContainer = ({
    repository,
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
                repository={repository}
                related={related}
            />
        </main>
    );
};
