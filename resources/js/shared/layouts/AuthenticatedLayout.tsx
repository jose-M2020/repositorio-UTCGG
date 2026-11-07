import type { ReactNode } from 'react';
import { AppShell } from '@/shared/components';

type AuthenticatedLayoutProps = {
    children: ReactNode;
};

export const AuthenticatedLayout = ({ children }: AuthenticatedLayoutProps) => {
    return <AppShell>{children}</AppShell>;
};
