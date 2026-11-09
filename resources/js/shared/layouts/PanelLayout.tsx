import { usePage } from '@inertiajs/react';
import type { ReactNode } from 'react';
import { AppSidebar } from '@/shared/components/sidebar/AppSidebar';
import { Separator } from '@/shared/components/ui/separator';
import {
    SidebarInset,
    SidebarProvider,
    SidebarTrigger,
} from '@/shared/components/ui/sidebar';
import { TooltipProvider } from '@/shared/components/ui/tooltip';

type AuthenticatedLayoutProps = {
    children: ReactNode;
};

export const AuthenticatedLayout = ({ children }: AuthenticatedLayoutProps) => {
    const { sidebarOpen } = usePage().props;

    return (
        <TooltipProvider>
            <SidebarProvider defaultOpen={sidebarOpen ?? true}>
                <AppSidebar />
                <SidebarInset>
                    <header className="flex h-16 shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
                        <div className="flex items-center gap-2 px-4">
                            <SidebarTrigger className="-ml-1" />
                            <Separator
                                orientation="vertical"
                                className="mr-2 data-vertical:h-4 data-vertical:self-auto"
                            />
                        </div>
                    </header>
                    <div className="flex flex-1 flex-col">{children}</div>
                </SidebarInset>
            </SidebarProvider>
        </TooltipProvider>
    );
};
