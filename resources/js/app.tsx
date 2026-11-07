import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import type { ComponentType, ReactNode } from 'react';
import { createRoot } from 'react-dom/client';
import { FlashToaster } from '@/shared/components';
import { AuthenticatedLayout, PublicLayout } from '@/shared/layouts';

type InertiaReactComponent = ComponentType<any> & {
    layout?:
        | ComponentType<{ children: ReactNode }>
        | Array<ComponentType<{ children: ReactNode }>>
        | ((page: ReactNode) => ReactNode)
        | ((props: any) => any);
};

type PageLayout = ComponentType<{ children: ReactNode }>;

const appName = import.meta.env.VITE_APP_NAME || 'Laravel';

const PAGE_LAYOUTS: Record<string, PageLayout> = {
    home: PublicLayout,
    about: PublicLayout,
    'repositories/index': PublicLayout,
    'repositories/show': PublicLayout,
};

const SECTION_LAYOUTS: Record<string, PageLayout> = {
    repositories: AuthenticatedLayout,
    files: AuthenticatedLayout,
    users: AuthenticatedLayout,
    roles: AuthenticatedLayout,
};

const resolveLayout = (name: string): PageLayout | null => {
    const section = name.split('/')[0] ?? '';

    return PAGE_LAYOUTS[name] ?? SECTION_LAYOUTS[section] ?? null;
};

void createInertiaApp({
    title: (title) => (title ? `${title} - ${appName}` : appName),
    layout: resolveLayout,
    resolve: (name) =>
        resolvePageComponent(
            `./pages/${name}.tsx`,
            import.meta.glob('./pages/**/*.tsx') as Record<
                string,
                () => Promise<InertiaReactComponent>
            >,
        ),
    setup({ el, App, props }) {
        const initialStatus = props.initialPage.props.flash?.status;

        createRoot(el).render(
            <>
                <App {...props} />
                <FlashToaster initialStatus={initialStatus} />
            </>,
        );
    },

    progress: {
        color: '#4B5563',
    },
});
