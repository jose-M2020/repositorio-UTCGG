import { router } from '@inertiajs/react';
import { ChevronsUpDown, LogOut } from 'lucide-react';
import { destroy as logout } from '@/actions/App/Http/Controllers/Auth/AuthenticatedSessionController';
import type { AuthUser } from '@/features/auth';
import { Avatar, AvatarFallback } from '@/shared/components/ui/avatar';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/shared/components/ui/dropdown-menu';
import {
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    useSidebar,
} from '@/shared/components/ui/sidebar';

const getUserInitials = (user: AuthUser | null) => {
    if (!user) {
        return 'U';
    }

    const first = user.nombre.trim().charAt(0);
    const last = user.apellido.trim().charAt(0);
    const initials = `${first}${last}`.toUpperCase();

    return initials || user.email.charAt(0).toUpperCase() || 'U';
};

const getUserDisplayName = (user: AuthUser | null) => {
    if (!user) {
        return 'Usuario';
    }

    return `${user.nombre} ${user.apellido}`.trim() || user.email;
};

export const NavUser = ({ user }: { user: AuthUser | null }) => {
    const { isMobile } = useSidebar();
    const displayName = getUserDisplayName(user);
    const initials = getUserInitials(user);

    const handleLogout = () => {
        router.post(logout.url());
    };

    return (
        <SidebarMenu>
            <SidebarMenuItem>
                <DropdownMenu>
                    <DropdownMenuTrigger
                        render={
                            <SidebarMenuButton
                                size="lg"
                                className="data-open:bg-sidebar-accent data-open:text-sidebar-accent-foreground"
                                aria-label="Menú de usuario"
                            />
                        }
                    >
                        <Avatar className="size-8 rounded-lg">
                            <AvatarFallback className="rounded-lg">
                                {initials}
                            </AvatarFallback>
                        </Avatar>
                        <div className="grid flex-1 text-left text-sm leading-tight">
                            <span className="truncate font-medium">
                                {displayName}
                            </span>
                            <span className="truncate text-xs">
                                {user?.email}
                            </span>
                        </div>
                        <ChevronsUpDown className="ml-auto size-4" aria-hidden="true" />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                        className="min-w-56 rounded-lg"
                        side={isMobile ? 'bottom' : 'right'}
                        align="end"
                        sideOffset={4}
                    >
                        <DropdownMenuGroup>
                            <DropdownMenuLabel className="p-0 font-normal">
                                <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                                    <Avatar className="size-8 rounded-lg">
                                        <AvatarFallback className="rounded-lg">
                                            {initials}
                                        </AvatarFallback>
                                    </Avatar>
                                    <div className="grid flex-1 text-left text-sm leading-tight">
                                        <span className="truncate font-medium">
                                            {displayName}
                                        </span>
                                        <span className="truncate text-xs">
                                            {user?.email}
                                        </span>
                                    </div>
                                </div>
                            </DropdownMenuLabel>
                        </DropdownMenuGroup>
                        <DropdownMenuSeparator />
                        <DropdownMenuGroup>
                            <DropdownMenuItem
                                variant="destructive"
                                onClick={handleLogout}
                            >
                                <LogOut />
                                Cerrar sesión
                            </DropdownMenuItem>
                        </DropdownMenuGroup>
                    </DropdownMenuContent>
                </DropdownMenu>
            </SidebarMenuItem>
        </SidebarMenu>
    );
};
