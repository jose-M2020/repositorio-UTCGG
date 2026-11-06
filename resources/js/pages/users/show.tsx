import { Head } from '@inertiajs/react';
import {
    UserShowContainer,
    type UserDetails,
    type UserRepositorySummary,
} from '@/features/users';

type UsersShowPageProps = {
    user: UserDetails;
    repositoriosPublicos: UserRepositorySummary[];
    repositoriosPrivados: UserRepositorySummary[];
};

export default function UsersShowPage({
    user,
    repositoriosPublicos,
    repositoriosPrivados,
}: UsersShowPageProps) {
    return (
        <>
            <Head title="Detalle de usuario" />
            <UserShowContainer
                user={user}
                repositoriosPublicos={repositoriosPublicos}
                repositoriosPrivados={repositoriosPrivados}
            />
        </>
    );
}
