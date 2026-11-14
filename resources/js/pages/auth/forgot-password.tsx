import { Head } from '@inertiajs/react';
import { ForgotPasswordContainer } from '@/features/auth/containers/ForgotPasswordContainer';

export default function ForgotPasswordPage() {
    return (
        <>
            <Head title="Restablecer contraseña" />
            <ForgotPasswordContainer />
        </>
    );
}
