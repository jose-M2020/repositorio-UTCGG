import { Link, router } from '@inertiajs/react';
import {
  ChevronsUpDown,
  LogOut,
  Settings,
  type LucideIcon,
} from 'lucide-react';
import { edit as accountSettings } from '@/actions/App/Http/Controllers/AccountSettingsController';
import { destroy as logout } from '@/actions/App/Http/Controllers/Auth/AuthenticatedSessionController';
import type { AuthUser } from '@/features/auth';
import { Avatar, AvatarFallback } from '@/shared/components/ui/avatar';
import { formatUserName } from '@/shared/lib';
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

type NavUserMenuItem = {
  id: string;
  label: string;
  icon: LucideIcon;
  href?: string;
  onClick?: () => void;
  variant?: 'default' | 'destructive';
};

const getUserInitials = (user: AuthUser | null) => {
  if (!user) {
    return 'U';
  }

  const first = user.first_name.trim().charAt(0);
  const last = user.last_name.trim().charAt(0);
  const initials = `${first}${last}`.toUpperCase();

  return initials || user.email.charAt(0).toUpperCase() || 'U';
};

const getUserDisplayName = (user: AuthUser | null) => {
  if (!user) {
    return 'Usuario';
  }

  return formatUserName(user) || user.email;
};

export const NavUser = ({ user }: { user: AuthUser | null }) => {
  const { isMobile } = useSidebar();
  const displayName = getUserDisplayName(user);
  const initials = getUserInitials(user);

  const handleLogout = () => {
    router.post(logout.url());
  };

  const menuGroups: NavUserMenuItem[][] = [
    [
      {
        id: 'settings',
        label: 'Configuración',
        icon: Settings,
        href: accountSettings.url(),
      },
    ],
    [
      {
        id: 'logout',
        label: 'Cerrar sesión',
        icon: LogOut,
        onClick: handleLogout,
        variant: 'destructive',
      },
    ],
  ];

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
              <AvatarFallback className="rounded-lg bg-sidebar-primary/15 text-sidebar-primary">
                {initials}
              </AvatarFallback>
            </Avatar>
            <div className="grid flex-1 text-left text-sm leading-tight">
              <span className="truncate font-medium">{displayName}</span>
              <span className="truncate text-xs text-sidebar-foreground/65">
                {user?.email}
              </span>
            </div>
            <ChevronsUpDown className="ml-auto size-4" aria-hidden="true" />
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-64 min-w-64 rounded-lg"
            side={isMobile ? 'bottom' : 'right'}
            align="end"
            sideOffset={8}
          >
            <DropdownMenuGroup>
              <DropdownMenuLabel className="p-0 font-normal">
                <div className="flex items-center gap-3 px-2 py-2.5 text-left text-sm">
                  <Avatar className="size-9 rounded-lg">
                    <AvatarFallback className="rounded-lg">
                      {initials}
                    </AvatarFallback>
                  </Avatar>
                  <div className="grid min-w-0 flex-1 gap-0.5 text-left text-sm leading-snug">
                    <span className="truncate font-medium">{displayName}</span>
                    <span className="truncate text-xs text-muted-foreground">
                      {user?.email}
                    </span>
                  </div>
                </div>
              </DropdownMenuLabel>
            </DropdownMenuGroup>

            {menuGroups.map((group) => (
              <div key={group.map((item) => item.id).join('-')}>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  {group.map((item) => {
                    const Icon = item.icon;

                    return (
                      <DropdownMenuItem
                        key={item.id}
                        className="gap-2 px-2 py-2"
                        variant={item.variant}
                        onClick={item.onClick}
                        render={
                          item.href ? <Link href={item.href} /> : undefined
                        }
                      >
                        <Icon aria-hidden="true" />
                        {item.label}
                      </DropdownMenuItem>
                    );
                  })}
                </DropdownMenuGroup>
              </div>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
};
