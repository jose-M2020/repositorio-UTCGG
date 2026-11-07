import { Link, usePage } from '@inertiajs/react';
import { ChevronRight, type LucideIcon } from 'lucide-react';
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from '@/shared/components/ui/collapsible';
import {
    SidebarGroup,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarMenuSub,
    SidebarMenuSubButton,
    SidebarMenuSubItem,
    useSidebar,
} from '@/shared/components/ui/sidebar';

export type NavMainItem = {
    title: string;
    url: string;
    icon?: LucideIcon;
    isActive?: boolean;
    items?: {
        title: string;
        url: string;
    }[];
};

const isActivePath = (currentUrl: string, href: string) => {
    const currentPath = currentUrl.split('?')[0] ?? currentUrl;
    const linkPath = href.split('?')[0] ?? href;

    return (
        currentPath === linkPath ||
        (linkPath !== '/' && currentPath.startsWith(`${linkPath}/`))
    );
};

export const NavMain = ({ items }: { items: NavMainItem[] }) => {
    const { url } = usePage();
    const { isMobile, setOpenMobile } = useSidebar();

    const handleNavigate = () => {
        if (isMobile) {
            setOpenMobile(false);
        }
    };

    if (items.length === 0) {
        return null;
    }

    return (
        <SidebarGroup>
            <SidebarGroupLabel>Navegación</SidebarGroupLabel>
            <SidebarMenu>
                {items.map((item) => {
                    const Icon = item.icon;

                    return (
                        <Collapsible
                            key={item.title}
                            defaultOpen={item.isActive}
                            className="group/collapsible"
                            render={<SidebarMenuItem />}
                        >
                            <CollapsibleTrigger
                                render={
                                    <SidebarMenuButton tooltip={item.title} />
                                }
                            >
                                {Icon ? <Icon /> : null}
                                <span>{item.title}</span>
                                <ChevronRight className="ml-auto transition-transform duration-200 group-data-open/collapsible:rotate-90" />
                            </CollapsibleTrigger>
                            <CollapsibleContent>
                                <SidebarMenuSub>
                                    {item.items?.map((subItem) => (
                                        <SidebarMenuSubItem key={subItem.title}>
                                            <SidebarMenuSubButton
                                                render={
                                                    <Link href={subItem.url} />
                                                }
                                                isActive={isActivePath(
                                                    url,
                                                    subItem.url,
                                                )}
                                                onClick={handleNavigate}
                                            >
                                                <span>{subItem.title}</span>
                                            </SidebarMenuSubButton>
                                        </SidebarMenuSubItem>
                                    ))}
                                </SidebarMenuSub>
                            </CollapsibleContent>
                        </Collapsible>
                    );
                })}
            </SidebarMenu>
        </SidebarGroup>
    );
};
