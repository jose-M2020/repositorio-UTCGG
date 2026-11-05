import { Head } from '@inertiajs/react';
import {
    RoleShowContainer,
    type RoleDetails,
} from '@/features/roles';

type RolesShowPageProps = {
    role: RoleDetails;
};

export default function RolesShowPage({ role }: RolesShowPageProps) {
    return (
        <>
            <Head title="Detalle de rol" />
            <RoleShowContainer role={role} />
        </>
    );
}
