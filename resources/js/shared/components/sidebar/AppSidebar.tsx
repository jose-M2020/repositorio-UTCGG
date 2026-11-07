import { Link, usePage } from '@inertiajs/react';
import {
    BookOpen,
    FolderKanban,
    ShieldCheck,
} from 'lucide-react';
import type { ComponentProps } from 'react';
import { index as home } from '@/actions/App/Http/Controllers/HomeController';
import {
    create as createRepository,
    index as repositories,
    mine,
} from '@/actions/App/Http/Controllers/RepositorioController';
import { index as catalogs } from '@/actions/App/Http/Controllers/CatalogController';
import { index as roles } from '@/actions/App/Http/Controllers/RoleController';
import {
    create as createUser,
    index as users,
} from '@/actions/App/Http/Controllers/UserController';
import { NavMain, type NavMainItem } from '@/shared/components/sidebar/nav-main';
import { NavUser } from '@/shared/components/sidebar/nav-user';
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarRail,
} from '@/shared/components/ui/sidebar';

const isActivePath = (currentUrl: string, href: string) => {
    const currentPath = currentUrl.split('?')[0] ?? currentUrl;
    const linkPath = href.split('?')[0] ?? href;

    return (
        currentPath === linkPath ||
        (linkPath !== '/' && currentPath.startsWith(`${linkPath}/`))
    );
};

const SidebarBrand = () => {
    return (
        <SidebarMenu>
            <SidebarMenuItem>
                <SidebarMenuButton
                    size="lg"
                    render={<Link href={mine.url()} />}
                    tooltip="Repositorio UTCGG"
                    className="group-data-[collapsible=icon]:p-0!"
                    aria-label="Inicio Repositorio UTCGG"
                >
                    <img
                        src="/img/logo1.png"
                        alt=""
                        className="h-8 max-w-full object-contain object-left group-data-[collapsible=icon]:size-8 group-data-[collapsible=icon]:object-cover"
                    />
                </SidebarMenuButton>
            </SidebarMenuItem>
        </SidebarMenu>
    );
};

const useNavMainItems = (): NavMainItem[] => {
    const { auth } = usePage().props;
    const { url } = usePage();

    const trabajoItems = [
        {
            title: 'Mis proyectos',
            url: mine.url(),
        },
        ...(auth.abilities['repositories.create']
            ? [
                  {
                      title: 'Nuevo proyecto',
                      url: createRepository.url(),
                  },
              ]
            : []),
    ];

    const gestionItems = [
        ...(auth.abilities['users.view']
            ? [
                  {
                      title: 'Usuarios',
                      url: users.url(),
                  },
              ]
            : []),
        ...(auth.abilities['users.create']
            ? [
                  {
                      title: 'Nuevo usuario',
                      url: createUser.url(),
                  },
              ]
            : []),
        ...(auth.abilities['roles.view']
            ? [
                  {
                      title: 'Roles y permisos',
                      url: roles.url(),
                  },
              ]
            : []),
        ...(auth.abilities['catalogs.view']
            ? [
                  {
                      title: 'Catalogos',
                      url: catalogs.url(),
                  },
              ]
            : []),
    ];

    const explorarItems = [
        {
            title: 'Catálogo público',
            url: repositories.url(),
        },
        {
            title: 'Sitio público',
            url: home.url(),
        },
    ];

    return [
        {
            title: 'Trabajo',
            url: mine.url(),
            icon: FolderKanban,
            isActive: trabajoItems.some((item) => isActivePath(url, item.url)),
            items: trabajoItems,
        },
        ...(gestionItems.length > 0
            ? [
                  {
                      title: 'Gestión',
                      url: gestionItems[0]?.url ?? users.url(),
                      icon: ShieldCheck,
                      isActive: gestionItems.some((item) =>
                          isActivePath(url, item.url),
                      ),
                      items: gestionItems,
                  },
              ]
            : []),
        {
            title: 'Explorar',
            url: repositories.url(),
            icon: BookOpen,
            isActive: explorarItems.some((item) => isActivePath(url, item.url)),
            items: explorarItems,
        },
    ];
};

export const AppSidebar = ({
    ...props
}: ComponentProps<typeof Sidebar>) => {
    const { auth } = usePage().props;
    const navMain = useNavMainItems();

    return (
        <Sidebar collapsible="icon" {...props}>
            <SidebarHeader>
                <SidebarBrand />
            </SidebarHeader>
            <SidebarContent>
                <NavMain items={navMain} />
            </SidebarContent>
            <SidebarFooter>
                <NavUser user={auth.user} />
            </SidebarFooter>
            <SidebarRail />
        </Sidebar>
    );
};
