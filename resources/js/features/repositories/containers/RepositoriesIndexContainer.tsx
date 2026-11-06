import { Link } from '@inertiajs/react';
import {
    create,
    mine,
} from '@/actions/App/Http/Controllers/RepositorioController';
import { Button } from '@/shared/components/ui';
import type { RepositoryCatalog } from '@/shared/data/catalog';
import { SiteFooter, SiteHeader } from '@/shared/components';
import { about } from '@/actions/App/Http/Controllers/HomeController';
import { RepositoriesList } from '../components/RepositoriesList';
import { RepositoryFilters } from '../components/RepositoryFilters';
import type {
    PaginatedRepositories,
    RepositoryFilters as RepositoryFiltersType,
} from '../types';

type RepositoriesIndexContainerProps = {
    repositorios: PaginatedRepositories;
    filters: RepositoryFiltersType;
    catalog?: RepositoryCatalog;
};

export const RepositoriesIndexContainer = ({
    repositorios,
    filters,
    catalog,
}: RepositoriesIndexContainerProps) => {
    return (
        <div className="flex min-h-screen flex-col bg-background">
            <SiteHeader aboutUrl={about.url()} />
            <main className="mx-auto w-full max-w-6xl flex-1 space-y-6 px-4 py-8">
                <header className="flex flex-wrap items-center justify-between gap-3">
                    <div>
                        <h1 className="text-3xl font-semibold tracking-tight text-primary">
                            Repositorios
                        </h1>
                        <p className="text-sm text-muted-foreground">
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

                <RepositoryFilters filters={filters} catalog={catalog} />
                <RepositoriesList
                    repositorios={repositorios}
                    filters={filters}
                />
            </main>
            <SiteFooter />
        </div>
    );
};
