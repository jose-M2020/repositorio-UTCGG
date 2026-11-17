import { Head } from '@inertiajs/react';
import { ForbiddenContainer } from '@/features/errors';

export default function ForbiddenPage() {
    return (
        <>
            <Head title="Acceso denegado" />
            <ForbiddenContainer />
        </>
    );
}
