import { Deferred, Form, usePage } from '@inertiajs/react';
import { store } from '@/actions/App/Http/Controllers/Auth/SetPasswordController';
import { AuthShell } from '../components/AuthShell';
import { SetPasswordForm } from '../components/SetPasswordForm';
import {
    SetPasswordInvalidState,
    SetPasswordRetryState,
    SetPasswordSuccessState,
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

    const title = isActivation ? 'Activar cuenta' : 'Restablecer contraseña';
    const description = passwordWasSet
        ? isActivation
            ? 'Tu cuenta ya está lista para usarse.'
            : 'Tu contraseña ya fue actualizada.'
        : isActivation
          ? 'Elige tu contraseña para activar la cuenta.'
          : 'Elige una nueva contraseña para tu cuenta.';

    return (
        <AuthShell title={title} description={description}>
            {passwordWasSet ? (
                <SetPasswordSuccessState isActivation={isActivation} />
            ) : (
                <Deferred
                    data="linkStatus"
                    fallback={<SetPasswordVerifyingState />}
                    rescue={({ reloading }) => (
                        <SetPasswordRetryState reloading={reloading} />
                    )}
                >
                    {linkStatus === 'valid' ? (
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
                    ) : (
                        <SetPasswordInvalidState />
                    )}
                </Deferred>
            )}
        </AuthShell>
    );
};
