import { Head } from '@inertiajs/react';
import { SetPasswordContainer } from '@/features/auth/containers/SetPasswordContainer';

type SetPasswordPageProps = {
    token: string;
    email: string;
    purpose: string;
};

const SetPasswordPage = ({ token, email, purpose }: SetPasswordPageProps) => {
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
            />
        </>
    );
};

export default SetPasswordPage;
