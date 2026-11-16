import { Link, usePage } from '@inertiajs/react';
import { ChevronRight, type LucideIcon } from 'lucide-react';
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from '@/shared/components/ui/collapsible';
import {
    SidebarGroup,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarMenuSub,
    SidebarMenuSubButton,
    SidebarMenuSubItem,
    useSidebar,
} from '@/shared/components/ui/sidebar';

export type NavMainLink = {
    title: string;
    url: string;
    icon: LucideIcon;
};

export type NavMainGroup = {
    title: string;
    icon: LucideIcon;
    items: NavMainLink[];
};

const isActivePath = (currentUrl: string, href: string) => {
    const currentPath = currentUrl.split('?')[0] ?? currentUrl;
    const linkPath = href.split('?')[0] ?? href;

    return (
        currentPath === linkPath ||
        (linkPath !== '/' && currentPath.startsWith(`${linkPath}/`))
    );
};

export const NavMain = ({ groups }: { groups: NavMainGroup[] }) => {
    const { url } = usePage();
    const { isMobile, setOpenMobile } = useSidebar();

    const handleNavigate = () => {
        if (isMobile) {
            setOpenMobile(false);
        }
    };

    if (groups.length === 0) {
        return null;
    }

    return (
        <SidebarGroup>
            <SidebarMenu>
                {groups.map((group) => {
                    const GroupIcon = group.icon;
                    const isGroupActive = group.items.some((item) =>
                        isActivePath(url, item.url),
                    );

                    return (
                        <Collapsible
                            key={group.title}
                            defaultOpen
                            className="group/collapsible"
                            render={<SidebarMenuItem />}
                        >
                            <CollapsibleTrigger
                                render={
                                    <SidebarMenuButton
                                        tooltip={group.title}
                                        isActive={isGroupActive}
                                    />
                                }
                            >
                                <GroupIcon />
                                <span>{group.title}</span>
                                <ChevronRight className="ml-auto transition-transform duration-200 group-data-open/collapsible:rotate-90" />
                            </CollapsibleTrigger>
                            <CollapsibleContent>
                                <SidebarMenuSub>
                                    {group.items.map((item) => {
                                        const ItemIcon = item.icon;

                                        return (
                                            <SidebarMenuSubItem key={item.url}>
                                                <SidebarMenuSubButton
                                                    render={
                                                        <Link href={item.url} />
                                                    }
                                                    isActive={isActivePath(
                                                        url,
                                                        item.url,
                                                    )}
                                                    onClick={handleNavigate}
                                                    className="data-active:bg-sidebar-primary/15 data-active:font-medium data-active:text-sidebar-primary"
                                                >
                                                    <ItemIcon />
                                                    <span>{item.title}</span>
                                                </SidebarMenuSubButton>
                                            </SidebarMenuSubItem>
                                        );
                                    })}
                                </SidebarMenuSub>
                            </CollapsibleContent>
                        </Collapsible>
                    );
                })}
            </SidebarMenu>
        </SidebarGroup>
    );
};
