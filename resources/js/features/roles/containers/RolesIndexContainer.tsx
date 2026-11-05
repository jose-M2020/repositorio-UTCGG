import { Link, usePage } from '@inertiajs/react';
import { create } from '@/actions/App/Http/Controllers/RoleController';
import { Button } from '@/shared/components/ui';
import { RolesTable } from '../components/RolesTable';
import type { PaginatedRoles } from '../types';

type RolesIndexContainerProps = {
    roles: PaginatedRoles;
};

export const RolesIndexContainer = ({ roles }: RolesIndexContainerProps) => {
    const { flash } = usePage().props;

    return (
        <main className="mx-auto w-full max-w-5xl space-y-6 px-4 py-8">
            <header className="flex flex-wrap items-center justify-between gap-3">
                <div>
                    <h1 className="text-2xl font-semibold text-slate-900 dark:text-slate-100">
                        Roles
                    </h1>
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                        Define roles y asigna permisos Spatie.
                    </p>
                </div>
                <Link href={create.url()}>
                    <Button type="button">Nuevo rol</Button>
                </Link>
            </header>

            {flash.status ? (
                <p className="rounded-lg border border-emerald-200 bg-emerald-50 px-3 py-2 text-sm text-emerald-800 dark:border-emerald-900 dark:bg-emerald-950 dark:text-emerald-200">
                    {flash.status}
                </p>
            ) : null}

            <RolesTable roles={roles} />
        </main>
    );
};
