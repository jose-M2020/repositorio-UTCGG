import { Head } from '@inertiajs/react';
import { RegisterContainer } from '@/features/auth';

export default function RegisterPage() {
    return (
        <>
            <Head title="Crear cuenta" />
            <RegisterContainer />
        </>
    );
}
