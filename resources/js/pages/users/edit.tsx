import { Head } from '@inertiajs/react';
import { UserEditContainer, type UserFormValues } from '@/features/users';

type UsersEditPageProps = {
    user: UserFormValues;
    roles: string[];
};

const UsersEditPage = ({ user, roles }: UsersEditPageProps) => {
    return (
        <>
            <Head title="Editar usuario" />
            <UserEditContainer user={user} roles={roles} />
        </>
    );
};

export default UsersEditPage;
