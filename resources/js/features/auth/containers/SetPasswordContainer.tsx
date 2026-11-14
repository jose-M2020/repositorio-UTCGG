import { Deferred, Form, usePage } from '@inertiajs/react';
import { store } from '@/actions/App/Http/Controllers/Auth/SetPasswordController';
import { AuthShell } from '../components/AuthShell';
import { SetPasswordForm } from '../components/SetPasswordForm';
import {
    SetPasswordInvalidActions,
    SetPasswordRetryActions,
    SetPasswordSuccessActions,
    SetPasswordVerifyingState,
} from '../components/SetPasswordLinkStates';
import {
    PASSWORD_SET_STATUS,
    type SetPasswordLinkStatus,
    type SetPasswordPurpose,
} from '../types';

type SetPasswordContainerProps = {
    token: string;
    email: string;
    purpose: string;
    linkStatus?: SetPasswordLinkStatus;
};

export const SetPasswordContainer = ({
    token,
    email,
    purpose,
    linkStatus,
}: SetPasswordContainerProps) => {
    const { flash } = usePage().props;
    const resolvedPurpose: SetPasswordPurpose =
        purpose === 'activation' ? 'activation' : 'reset';
    const isActivation = resolvedPurpose === 'activation';
    const passwordWasSet = flash.status === PASSWORD_SET_STATUS;

    if (passwordWasSet) {
        return (
            <AuthShell
                title={
                    isActivation
                        ? 'Cuenta activada correctamente'
                        : 'Contraseña actualizada correctamente'
                }
                description="Ya puedes iniciar sesión con tu nueva contraseña."
            >
                <SetPasswordSuccessActions />
            </AuthShell>
        );
    }

    return (
        <Deferred
            data="linkStatus"
            fallback={
                <AuthShell>
                    <SetPasswordVerifyingState />
                </AuthShell>
            }
            rescue={({ reloading }) => (
                <AuthShell
                    title="No pudimos verificar el enlace"
                    description="Hubo un problema de conexión o del servidor. Tu enlace puede seguir siendo válido."
                >
                    <SetPasswordRetryActions reloading={reloading} />
                </AuthShell>
            )}
        >
            {linkStatus === 'valid' ? (
                <AuthShell
                    title={
                        isActivation
                            ? 'Activar cuenta'
                            : 'Restablecer contraseña'
                    }
                    description={
                        <p>
                            {isActivation
                                ? 'Elige tu contraseña para activar la cuenta de '
                                : 'Elige una nueva contraseña para '}
                            <strong className="font-semibold text-slate-900 dark:text-slate-100">
                                {email}
                            </strong>
                            .
                        </p>
                    }
                >
                    <Form {...store.form()} className="space-y-4">
                        {({ errors, processing }) => (
                            <SetPasswordForm
                                email={email}
                                token={token}
                                purpose={resolvedPurpose}
                                errors={errors}
                                processing={processing}
                                submitLabel={
                                    isActivation
                                        ? 'Activar cuenta'
                                        : 'Guardar contraseña'
                                }
                            />
                        )}
                    </Form>
                </AuthShell>
            ) : (
                <AuthShell
                    title="Este enlace es inválido o ha expirado"
                    description="Solicita un nuevo enlace a un administrador e inténtalo de nuevo."
                >
                    <SetPasswordInvalidActions />
                </AuthShell>
            )}
        </Deferred>
    );
};
