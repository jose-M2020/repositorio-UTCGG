import { Link, usePage } from '@inertiajs/react';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';
import { create as login } from '@/actions/App/Http/Controllers/Auth/AuthenticatedSessionController';
import {
    about,
    index as home,
} from '@/actions/App/Http/Controllers/HomeController';
import {
    index as repositories,
    mine,
} from '@/actions/App/Http/Controllers/RepositorioController';
import { buttonVariants } from '@/shared/components/ui';
import { cn } from '@/shared/lib/cn';
import { AppBrand } from './AppBrand';
import { SurfaceNavLink } from './SurfaceNavLink';

export const PublicHeader = () => {
    const { auth } = usePage().props;
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const handleToggleMenu = () => {
        setIsMenuOpen((isOpen) => !isOpen);
    };

    const handleCloseMenu = () => {
        setIsMenuOpen(false);
    };

    return (
        <header className="sticky top-0 z-30 border-b border-border bg-card/95 backdrop-blur">
            <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between gap-4 px-4">
                <AppBrand href={home.url()} />

                <nav
                    className="hidden items-center gap-2 md:flex"
                    aria-label="Principal"
                >
                    <SurfaceNavLink href={home.url()}>Inicio</SurfaceNavLink>
                    <SurfaceNavLink href={repositories.url()}>
                        Repositorios
                    </SurfaceNavLink>
                    <SurfaceNavLink href={about.url()}>Acerca</SurfaceNavLink>

                    {auth.user ? (
                        <Link href={mine.url()} className={buttonVariants()}>
                            Ir a mi panel
                        </Link>
                    ) : (
                        <Link href={login.url()} className={buttonVariants()}>
                            Acceder
                        </Link>
                    )}
                </nav>

                <button
                    type="button"
                    onClick={handleToggleMenu}
                    className="inline-flex size-9 items-center justify-center rounded-lg border border-border text-foreground transition-colors hover:bg-muted focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none md:hidden"
                    aria-label={isMenuOpen ? 'Cerrar menú' : 'Abrir menú'}
                    aria-expanded={isMenuOpen}
                >
                    {isMenuOpen ? (
                        <X className="size-5" aria-hidden="true" />
                    ) : (
                        <Menu className="size-5" aria-hidden="true" />
                    )}
                </button>
            </div>

            <nav
                className={cn(
                    'mx-auto max-w-6xl space-y-1 border-t border-border px-4 py-3 md:hidden',
                    !isMenuOpen && 'hidden',
                )}
                aria-label="Principal móvil"
            >
                <SurfaceNavLink href={home.url()} onNavigate={handleCloseMenu}>
                    Inicio
                </SurfaceNavLink>
                <SurfaceNavLink
                    href={repositories.url()}
                    onNavigate={handleCloseMenu}
                >
                    Repositorios
                </SurfaceNavLink>
                <SurfaceNavLink href={about.url()} onNavigate={handleCloseMenu}>
                    Acerca
                </SurfaceNavLink>
                <div className="pt-2">
                    {auth.user ? (
                        <Link
                            href={mine.url()}
                            className={buttonVariants({
                                className: 'w-full',
                            })}
                            onClick={handleCloseMenu}
                        >
                            Ir a mi panel
                        </Link>
                    ) : (
                        <Link
                            href={login.url()}
                            className={buttonVariants({
                                className: 'w-full',
                            })}
                            onClick={handleCloseMenu}
                        >
                            Acceder
                        </Link>
                    )}
                </div>
            </nav>
        </header>
    );
};
