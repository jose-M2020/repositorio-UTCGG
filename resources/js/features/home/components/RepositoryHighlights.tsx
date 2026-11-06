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
                <h2 className="relative inline-block text-3xl tracking-wide text-foreground after:absolute after:-bottom-2 after:left-1/2 after:h-0.5 after:w-[75px] after:-translate-x-1/2 after:bg-secondary">
                    {title}
                </h2>
                <p className="mt-4 text-muted-foreground">{description}</p>
            </div>

            {items.length === 0 ? (
                <p className="text-sm text-muted-foreground">
                    Aún no hay repositorios públicos para mostrar.
                </p>
            ) : (
                <ul className="grid gap-4 md:grid-cols-2">
                    {items.map((item) => (
                        <li key={item.id}>
                            <Link
                                href={show.url(item.slug)}
                                className="block h-full border-b border-border py-4 transition hover:border-primary"
                            >
                                <p className="text-xs tracking-wide text-secondary uppercase">
                                    {item.carrera}
                                </p>
                                <h3 className="mt-1 text-xl font-medium text-foreground">
                                    {item.nombre_rep}
                                </h3>
                                <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">
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
