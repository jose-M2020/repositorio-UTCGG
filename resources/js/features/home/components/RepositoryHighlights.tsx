import { Link } from '@inertiajs/react';
import { show } from '@/actions/App/Http/Controllers/RepositorioController';
import type { HomeRepository } from '../types';

type RepositoryHighlightsProps = {
    title: string;
    description: string;
    items: HomeRepository[];
};

export const RepositoryHighlights = ({
    title,
    description,
    items,
}: RepositoryHighlightsProps) => {
    return (
        <section className="mx-auto w-full max-w-6xl px-4 py-16">
            <div className="mb-8 max-w-2xl">
                <h2 className="font-serif text-3xl tracking-tight text-slate-900 dark:text-slate-50">
                    {title}
                </h2>
                <p className="mt-2 text-slate-600 dark:text-slate-400">
                    {description}
                </p>
            </div>

            {items.length === 0 ? (
                <p className="text-sm text-slate-500">
                    Aún no hay repositorios públicos para mostrar.
                </p>
            ) : (
                <ul className="grid gap-4 md:grid-cols-2">
                    {items.map((item) => (
                        <li key={item.id}>
                            <Link
                                href={show.url(item.slug)}
                                className="block h-full border-b border-teal-900/10 py-4 transition hover:border-teal-700 dark:border-teal-100/10"
                            >
                                <p className="text-xs tracking-wide text-teal-700 uppercase dark:text-teal-300">
                                    {item.carrera}
                                </p>
                                <h3 className="mt-1 text-xl font-medium text-slate-900 dark:text-slate-50">
                                    {item.nombre_rep}
                                </h3>
                                <p className="mt-2 line-clamp-2 text-sm text-slate-600 dark:text-slate-400">
                                    {item.descripcion}
                                </p>
                            </Link>
                        </li>
                    ))}
                </ul>
            )}
        </section>
    );
};
