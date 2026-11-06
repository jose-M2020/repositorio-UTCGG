import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import type { ComponentType, ReactNode } from 'react';
import { createRoot } from 'react-dom/client';
import { FlashToaster } from '@/shared/components';

type InertiaReactComponent = ComponentType<any> & {
    layout?:
        | ComponentType<{ children: ReactNode }>
        | Array<ComponentType<{ children: ReactNode }>>
        | ((page: ReactNode) => ReactNode)
        | ((props: any) => any);
};

const appName = import.meta.env.VITE_APP_NAME || 'Laravel';

void createInertiaApp({
    title: (title) => (title ? `${title} - ${appName}` : appName),
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
