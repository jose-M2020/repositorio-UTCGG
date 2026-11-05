import { Link } from '@inertiajs/react';
import {
    edit,
    index,
} from '@/actions/App/Http/Controllers/UserController';
import { Button } from '@/shared/components/ui';
import { UserDetails } from '../components/UserDetails';
import type { UserDetails as UserDetailsType } from '../types';

type UserShowContainerProps = {
    user: UserDetailsType;
};

export const UserShowContainer = ({ user }: UserShowContainerProps) => {
    return (
        <main className="mx-auto w-full max-w-2xl space-y-6 px-4 py-8">
            <header className="flex flex-wrap items-center justify-between gap-3">
                <div>
                    <h1 className="text-2xl font-semibold text-slate-900 dark:text-slate-100">
                        Detalle de usuario
                    </h1>
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                        Información registrada de la cuenta.
                    </p>
                </div>
                <div className="flex gap-2">
                    <Link href={index.url()}>
                        <Button type="button" variant="outline">
                            Volver
                        </Button>
                    </Link>
                    <Link href={edit.url(user.id)}>
                        <Button type="button">Editar</Button>
                    </Link>
                </div>
            </header>

            <section className="rounded-xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900">
                <UserDetails user={user} />
            </section>
        </main>
    );
};
