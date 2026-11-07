import { Head } from '@inertiajs/react';
import { RolesIndexContainer, type PaginatedRoles } from '@/features/roles';

type RolesIndexPageProps = {
    roles: PaginatedRoles;
};

const RolesIndexPage = ({ roles }: RolesIndexPageProps) => {
    return (
        <>
            <Head title="Roles" />
            <RolesIndexContainer roles={roles} />
        </>
    );
};

export default RolesIndexPage;
