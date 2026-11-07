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
    careers: Record<string, string>;
    careerPolicy: CareerFormPolicy;
};

const UsersIndexPage = ({
    users,
    filters,
    roles,
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
                careers={careers}
                careerPolicy={careerPolicy}
            />
        </>
    );
};

export default UsersIndexPage;
