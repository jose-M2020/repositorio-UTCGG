import { Link, usePage } from '@inertiajs/react';
import {
    create,
    showByUser,
} from '@/actions/App/Http/Controllers/RepositoryController';
import { Button } from '@/shared/components/ui';
import { RepositoriesList } from '../../shared/components/RepositoriesList';
import type { PaginatedRepositories } from '../../shared/types';

type RepositoriesMineContainerProps = {
    repositories: PaginatedRepositories;
};

export const RepositoriesMineContainer = ({
    repositories,
}: RepositoriesMineContainerProps) => {
    const { flash } = usePage().props;

    return (
        <main className="page-container space-y-6 py-8">
            <header className="flex flex-wrap items-center justify-between gap-3">
                <div>
                    <h1 className="text-2xl font-semibold">Mis repositorios</h1>
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                        Proyectos donde eres miembro.
                    </p>
                </div>
                <Link href={create.url()}>
                    <Button type="button">Nuevo</Button>
                </Link>
            </header>

            {flash.status ? (
                <p className="rounded-lg border border-emerald-200 bg-emerald-50 px-3 py-2 text-sm text-emerald-800">
                    {flash.status}
                </p>
            ) : null}

            <RepositoriesList
                repositories={repositories}
                hrefForItem={(slug) => showByUser.url(slug)}
            />
        </main>
    );
};
