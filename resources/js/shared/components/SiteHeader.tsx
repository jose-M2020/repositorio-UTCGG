import { Link, usePage } from '@inertiajs/react';
import { create as login } from '@/actions/App/Http/Controllers/Auth/AuthenticatedSessionController';
import { destroy as logout } from '@/actions/App/Http/Controllers/Auth/AuthenticatedSessionController';
import { create as register } from '@/actions/App/Http/Controllers/Auth/RegisteredUserController';
import { index as home } from '@/actions/App/Http/Controllers/HomeController';
import { index as repositories } from '@/actions/App/Http/Controllers/RepositorioController';
import { mine } from '@/actions/App/Http/Controllers/RepositorioController';
import { Button } from '@/shared/components/ui';

type SiteHeaderProps = {
    aboutUrl: string;
};

export const SiteHeader = ({ aboutUrl }: SiteHeaderProps) => {
    const { auth } = usePage().props;

    return (
        <header className="border-b border-teal-900/10 bg-white/80 backdrop-blur dark:border-teal-100/10 dark:bg-slate-950/80">
            <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-4 px-4 py-4">
                <Link
                    href={home.url()}
                    className="text-lg font-semibold tracking-tight text-teal-950 dark:text-teal-50"
                >
                    Repositorio UTCGG
                </Link>

                <nav
                    className="flex flex-wrap items-center gap-2"
                    aria-label="Principal"
                >
                    <Link
                        href={repositories.url()}
                        className="rounded-md px-2 py-1 text-sm text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-900"
                    >
                        Repositorios
                    </Link>
                    <Link
                        href={aboutUrl}
                        className="rounded-md px-2 py-1 text-sm text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-900"
                    >
                        Acerca
                    </Link>

                    {auth.user ? (
                        <>
                            <Link
                                href={mine.url()}
                                className="rounded-md px-2 py-1 text-sm text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-900"
                            >
                                Mi cuenta
                            </Link>
                            <Link
                                href={logout.url()}
                                method="post"
                                as="button"
                                className="inline-flex"
                            >
                                <Button type="button" variant="outline">
                                    Salir
                                </Button>
                            </Link>
                        </>
                    ) : (
                        <>
                            <Link href={login.url()}>
                                <Button type="button" variant="outline">
                                    Entrar
                                </Button>
                            </Link>
                            <Link href={register.url()}>
                                <Button type="button">Registrarse</Button>
                            </Link>
                        </>
                    )}
                </nav>
            </div>
        </header>
    );
};
