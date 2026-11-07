import { Link, usePage } from '@inertiajs/react';
import {
    BookOpen,
    FolderKanban,
    House,
    LogOut,
    Menu,
    Plus,
    ShieldCheck,
    UserPlus,
    Users,
    X,
    type LucideIcon,
} from 'lucide-react';
import { useState, type ReactNode } from 'react';
import { destroy as logout } from '@/actions/App/Http/Controllers/Auth/AuthenticatedSessionController';
import { index as home } from '@/actions/App/Http/Controllers/HomeController';
import {
    create as createRepository,
    index as repositories,
    mine,
} from '@/actions/App/Http/Controllers/RepositorioController';
import { index as roles } from '@/actions/App/Http/Controllers/RoleController';
import {
    create as createUser,
    index as users,
} from '@/actions/App/Http/Controllers/UserController';
import { cn } from '@/shared/lib/cn';
import { AppBrand } from './AppBrand';
import { AppNavLink } from './AppNavLink';

type AppShellProps = {
    children: ReactNode;
};

type NavigationItem = {
    label: string;
    href: string;
    icon: LucideIcon;
};

const NavigationSection = ({
    title,
    items,
    onNavigate,
}: {
    title: string;
    items: NavigationItem[];
    onNavigate?: () => void;
}) => {
    return (
        <section className="space-y-2">
            <h2 className="px-3 text-xs font-semibold tracking-wide text-muted-foreground uppercase">
                {title}
            </h2>
            <nav className="space-y-1" aria-label={title}>
                {items.map((item) => (
                    <AppNavLink
                        key={item.href}
                        {...item}
                        onNavigate={onNavigate}
                    />
                ))}
            </nav>
        </section>
    );
};

export const AppShell = ({ children }: AppShellProps) => {
    const { auth } = usePage().props;
    const [isMobileNavigationOpen, setIsMobileNavigationOpen] = useState(false);
    const user = auth.user;

    const workItems: NavigationItem[] = [
        {
            label: 'Mis proyectos',
            href: mine.url(),
            icon: FolderKanban,
        },
        ...(auth.abilities['repositories.create']
            ? [
                  {
                      label: 'Nuevo proyecto',
                      href: createRepository.url(),
                      icon: Plus,
                  },
              ]
            : []),
    ];

    const managementItems: NavigationItem[] = [
        ...(auth.abilities['users.view']
            ? [
                  {
                      label: 'Usuarios',
                      href: users.url(),
                      icon: Users,
                  },
              ]
            : []),
        ...(auth.abilities['users.create']
            ? [
                  {
                      label: 'Nuevo usuario',
                      href: createUser.url(),
                      icon: UserPlus,
                  },
              ]
            : []),
        ...(auth.abilities['roles.view']
            ? [
                  {
                      label: 'Roles y permisos',
                      href: roles.url(),
                      icon: ShieldCheck,
                  },
              ]
            : []),
    ];

    const exploreItems: NavigationItem[] = [
        {
            label: 'Catálogo público',
            href: repositories.url(),
            icon: BookOpen,
        },
        {
            label: 'Sitio público',
            href: home.url(),
            icon: House,
        },
    ];

    const handleCloseMobileNavigation = () => {
        setIsMobileNavigationOpen(false);
    };

    const handleToggleMobileNavigation = () => {
        setIsMobileNavigationOpen((isOpen) => !isOpen);
    };

    const navigationContent = (
        <>
            <NavigationSection
                title="Trabajo"
                items={workItems}
                onNavigate={handleCloseMobileNavigation}
            />

            {managementItems.length > 0 ? (
                <NavigationSection
                    title="Gestión"
                    items={managementItems}
                    onNavigate={handleCloseMobileNavigation}
                />
            ) : null}

            <NavigationSection
                title="Explorar"
                items={exploreItems}
                onNavigate={handleCloseMobileNavigation}
            />
        </>
    );

    return (
        <div className="min-h-screen bg-muted/30 lg:grid lg:grid-cols-[17rem_minmax(0,1fr)]">
            <aside className="sticky top-0 hidden h-screen flex-col border-r border-border bg-card lg:flex">
                <div className="flex h-20 items-center border-b border-border px-5">
                    <AppBrand href={mine.url()} label="Área privada" />
                </div>

                <div className="flex flex-1 flex-col gap-6 overflow-y-auto p-4">
                    {navigationContent}
                </div>

                <div className="border-t border-border p-4">
                    <div className="mb-3 min-w-0 px-2">
                        <p className="truncate text-sm font-medium">
                            {user
                                ? `${user.nombre} ${user.apellido}`.trim()
                                : 'Usuario'}
                        </p>
                        <p className="truncate text-xs text-muted-foreground">
                            {user?.email}
                        </p>
                    </div>
                    <Link
                        href={logout.url()}
                        method="post"
                        as="button"
                        className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                    >
                        <LogOut className="size-4" aria-hidden="true" />
                        Cerrar sesión
                    </Link>
                </div>
            </aside>

            <div className="flex min-h-screen min-w-0 flex-col">
                <header className="sticky top-0 z-30 border-b border-border bg-card/95 backdrop-blur lg:hidden">
                    <div className="flex h-16 items-center justify-between gap-4 px-4">
                        <AppBrand href={mine.url()} label="Área privada" />
                        <button
                            type="button"
                            onClick={handleToggleMobileNavigation}
                            className="inline-flex size-9 items-center justify-center rounded-lg border border-border text-foreground transition-colors hover:bg-muted focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
                            aria-label={
                                isMobileNavigationOpen
                                    ? 'Cerrar navegación'
                                    : 'Abrir navegación'
                            }
                            aria-expanded={isMobileNavigationOpen}
                        >
                            {isMobileNavigationOpen ? (
                                <X className="size-5" aria-hidden="true" />
                            ) : (
                                <Menu className="size-5" aria-hidden="true" />
                            )}
                        </button>
                    </div>

                    <div
                        className={cn(
                            'border-t border-border p-4',
                            !isMobileNavigationOpen && 'hidden',
                        )}
                    >
                        <div className="space-y-6">{navigationContent}</div>
                        <Link
                            href={logout.url()}
                            method="post"
                            as="button"
                            className="mt-4 flex w-full items-center gap-3 border-t border-border px-3 pt-4 text-sm font-medium text-muted-foreground"
                        >
                            <LogOut className="size-4" aria-hidden="true" />
                            Cerrar sesión
                        </Link>
                    </div>
                </header>

                <div className="flex flex-1 flex-col">{children}</div>
            </div>
        </div>
    );
};
