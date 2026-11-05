import { Head } from '@inertiajs/react';
import { LoginContainer } from '@/features/auth';

export default function LoginPage() {
    return (
        <>
            <Head title="Iniciar sesión" />
            <LoginContainer />
        </>
    );
}
