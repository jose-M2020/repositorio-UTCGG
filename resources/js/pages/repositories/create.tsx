import { Head } from '@inertiajs/react';
import { RepositoryCreateContainer } from '@/features/repositories';

export default function RepositoriesCreatePage() {
    return (
        <>
            <Head title="Nuevo repositorio" />
            <RepositoryCreateContainer />
        </>
    );
}
