import { Link, usePage } from '@inertiajs/react';
import {
    BookOpen,
    Compass,
    FolderKanban,
    FolderPlus,
    Globe,
    GraduationCap,
    Layers,
    Library,
    Settings2,
    ShieldCheck,
    Users,
} from 'lucide-react';
import type { ComponentProps } from 'react';
import { index as home } from '@/actions/App/Http/Controllers/HomeController';
import {
    create as createRepository,
    index as repositories,
    mine,
} from '@/actions/App/Http/Controllers/RepositoryController';
import { index as careers } from '@/actions/App/Http/Controllers/CareerController';
import { index as educationLevels } from '@/actions/App/Http/Controllers/EducationLevelController';
import { index as projectTypes } from '@/actions/App/Http/Controllers/ProjectTypeController';
import { index as roles } from '@/actions/App/Http/Controllers/RoleController';
import { index as users } from '@/actions/App/Http/Controllers/UserController';
import { AUTH_ABILITIES } from '@/features/auth';
import {
    NavMain,
    type NavMainGroup,
    type NavMainLink,
} from '@/shared/components/sidebar/nav-main';
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

const useNavGroups = (): NavMainGroup[] => {
    const { auth } = usePage().props;

    const projectItems: NavMainLink[] = [
        {
            title: 'Mis proyectos',
            url: mine.url(),
            icon: FolderKanban,
        },
        ...(auth.abilities[AUTH_ABILITIES.REPOSITORIES_CREATE]
            ? [
                  {
                      title: 'Nuevo proyecto',
                      url: createRepository.url(),
                      icon: FolderPlus,
                  },
              ]
            : []),
    ];

    const administrationItems: NavMainLink[] = [
        ...(auth.abilities[AUTH_ABILITIES.USERS_VIEW]
            ? [
                  {
                      title: 'Usuarios',
                      url: users.url(),
                      icon: Users,
                  },
              ]
            : []),
        ...(auth.abilities[AUTH_ABILITIES.ROLES_VIEW]
            ? [
                  {
                      title: 'Roles y permisos',
                      url: roles.url(),
                      icon: ShieldCheck,
                  },
              ]
            : []),
    ];

    const catalogItems: NavMainLink[] = [
        ...(auth.abilities[AUTH_ABILITIES.CAREERS_VIEW]
            ? [
                  {
                      title: 'Carreras',
                      url: careers.url(),
                      icon: GraduationCap,
                  },
              ]
            : []),
        ...(auth.abilities[AUTH_ABILITIES.PROJECT_TYPES_VIEW]
            ? [
                  {
                      title: 'Tipos de proyecto',
                      url: projectTypes.url(),
                      icon: Layers,
                  },
              ]
            : []),
        ...(auth.abilities[AUTH_ABILITIES.EDUCATION_LEVELS_VIEW]
            ? [
                  {
                      title: 'Niveles educativos',
                      url: educationLevels.url(),
                      icon: BookOpen,
                  },
              ]
            : []),
    ];

    const exploreItems: NavMainLink[] = [
        {
            title: 'Sitio público',
            url: home.url(),
            icon: Globe,
        },
    ];

    return [
        {
            title: 'Proyectos',
            icon: FolderKanban,
            items: projectItems,
        },
        ...(administrationItems.length > 0
            ? [
                  {
                      title: 'Administración',
                      icon: Settings2,
                      items: administrationItems,
                  },
              ]
            : []),
        ...(catalogItems.length > 0
            ? [
                  {
                      title: 'Catálogos',
                      icon: Layers,
                      items: catalogItems,
                  },
              ]
            : []),
        {
            title: 'Explorar',
            icon: Compass,
            items: exploreItems,
        },
    ];
};

const SidebarAtmosphere = () => {
    return (
        <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
        >
            <div className="absolute -top-16 -right-14 size-48 rounded-full bg-accent/70 blur-2xl" />
            <div className="absolute top-1/3 -left-20 size-56 rounded-full bg-primary/20 blur-3xl" />
        </div>
    );
};

export const AppSidebar = ({
    ...props
}: ComponentProps<typeof Sidebar>) => {
    const { auth } = usePage().props;
    const navGroups = useNavGroups();

    return (
        <Sidebar collapsible="icon" {...props}>
            <SidebarAtmosphere />
            <SidebarHeader className="relative z-10 border-b border-sidebar-border/70">
                <SidebarBrand />
            </SidebarHeader>
            <SidebarContent className="relative z-10">
                <NavMain groups={navGroups} />
            </SidebarContent>
            <SidebarFooter className="relative z-10 border-t border-sidebar-border/70">
                <NavUser user={auth.user} />
            </SidebarFooter>
            <SidebarRail />
        </Sidebar>
    );
};
