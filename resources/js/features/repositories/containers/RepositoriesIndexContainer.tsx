import { Link } from '@inertiajs/react';
import {
    create,
    mine,
} from '@/actions/App/Http/Controllers/RepositorioController';
import { Button } from '@/shared/components/ui';
import { RepositoriesList } from '../components/RepositoriesList';
import { RepositoryFilters } from '../components/RepositoryFilters';
import type {
    PaginatedRepositories,
    RepositoryFilters as RepositoryFiltersType,
} from '../types';

type RepositoriesIndexContainerProps = {
    repositorios: PaginatedRepositories;
    filters: RepositoryFiltersType;
};

export const RepositoriesIndexContainer = ({
    repositorios,
    filters,
}: RepositoriesIndexContainerProps) => {
    return (
        <main className="mx-auto w-full max-w-5xl space-y-6 px-4 py-8">
            <header className="flex flex-wrap items-center justify-between gap-3">
                <div>
                    <h1 className="text-2xl font-semibold">Repositorios</h1>
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                        Catálogo público de proyectos.
                    </p>
                </div>
                <div className="flex gap-2">
                    <Link href={mine.url()}>
                        <Button type="button" variant="outline">
                            Mis repositorios
                        </Button>
                    </Link>
                    <Link href={create.url()}>
                        <Button type="button">Nuevo</Button>
                    </Link>
                </div>
            </header>

            <RepositoryFilters filters={filters} />
            <RepositoriesList repositorios={repositorios} />
        </main>
    );
};
