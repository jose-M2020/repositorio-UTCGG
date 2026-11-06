import { Form, Link, usePage } from '@inertiajs/react';
import { useState } from 'react';
import {
    destroy as destroyRepo,
    edit,
} from '@/actions/App/Http/Controllers/RepositorioController';
import {
    destroy as destroyMember,
    store as storeMember,
} from '@/actions/App/Http/Controllers/RepositorioUsuarioController';
import {
    UserSearchPicker,
    type SearchableUser,
} from '@/shared/components';
import { Button } from '@/shared/components/ui';
import { RepositoryDetails } from '../components/RepositoryDetails';
import type { Repository } from '../types';

type RepositoryManageContainerProps = {
    repositorio: Repository;
};

export const RepositoryManageContainer = ({
    repositorio,
}: RepositoryManageContainerProps) => {
    const { flash } = usePage().props;
    const [selected, setSelected] = useState<SearchableUser[]>([]);

    return (
        <main className="mx-auto w-full max-w-4xl space-y-6 px-4 py-8">
            <header className="flex flex-wrap items-center justify-between gap-3">
                <h1 className="text-2xl font-semibold text-primary">
                    Gestionar repositorio
                </h1>
                <div className="flex gap-2">
                    <Link href={edit.url(repositorio.slug)}>
                        <Button type="button" variant="outline">
                            Editar
                        </Button>
                    </Link>
                    <Form {...destroyRepo.form(repositorio.slug)}>
                        {({ processing }) => (
                            <Button
                                type="submit"
                                variant="destructive"
                                disabled={processing}
                            >
                                Eliminar
                            </Button>
                        )}
                    </Form>
                </div>
            </header>

            {flash.status ? (
                <p className="rounded-lg border border-primary/20 bg-accent px-3 py-2 text-sm text-accent-foreground">
                    {flash.status}
                </p>
            ) : null}

            <section className="rounded-xl border border-border bg-card p-6">
                <RepositoryDetails repositorio={repositorio} />
            </section>

            <section className="space-y-4 rounded-xl border border-border bg-card p-6">
                <h2 className="text-lg font-semibold text-secondary">
                    Agregar miembro
                </h2>
                <Form {...storeMember.form(repositorio.slug)} className="space-y-4">
                    {({ errors, processing }) => (
                        <>
                            <UserSearchPicker
                                mode="id"
                                selected={selected}
                                onChange={setSelected}
                                max={8}
                                label="Buscar por nombre o correo"
                            />
                            {errors.user_ids ? (
                                <p className="text-sm text-destructive">
                                    {errors.user_ids}
                                </p>
                            ) : null}
                            <Button
                                type="submit"
                                disabled={processing || selected.length === 0}
                            >
                                Agregar
                            </Button>
                        </>
                    )}
                </Form>

                <ul className="divide-y divide-border">
                    {repositorio.users.map((user) => (
                        <li
                            key={user.id}
                            className="flex items-center justify-between gap-3 py-3 text-sm"
                        >
                            <span>
                                {user.nombre} {user.apellido} ({user.email})
                            </span>
                            <Form
                                {...destroyMember.form([
                                    repositorio.slug,
                                    user.id,
                                ])}
                            >
                                {({ processing }) => (
                                    <Button
                                        type="submit"
                                        variant="destructive"
                                        size="sm"
                                        disabled={processing}
                                    >
                                        Quitar
                                    </Button>
                                )}
                            </Form>
                        </li>
                    ))}
                </ul>
            </section>
        </main>
    );
};
