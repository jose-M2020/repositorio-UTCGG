import { Link } from '@inertiajs/react';
import {
    edit,
    index,
} from '@/actions/App/Http/Controllers/RoleController';
import { Button } from '@/shared/components/ui';
import { RoleDetails } from '../components/RoleDetails';
import type { RoleDetails as RoleDetailsType } from '../types';

type RoleShowContainerProps = {
    role: RoleDetailsType;
};

export const RoleShowContainer = ({ role }: RoleShowContainerProps) => {
    return (
        <main className="mx-auto w-full max-w-2xl space-y-6 px-4 py-8">
            <header className="flex flex-wrap items-center justify-between gap-3">
                <div>
                    <h1 className="text-2xl font-semibold text-slate-900 dark:text-slate-100">
                        Detalle de rol
                    </h1>
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                        Permisos asociados al rol.
                    </p>
                </div>
                <div className="flex gap-2">
                    <Link href={index.url()}>
                        <Button type="button" variant="outline">
                            Volver
                        </Button>
                    </Link>
                    <Link href={edit.url(role.id)}>
                        <Button type="button">Editar</Button>
                    </Link>
                </div>
            </header>

            <section className="rounded-xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900">
                <RoleDetails role={role} />
            </section>
        </main>
    );
};
