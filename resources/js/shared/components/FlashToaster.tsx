import { router } from '@inertiajs/react';
import { useEffect } from 'react';
import { Toaster, toast } from 'sonner';

type FlashToasterProps = {
    initialStatus?: string | null;
};

const showStatusToast = (status: unknown) => {
    if (typeof status !== 'string' || status === '') {
        return;
    }

    toast.success(status);
};

export const FlashToaster = ({ initialStatus }: FlashToasterProps) => {
    useEffect(() => {
        showStatusToast(initialStatus);

        return router.on('success', (event) => {
            showStatusToast(event.detail.page.props.flash?.status);
        });
    }, [initialStatus]);

    return (
        <Toaster
            richColors
            closeButton
            position="top-right"
            theme="system"
            toastOptions={{
                className: 'font-sans',
            }}
        />
    );
};
