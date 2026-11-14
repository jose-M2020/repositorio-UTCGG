import { Head } from '@inertiajs/react';
import {
    UsersIndexContainer,
    type CareerFormPolicy,
    type PaginatedUsers,
    type RoleOption,
    type RolePermissionPreview,
    type UsersFilters,
} from '@/features/users';

type UsersIndexPageProps = {
    users: PaginatedUsers;
    filters: UsersFilters;
    roles: RoleOption[];
    assignableRoles: RoleOption[];
    rolePermissions: Record<string, RolePermissionPreview[]>;
    careers: Record<string, string>;
    careerPolicy: CareerFormPolicy;
};

const UsersIndexPage = ({
    users,
    filters,
    roles,
    assignableRoles,
    rolePermissions,
    careers,
    careerPolicy,
}: UsersIndexPageProps) => {
    return (
        <>
            <Head title="Usuarios" />
            <UsersIndexContainer
                users={users}
                filters={filters}
                roles={roles}
                assignableRoles={assignableRoles}
                rolePermissions={rolePermissions}
                careers={careers}
                careerPolicy={careerPolicy}
            />
        </>
    );
};

export default UsersIndexPage;
