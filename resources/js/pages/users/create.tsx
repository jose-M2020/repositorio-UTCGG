import { Head } from '@inertiajs/react';
import { UserCreateContainer } from '@/features/users';

type UsersCreatePageProps = {
    roles: string[];
};

const UsersCreatePage = ({ roles }: UsersCreatePageProps) => {
    return (
        <>
            <Head title="Nuevo usuario" />
            <UserCreateContainer roles={roles} />
        </>
    );
};

export default UsersCreatePage;
