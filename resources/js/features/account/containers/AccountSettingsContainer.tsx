import { usePage } from '@inertiajs/react';
import { AccountProfileSection } from '../components/AccountProfileSection';
import { AccountSecuritySection } from '../components/AccountSecuritySection';
import type { AccountSettings } from '../types';

type AccountSettingsContainerProps = {
    account: AccountSettings;
};

export const AccountSettingsContainer = ({
    account,
}: AccountSettingsContainerProps) => {
    const { flash } = usePage().props;

    return (
        <main className="mx-auto w-full max-w-3xl space-y-6 px-4 py-8">
            <header className="space-y-1">
                <h1 className="text-2xl font-semibold text-foreground">
                    Configuración
                </h1>
                <p className="text-sm text-muted-foreground">
                    Administra los datos de tu cuenta y la seguridad de acceso.
                </p>
            </header>

            {flash.status ? (
                <p className="rounded-lg border border-primary/20 bg-accent px-3 py-2 text-sm text-accent-foreground">
                    {flash.status}
                </p>
            ) : null}

            <div className="space-y-6">
                <AccountProfileSection account={account} />
                <AccountSecuritySection />
            </div>
        </main>
    );
};
