import { Link, usePage } from '@inertiajs/react';
import {
    create,
    showByUser,
} from '@/actions/App/Http/Controllers/RepositorioController';
import { Button } from '@/shared/components/ui';
import { RepositoriesList } from '../components/RepositoriesList';
import type { PaginatedRepositories } from '../types';

type RepositoriesMineContainerProps = {
    repositorios: PaginatedRepositories;
};

export const RepositoriesMineContainer = ({
    repositorios,
}: RepositoriesMineContainerProps) => {
    const { flash } = usePage().props;

    return (
        <main className="mx-auto w-full max-w-5xl space-y-6 px-4 py-8">
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
                repositorios={repositorios}
                hrefForItem={(slug) => showByUser.url(slug)}
            />
        </main>
    );
};
