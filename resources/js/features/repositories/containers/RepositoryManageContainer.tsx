import { Form, Link, usePage } from '@inertiajs/react';
import {
    destroy as destroyRepo,
    edit,
} from '@/actions/App/Http/Controllers/RepositorioController';
import {
    destroy as destroyMember,
    store as storeMember,
} from '@/actions/App/Http/Controllers/RepositorioUsuarioController';
import { Button, Input } from '@/shared/components/ui';
import { RepositoryDetails } from '../components/RepositoryDetails';
import type { Repository } from '../types';

type RepositoryManageContainerProps = {
    repositorio: Repository;
};

export const RepositoryManageContainer = ({
    repositorio,
}: RepositoryManageContainerProps) => {
    const { flash } = usePage().props;

    return (
        <main className="mx-auto w-full max-w-4xl space-y-6 px-4 py-8">
            <header className="flex flex-wrap items-center justify-between gap-3">
                <h1 className="text-2xl font-semibold">Gestionar repositorio</h1>
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
                <p className="rounded-lg border border-emerald-200 bg-emerald-50 px-3 py-2 text-sm text-emerald-800">
                    {flash.status}
                </p>
            ) : null}

            <section className="rounded-xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900">
                <RepositoryDetails repositorio={repositorio} />
            </section>

            <section className="space-y-4 rounded-xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900">
                <h2 className="text-lg font-semibold">Agregar miembro</h2>
                <Form
                    {...storeMember.form(repositorio.slug)}
                    className="flex flex-wrap items-end gap-3"
                >
                    {({ errors, processing }) => (
                        <>
                            <div className="min-w-56 flex-1 space-y-1">
                                <label
                                    htmlFor="user_ids"
                                    className="text-sm font-medium"
                                >
                                    ID de usuario
                                </label>
                                <Input
                                    id="user_ids"
                                    name="user_ids[]"
                                    type="number"
                                    required
                                    min={1}
                                />
                                {errors.user_ids ? (
                                    <p className="text-sm text-red-600">
                                        {errors.user_ids}
                                    </p>
                                ) : null}
                            </div>
                            <Button type="submit" disabled={processing}>
                                Agregar
                            </Button>
                        </>
                    )}
                </Form>

                <ul className="divide-y divide-slate-200 dark:divide-slate-800">
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
