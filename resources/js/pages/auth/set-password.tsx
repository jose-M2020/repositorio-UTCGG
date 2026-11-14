import { Head } from '@inertiajs/react';
import { SetPasswordContainer } from '@/features/auth/containers/SetPasswordContainer';
import type { SetPasswordLinkStatus } from '@/features/auth/types';

type SetPasswordPageProps = {
    token: string;
    email: string;
    purpose: string;
    linkStatus?: SetPasswordLinkStatus;
};

const SetPasswordPage = ({
    token,
    email,
    purpose,
    linkStatus,
}: SetPasswordPageProps) => {
    return (
        <>
            <Head
                title={
                    purpose === 'activation'
                        ? 'Activar cuenta'
                        : 'Restablecer contraseña'
                }
            />
            <SetPasswordContainer
                token={token}
                email={email}
                purpose={purpose}
                linkStatus={linkStatus}
            />
        </>
    );
};

export default SetPasswordPage;
