import { Link } from '@inertiajs/react';
import {
    index,
    show,
} from '@/actions/App/Http/Controllers/RepositorioController';
import { Button } from '@/shared/components/ui';
import { RepositoryDetails } from '../components/RepositoryDetails';
import type { Repository, RepositoryListItem } from '../types';

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

            <section className="rounded-xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900">
                <RepositoryDetails repositorio={repositorio} />
            </section>

            {related.length > 0 ? (
                <section className="space-y-3">
                    <h2 className="text-lg font-semibold">Relacionados</h2>
                    <ul className="grid gap-3 sm:grid-cols-2">
                        {related.map((item) => (
                            <li key={item.id}>
                                <Link
                                    href={show.url(item.slug)}
                                    className="block rounded-lg border border-slate-200 p-3 hover:bg-slate-50 dark:border-slate-800 dark:hover:bg-slate-900"
                                >
                                    {item.nombre_rep}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </section>
            ) : null}
        </main>
    );
};
