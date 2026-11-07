import { Head } from '@inertiajs/react';
import {
    UserCreateContainer,
    type CareerFormPolicy,
    type RoleOption,
} from '@/features/users';

type UsersCreatePageProps = {
    roles: RoleOption[];
    careers: Record<string, string>;
    careerPolicy: CareerFormPolicy;
};

const UsersCreatePage = ({
    roles,
    careers,
    careerPolicy,
}: UsersCreatePageProps) => {
    return (
        <>
            <Head title="Nuevo usuario" />
            <UserCreateContainer
                roles={roles}
                careers={careers}
                careerPolicy={careerPolicy}
            />
        </>
    );
};

export default UsersCreatePage;
