import { Form, usePage } from '@inertiajs/react';
import { store } from '@/actions/App/Http/Controllers/Auth/PasswordResetLinkController';
import { AuthShell } from '../components/shared/AuthShell';
import { ForgotPasswordForm } from '../components/ForgotPasswordForm';

export const ForgotPasswordContainer = () => {
    const { flash } = usePage().props;

    return (
        <AuthShell
            title="Restablecer contraseña"
            description="Ingresa tu correo y te enviaremos un enlace para continuar."
        >
            {flash.status ? (
                <p className="mb-4 rounded-lg border border-primary/20 bg-accent px-3 py-2 text-sm text-accent-foreground">
                    {flash.status}
                </p>
            ) : null}

            <Form {...store.form()} className="space-y-4">
                {({ errors, processing }) => (
                    <ForgotPasswordForm
                        errors={errors}
                        processing={processing}
                    />
                )}
            </Form>
        </AuthShell>
    );
};
