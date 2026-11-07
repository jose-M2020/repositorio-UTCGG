import { Head } from '@inertiajs/react';
import { UserCreateContainer } from '@/features/users';

type UsersCreatePageProps = {
    roles: string[];
    careers: Record<string, string>;
};

const UsersCreatePage = ({ roles, careers }: UsersCreatePageProps) => {
    return (
        <>
            <Head title="Nuevo usuario" />
            <UserCreateContainer roles={roles} careers={careers} />
        </>
    );
};

export default UsersCreatePage;
