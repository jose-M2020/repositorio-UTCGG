import { Head } from '@inertiajs/react';
import {
    RepositoriesMineContainer,
    type PaginatedRepositories,
} from '@/features/repositories';

type PageProps = {
    repositorios: PaginatedRepositories;
};

export default function RepositoriesMinePage({ repositorios }: PageProps) {
    return (
        <>
            <Head title="Mis repositorios" />
            <RepositoriesMineContainer repositorios={repositorios} />
        </>
    );
}
