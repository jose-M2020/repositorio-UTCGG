import type { ReactNode } from 'react';
import { PublicHeader, SiteFooter } from '@/shared/components';

type PublicLayoutProps = {
    children: ReactNode;
};

export const PublicLayout = ({ children }: PublicLayoutProps) => {
    return (
        <div className="flex min-h-screen flex-col bg-background">
            <PublicHeader />
            <div className="flex flex-1 flex-col">{children}</div>
            <SiteFooter />
        </div>
    );
};
