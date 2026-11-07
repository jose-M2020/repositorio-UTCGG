import { Head } from '@inertiajs/react';
import { UserEditContainer, type UserFormValues } from '@/features/users';

type UsersEditPageProps = {
    user: UserFormValues;
    roles: string[];
    careers: Record<string, string>;
};

const UsersEditPage = ({ user, roles, careers }: UsersEditPageProps) => {
    return (
        <>
            <Head title="Editar usuario" />
            <UserEditContainer user={user} roles={roles} careers={careers} />
        </>
    );
};

export default UsersEditPage;
