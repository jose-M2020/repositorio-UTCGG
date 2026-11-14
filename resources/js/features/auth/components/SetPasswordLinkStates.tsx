import { Link, router } from '@inertiajs/react';
import { create as login } from '@/actions/App/Http/Controllers/Auth/AuthenticatedSessionController';
import { Button, buttonVariants } from '@/shared/components/ui';

export const SetPasswordVerifyingState = () => {
    return (
        <div
            className="space-y-2 py-4 text-center"
            role="status"
            aria-live="polite"
        >
            <p className="text-sm font-medium text-slate-900 dark:text-slate-100">
                Verificando enlace…
            </p>
            <p className="text-sm text-slate-600 dark:text-slate-400">
                Espera un momento mientras validamos tu enlace.
            </p>
        </div>
    );
};

export const SetPasswordInvalidState = () => {
    return (
        <div className="space-y-4" role="alert">
            <div className="space-y-1">
                <p className="text-sm font-medium text-slate-900 dark:text-slate-100">
                    Este enlace es inválido o ha expirado
                </p>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                    Solicita un nuevo enlace a un administrador e inténtalo de
                    nuevo.
                </p>
            </div>
            <div className="flex justify-end">
                <Link href={login.url()} className={buttonVariants()}>
                    Ir al inicio de sesión
                </Link>
            </div>
        </div>
    );
};

type SetPasswordRetryStateProps = {
    reloading?: boolean;
};

export const SetPasswordRetryState = ({
    reloading = false,
}: SetPasswordRetryStateProps) => {
    const handleRetry = () => {
        router.reload({ only: ['linkStatus'] });
    };

    return (
        <div className="space-y-4" role="alert">
            <div className="space-y-1">
                <p className="text-sm font-medium text-slate-900 dark:text-slate-100">
                    No pudimos verificar el enlace
                </p>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                    Hubo un problema de conexión o del servidor. Tu enlace puede
                    seguir siendo válido.
                </p>
            </div>
            <div className="flex justify-end">
                <Button
                    type="button"
                    onClick={handleRetry}
                    disabled={reloading}
                >
                    {reloading ? 'Reintentando…' : 'Reintentar'}
                </Button>
            </div>
        </div>
    );
};

type SetPasswordSuccessStateProps = {
    isActivation: boolean;
};

export const SetPasswordSuccessState = ({
    isActivation,
}: SetPasswordSuccessStateProps) => {
    return (
        <div className="space-y-4" role="status" aria-live="polite">
            <div className="space-y-1">
                <p className="text-sm font-medium text-slate-900 dark:text-slate-100">
                    {isActivation
                        ? 'Cuenta activada correctamente'
                        : 'Contraseña actualizada correctamente'}
                </p>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                    Ya puedes iniciar sesión con tu nueva contraseña.
                </p>
            </div>
            <div className="flex justify-end">
                <Link href={login.url()} className={buttonVariants()}>
                    Ir al inicio de sesión
                </Link>
            </div>
        </div>
    );
};
