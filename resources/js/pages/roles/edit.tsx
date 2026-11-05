import { Head } from '@inertiajs/react';
import {
    RoleEditContainer,
    type PermissionGroups,
    type RoleFormValues,
} from '@/features/roles';

type RolesEditPageProps = {
    role: RoleFormValues;
    permissionGroups: PermissionGroups;
};

export default function RolesEditPage({
    role,
    permissionGroups,
}: RolesEditPageProps) {
    return (
        <>
            <Head title="Editar rol" />
            <RoleEditContainer
                role={role}
                permissionGroups={permissionGroups}
            />
        </>
    );
}
