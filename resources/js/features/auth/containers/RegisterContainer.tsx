import { Form } from '@inertiajs/react';
import { create as loginPage } from '@/actions/App/Http/Controllers/Auth/AuthenticatedSessionController';
import { store } from '@/actions/App/Http/Controllers/Auth/RegisteredUserController';
import { AuthShell } from '../components/AuthShell';
import { RegisterForm } from '../components/RegisterForm';

export const RegisterContainer = () => {
    return (
        <AuthShell
            title="Crear cuenta"
            description="Registra un nuevo usuario para acceder al repositorio UTCGG."
            maxWidthClassName="max-w-lg"
        >
            <Form {...store.form()} className="space-y-4">
                {({ errors, processing }) => (
                    <RegisterForm
                        errors={errors}
                        processing={processing}
                        loginUrl={loginPage.url()}
                    />
                )}
            </Form>
        </AuthShell>
    );
};
