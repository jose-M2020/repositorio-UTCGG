import { Form, usePage } from '@inertiajs/react';
import { store } from '@/actions/App/Http/Controllers/Auth/AuthenticatedSessionController';
import { AuthShell } from '../components/AuthShell';
import { LoginForm } from '../components/LoginForm';

export const LoginContainer = () => {
    const { flash } = usePage().props;

    return (
        <AuthShell
            title="Iniciar sesión"
            description="Accede a tu cuenta del repositorio UTCGG."
        >
            {flash.status ? (
                <p className="mb-4 rounded-lg border border-primary/20 bg-accent px-3 py-2 text-sm text-accent-foreground">
                    {flash.status}
                </p>
            ) : null}

            <Form {...store.form()} className="space-y-4">
                {({ errors, processing }) => (
                    <LoginForm errors={errors} processing={processing} />
                )}
            </Form>
        </AuthShell>
    );
};
