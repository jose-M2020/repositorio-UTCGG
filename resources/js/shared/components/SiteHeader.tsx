import { Link, usePage } from '@inertiajs/react';
import { create as login } from '@/actions/App/Http/Controllers/Auth/AuthenticatedSessionController';
import { destroy as logout } from '@/actions/App/Http/Controllers/Auth/AuthenticatedSessionController';
import { index as home } from '@/actions/App/Http/Controllers/HomeController';
import { create as createRepository } from '@/actions/App/Http/Controllers/RepositorioController';
import { index as repositories } from '@/actions/App/Http/Controllers/RepositorioController';
import { mine } from '@/actions/App/Http/Controllers/RepositorioController';
import { index as users } from '@/actions/App/Http/Controllers/UserController';
import { create as createUser } from '@/actions/App/Http/Controllers/UserController';
import { Button } from '@/shared/components/ui';

type SiteHeaderProps = {
    aboutUrl: string;
};

export const SiteHeader = ({ aboutUrl }: SiteHeaderProps) => {
    const { auth } = usePage().props;
    const roles = auth.user?.roles ?? [];
    const canCreateRepo = roles.includes('admin') || roles.includes('docente');
    const isAdmin = roles.includes('admin');

    return (
        <header className="h-[70px] border-b border-border bg-card">
            <div className="mx-auto flex h-full w-full max-w-6xl items-center justify-between gap-4 px-4">
                <Link
                    href={home.url()}
                    className="flex items-center gap-3"
                    aria-label="Inicio Repositorio UTCGG"
                >
                    <img
                        src="/img/logo1.png"
                        alt="UTCGG"
                        className="h-10 w-auto"
                    />
                    <span className="hidden text-sm font-semibold text-primary sm:inline">
                        Repositorio UTCGG
                    </span>
                </Link>

                <nav
                    className="flex flex-wrap items-center gap-2"
                    aria-label="Principal"
                >
                    <Link
                        href={home.url()}
                        className="rounded-md px-2 py-1 text-sm text-foreground hover:bg-muted"
                    >
                        Inicio
                    </Link>
                    <Link
                        href={repositories.url()}
                        className="rounded-md px-2 py-1 text-sm text-foreground hover:bg-muted"
                    >
                        Repositorios
                    </Link>
                    <Link
                        href={aboutUrl}
                        className="rounded-md px-2 py-1 text-sm text-foreground hover:bg-muted"
                    >
                        Acerca
                    </Link>

                    {auth.user ? (
                        <>
                            {canCreateRepo ? (
                                <Link href={createRepository.url()}>
                                    <Button type="button" variant="outline">
                                        Nuevo repositorio
                                    </Button>
                                </Link>
                            ) : null}
                            <Link
                                href={mine.url()}
                                className="rounded-md px-2 py-1 text-sm text-foreground hover:bg-muted"
                            >
                                Mi cuenta
                            </Link>
                            {isAdmin ? (
                                <>
                                    <Link
                                        href={users.url()}
                                        className="rounded-md px-2 py-1 text-sm text-foreground hover:bg-muted"
                                    >
                                        Usuarios
                                    </Link>
                                    <Link href={createUser.url()}>
                                        <Button type="button" variant="secondary">
                                            Agregar usuario
                                        </Button>
                                    </Link>
                                </>
                            ) : null}
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
                        <Link href={login.url()}>
                            <Button type="button">Acceder</Button>
                        </Link>
                    )}
                </nav>
            </div>
        </header>
    );
};
