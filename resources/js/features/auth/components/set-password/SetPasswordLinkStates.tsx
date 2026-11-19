import { Link, router } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';
import { create as login } from '@/actions/App/Http/Controllers/Auth/AuthenticatedSessionController';
import { create as forgotPassword } from '@/actions/App/Http/Controllers/Auth/PasswordResetLinkController';
import { Button, buttonVariants } from '@/shared/components/ui';

export const SetPasswordVerifyingState = () => {
    return (
        <div
            className="flex flex-col items-center justify-center gap-3 py-8"
            role="status"
            aria-live="polite"
            aria-label="Verificando enlace"
        >
            <LoaderCircle
                className="size-8 animate-spin text-slate-500 dark:text-slate-400"
                aria-hidden="true"
            />
            <p className="text-sm text-slate-600 dark:text-slate-400">
                Verificando enlace…
            </p>
        </div>
    );
};

export const SetPasswordInvalidActions = () => {
    return (
        <div className="flex flex-wrap items-center justify-end gap-2">
            <Link
                href={login.url()}
                className={buttonVariants({ variant: 'outline' })}
            >
                Ir al inicio de sesión
            </Link>
            <Link href={forgotPassword.url()} className={buttonVariants()}>
                Solicitar nuevo enlace
            </Link>
        </div>
    );
};

type SetPasswordRetryActionsProps = {
    reloading?: boolean;
};

export const SetPasswordRetryActions = ({
    reloading = false,
}: SetPasswordRetryActionsProps) => {
    const handleRetry = () => {
        router.reload({ only: ['linkStatus'] });
    };

    return (
        <div className="flex justify-end">
            <Button type="button" onClick={handleRetry} disabled={reloading}>
                {reloading ? 'Reintentando…' : 'Reintentar'}
            </Button>
        </div>
    );
};

export const SetPasswordSuccessActions = () => {
    return (
        <div className="flex justify-end">
            <Link href={login.url()} className={buttonVariants()}>
                Ir al inicio de sesión
            </Link>
        </div>
    );
};
