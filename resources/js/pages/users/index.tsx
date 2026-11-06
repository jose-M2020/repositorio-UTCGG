import { Head } from '@inertiajs/react';
import {
    UsersIndexContainer,
    type PaginatedUsers,
    type UsersFilters,
} from '@/features/users';

type UsersIndexPageProps = {
    users: PaginatedUsers;
    filters: UsersFilters;
    roles: string[];
    careers?: Record<string, string>;
};

export default function UsersIndexPage({
    users,
    filters,
    roles,
    careers,
}: UsersIndexPageProps) {
    return (
        <>
            <Head title="Usuarios" />
            <UsersIndexContainer
                users={users}
                filters={filters}
                roles={roles}
                careers={careers}
            />
        </>
    );
}
