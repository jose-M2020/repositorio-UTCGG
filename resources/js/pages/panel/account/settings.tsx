import { Head } from '@inertiajs/react';
import {
    AccountSettingsContainer,
    type AccountSettings,
} from '@/features/account';

type AccountSettingsPageProps = {
    account: AccountSettings;
};

const AccountSettingsPage = ({ account }: AccountSettingsPageProps) => {
    return (
        <>
            <Head title="Configuración" />
            <AccountSettingsContainer account={account} />
        </>
    );
};

export default AccountSettingsPage;
