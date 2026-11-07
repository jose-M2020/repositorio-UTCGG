import { Head } from '@inertiajs/react';
import {
    UserEditContainer,
    type CareerFormPolicy,
    type RoleOption,
    type UserFormValues,
} from '@/features/users';

type UsersEditPageProps = {
    user: UserFormValues;
    roles: RoleOption[];
    careers: Record<string, string>;
    careerPolicy: CareerFormPolicy;
};

const UsersEditPage = ({
    user,
    roles,
    careers,
    careerPolicy,
}: UsersEditPageProps) => {
    return (
        <>
            <Head title="Editar usuario" />
            <UserEditContainer
                user={user}
                roles={roles}
                careers={careers}
                careerPolicy={careerPolicy}
            />
        </>
    );
};

export default UsersEditPage;
