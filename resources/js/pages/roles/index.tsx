import { Head } from '@inertiajs/react';
import {
    RolesIndexContainer,
    type PaginatedRoles,
} from '@/features/roles';

type RolesIndexPageProps = {
    roles: PaginatedRoles;
};

export default function RolesIndexPage({ roles }: RolesIndexPageProps) {
    return (
        <>
            <Head title="Roles" />
            <RolesIndexContainer roles={roles} />
        </>
    );
}
