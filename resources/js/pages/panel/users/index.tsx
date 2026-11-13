import { Head } from '@inertiajs/react';
import {
    UsersIndexContainer,
    type CareerFormPolicy,
    type PaginatedUsers,
    type RoleOption,
    type UsersFilters,
} from '@/features/users';

type UsersIndexPageProps = {
    users: PaginatedUsers;
    filters: UsersFilters;
    roles: RoleOption[];
    assignableRoles: RoleOption[];
    careers: Record<string, string>;
    careerPolicy: CareerFormPolicy;
};

const UsersIndexPage = ({
    users,
    filters,
    roles,
    assignableRoles,
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
                careers={careers}
                careerPolicy={careerPolicy}
            />
        </>
    );
};

export default UsersIndexPage;
