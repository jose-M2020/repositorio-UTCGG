import { Head } from '@inertiajs/react';
import {
    UserShowContainer,
    type UserDetails,
    type UserRepositorySummary,
} from '@/features/users';

type UsersShowPageProps = {
    user: UserDetails;
    publicRepositories: UserRepositorySummary[];
    privateRepositories: UserRepositorySummary[];
};

const UsersShowPage = ({
    user,
    publicRepositories,
    privateRepositories,
}: UsersShowPageProps) => {
    return (
        <>
            <Head title="Detalle de usuario" />
            <UserShowContainer
                user={user}
                publicRepositories={publicRepositories}
                privateRepositories={privateRepositories}
            />
        </>
    );
};

export default UsersShowPage;
