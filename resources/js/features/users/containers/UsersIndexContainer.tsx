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
    careers: Record<string, string>;
};

export const UsersIndexContainer = ({
    users,
    filters,
    roles,
    careers,
}: UsersIndexContainerProps) => {
    const { flash } = usePage().props;

    return (
        <main className="mx-auto w-full max-w-6xl space-y-6 px-4 py-8">
            <header className="flex flex-wrap items-center justify-between gap-3">
                <div>
                    <h1 className="text-2xl font-semibold text-primary">
                        Usuarios
                    </h1>
                    <p className="text-sm text-muted-foreground">
                        Alumnos totales: <b>{users.total}</b>
                    </p>
                </div>
                <Link href={create.url()}>
                    <Button type="button">Nuevo</Button>
                </Link>
            </header>

            {flash.status ? (
                <p className="rounded-lg border border-primary/20 bg-accent px-3 py-2 text-sm text-accent-foreground">
                    {flash.status}
                </p>
            ) : null}

            <UsersFilters
                filters={filters}
                roles={roles}
                careersOptions={careers}
            />
            <UsersTable users={users} />
        </main>
    );
};
