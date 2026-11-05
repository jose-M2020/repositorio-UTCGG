import { Head } from '@inertiajs/react';
import {
    UserShowContainer,
    type UserDetails,
} from '@/features/users';

type UsersShowPageProps = {
    user: UserDetails;
};

export default function UsersShowPage({ user }: UsersShowPageProps) {
    return (
        <>
            <Head title="Detalle de usuario" />
            <UserShowContainer user={user} />
        </>
    );
}
