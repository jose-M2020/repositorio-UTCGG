import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import type { ComponentType, ReactNode } from 'react';
import { createRoot } from 'react-dom/client';
import { FlashToaster } from '@/shared/components';
import { PanelLayout, PublicLayout } from '@/shared/layouts';

type InertiaReactComponent = ComponentType<any> & {
    layout?:
        | ComponentType<{ children: ReactNode }>
        | Array<ComponentType<{ children: ReactNode }>>
        | ((page: ReactNode) => ReactNode)
        | ((props: any) => any);
};

type PageLayout = ComponentType<{ children: ReactNode }>;

const appName = import.meta.env.VITE_APP_NAME || 'Laravel';

const SURFACE_LAYOUTS: Record<string, PageLayout> = {
    public: PublicLayout,
    panel: PanelLayout,
};

const resolveLayout = (name: string): PageLayout | null => {
    const surface = name.split('/')[0] ?? '';

    return SURFACE_LAYOUTS[surface] ?? null;
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
        const initialError = props.initialPage.props.flash?.error;

        createRoot(el).render(
            <>
                <App {...props} />
                <FlashToaster
                    initialStatus={initialStatus}
                    initialError={initialError}
                />
            </>,
        );
    },

    progress: {
        color: '#4B5563',
    },
});
