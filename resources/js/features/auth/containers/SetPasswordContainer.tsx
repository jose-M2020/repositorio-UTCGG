import { Form, usePage } from '@inertiajs/react';
import { store } from '@/actions/App/Http/Controllers/Auth/SetPasswordController';
import { AuthShell } from '../components/AuthShell';
import { SetPasswordForm } from '../components/SetPasswordForm';

type SetPasswordContainerProps = {
    token: string;
    email: string;
    purpose: string;
};

export const SetPasswordContainer = ({
    token,
    email,
    purpose,
}: SetPasswordContainerProps) => {
    const { flash } = usePage().props;
    const isActivation = purpose === 'activation';

    return (
        <AuthShell
            title={isActivation ? 'Activar cuenta' : 'Restablecer contraseña'}
            description={
                isActivation
                    ? 'Elige tu contraseña para activar la cuenta.'
                    : 'Elige una nueva contraseña para tu cuenta.'
            }
        >
            {flash.status ? (
                <p className="mb-4 rounded-lg border border-primary/20 bg-accent px-3 py-2 text-sm text-accent-foreground">
                    {flash.status}
                </p>
            ) : null}

            <Form {...store.form()} className="space-y-4">
                {({ errors, processing }) => (
                    <SetPasswordForm
                        email={email}
                        token={token}
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
    );
};
