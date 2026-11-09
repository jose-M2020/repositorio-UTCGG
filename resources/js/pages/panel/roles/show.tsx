import { Head } from '@inertiajs/react';
import { RoleShowContainer, type RoleDetails } from '@/features/roles';

type RolesShowPageProps = {
    role: RoleDetails;
};

const RolesShowPage = ({ role }: RolesShowPageProps) => {
    return (
        <>
            <Head title="Detalle de rol" />
            <RoleShowContainer role={role} />
        </>
    );
};

export default RolesShowPage;
