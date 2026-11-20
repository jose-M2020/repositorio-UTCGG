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
                distribution_proposal?: Array<{
                    repository_id: number;
                    advisor_id: number | null;
                    career_id?: number | null;
                    uncovered?: boolean;
                }> | null;
                distribution_failures?: Array<{
                    repository_id: number;
                    message: string;
                }> | null;
            };
            sidebarOpen: boolean;
            [key: string]: unknown;
        };
    }
}
