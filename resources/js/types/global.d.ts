import type { Auth } from '@/features/auth';

declare module 'react' {
    interface InputHTMLAttributes<T> {
        passwordrules?: string;
    }
}

declare module '@inertiajs/core' {
    export interface InertiaConfig {
        sharedPageProps: {
            name: string;
            auth: Auth;
            flash: {
                status: string | null;
                error: string | null;
            };
            sidebarOpen: boolean;
            [key: string]: unknown;
        };
    }
}
