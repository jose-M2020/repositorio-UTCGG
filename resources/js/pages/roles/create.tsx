import { Head } from '@inertiajs/react';
import { RoleCreateContainer, type PermissionGroups } from '@/features/roles';

type RolesCreatePageProps = {
    permissionGroups: PermissionGroups;
};

const RolesCreatePage = ({ permissionGroups }: RolesCreatePageProps) => {
    return (
        <>
            <Head title="Nuevo rol" />
            <RoleCreateContainer permissionGroups={permissionGroups} />
        </>
    );
};

export default RolesCreatePage;
