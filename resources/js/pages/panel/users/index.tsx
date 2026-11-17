import { Head } from '@inertiajs/react';
import {
    UsersIndexContainer,
    type CareerFormPolicy,
    type CareerOption,
    type PaginatedUsers,
    type RoleOption,
    type RolePermissionPreview,
    type UsersFilters,
    type UserTypeOption,
} from '@/features/users';

type UsersIndexPageProps = {
    users: PaginatedUsers;
    filters: UsersFilters;
    roles: RoleOption[];
    assignableRoles: RoleOption[];
    rolePermissions: Record<string, RolePermissionPreview[]>;
    careers: Record<string, string>;
    careerOptions: CareerOption[];
    careerPolicy: CareerFormPolicy;
    userTypes?: UserTypeOption[];
};

const UsersIndexPage = ({
    users,
    filters,
    roles,
    assignableRoles,
    rolePermissions,
    careers,
    careerOptions,
    careerPolicy,
    userTypes = [],
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
                careerOptions={careerOptions}
                careerPolicy={careerPolicy}
                userTypes={userTypes}
            />
        </>
    );
};

export default UsersIndexPage;
