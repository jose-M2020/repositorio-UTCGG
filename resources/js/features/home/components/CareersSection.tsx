import { Link } from '@inertiajs/react';
import { index } from '@/actions/App/Http/Controllers/RepositorioController';
import { homeCareers } from '@/shared/data/catalog';

export const CareersSection = () => {
    return (
        <section className="mx-auto w-full max-w-6xl px-4 py-16">
            <div className="mb-10 text-center">
                <h2 className="relative inline-block text-3xl tracking-wide text-foreground after:absolute after:-bottom-2 after:left-1/2 after:h-0.5 after:w-[75px] after:-translate-x-1/2 after:bg-secondary">
                    Áreas de estudio
                </h2>
            </div>

            <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {homeCareers.map((career) => (
                    <li key={career.code}>
                        <Link
                            href={index.url({
                                query: {
                                    carrera: [career.code],
                                },
                            })}
                            className="group relative block min-h-44 overflow-hidden rounded-xl"
                            aria-label={`Ver repositorios de ${career.name}`}
                        >
                            <img
                                src={career.image}
                                alt=""
                                className="absolute inset-0 size-full object-cover transition duration-300 group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-primary/70 transition group-hover:bg-primary/55" />
                            <div className="relative flex h-full min-h-44 flex-col justify-end p-5 text-primary-foreground">
                                <span className="text-xs font-semibold tracking-wider uppercase">
                                    {career.code}
                                </span>
                                <p className="mt-1 text-lg font-semibold">
                                    {career.name}
                                </p>
                            </div>
                        </Link>
                    </li>
                ))}
            </ul>
        </section>
    );
};
