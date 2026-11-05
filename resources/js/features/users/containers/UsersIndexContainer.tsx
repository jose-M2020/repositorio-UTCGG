import { Link, usePage } from '@inertiajs/react';
import { create } from '@/actions/App/Http/Controllers/UserController';
import { Button } from '@/shared/components/ui';
import { UsersFilters } from '../components/UsersFilters';
import { UsersTable } from '../components/UsersTable';
import type { PaginatedUsers, UsersFilters as UsersFiltersType } from '../types';

type UsersIndexContainerProps = {
    users: PaginatedUsers;
    filters: UsersFiltersType;
    roles: string[];
};

export const UsersIndexContainer = ({
    users,
    filters,
    roles,
}: UsersIndexContainerProps) => {
    const { flash } = usePage().props;

    return (
        <main className="mx-auto w-full max-w-6xl space-y-6 px-4 py-8">
            <header className="flex flex-wrap items-center justify-between gap-3">
                <div>
                    <h1 className="text-2xl font-semibold text-slate-900 dark:text-slate-100">
                        Usuarios
                    </h1>
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                        Administra cuentas, roles y datos básicos.
                    </p>
                </div>
                <Link href={create.url()}>
                    <Button type="button">Nuevo usuario</Button>
                </Link>
            </header>

            {flash.status ? (
                <p className="rounded-lg border border-emerald-200 bg-emerald-50 px-3 py-2 text-sm text-emerald-800 dark:border-emerald-900 dark:bg-emerald-950 dark:text-emerald-200">
                    {flash.status}
                </p>
            ) : null}

            <UsersFilters filters={filters} roles={roles} />
            <UsersTable users={users} />
        </main>
    );
};
