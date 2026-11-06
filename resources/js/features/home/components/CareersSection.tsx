import { Link } from '@inertiajs/react';
import { index } from '@/actions/App/Http/Controllers/RepositorioController';
import { careerAreas } from '../data/careers';

export const CareersSection = () => {
    return (
        <section className="mx-auto w-full max-w-6xl px-4 py-16">
            <div className="mb-8 max-w-2xl">
                <h2 className="font-serif text-3xl tracking-tight text-slate-900 dark:text-slate-50">
                    Áreas de estudio
                </h2>
                <p className="mt-2 text-slate-600 dark:text-slate-400">
                    Explora la producción académica filtrada por carrera.
                </p>
            </div>

            <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {careerAreas.map((career) => (
                    <li key={career.code}>
                        <Link
                            href={index.url({
                                query: { carrera: career.code },
                            })}
                            className="block rounded-xl border border-teal-900/10 bg-gradient-to-br from-teal-50 to-white px-5 py-6 transition hover:border-teal-700/40 hover:shadow-sm dark:border-teal-100/10 dark:from-slate-900 dark:to-slate-950"
                        >
                            <span className="text-xs font-semibold tracking-wider text-teal-700 uppercase dark:text-teal-300">
                                {career.code}
                            </span>
                            <p className="mt-2 text-lg font-medium text-slate-900 dark:text-slate-100">
                                {career.name}
                            </p>
                        </Link>
                    </li>
                ))}
            </ul>
        </section>
    );
};
