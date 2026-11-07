import { Form } from '@inertiajs/react';
import { store } from '@/actions/App/Http/Controllers/Auth/AuthenticatedSessionController';
import { AuthShell } from '../components/AuthShell';
import { LoginForm } from '../components/LoginForm';

export const LoginContainer = () => {
    return (
        <AuthShell
            title="Iniciar sesión"
            description="Accede a tu cuenta del repositorio UTCGG."
        >
            <Form {...store.form()} className="space-y-4">
                {({ errors, processing }) => (
                    <LoginForm errors={errors} processing={processing} />
                )}
            </Form>
        </AuthShell>
    );
};
