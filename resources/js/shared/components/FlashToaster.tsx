import { router } from '@inertiajs/react';
import { useEffect } from 'react';
import { Toaster, toast } from 'sonner';

type FlashToasterProps = {
    initialStatus?: string | null;
    initialError?: string | null;
};

const showStatusToast = (status: unknown) => {
    if (typeof status !== 'string' || status === '') {
        return;
    }

    toast.success(status);
};

const showErrorToast = (error: unknown) => {
    if (typeof error !== 'string' || error === '') {
        return;
    }

    toast.error(error);
};

export const FlashToaster = ({
    initialStatus,
    initialError,
}: FlashToasterProps) => {
    useEffect(() => {
        showStatusToast(initialStatus);
        showErrorToast(initialError);

        return router.on('success', (event) => {
            showStatusToast(event.detail.page.props.flash?.status);
            showErrorToast(event.detail.page.props.flash?.error);
        });
    }, [initialStatus, initialError]);

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
