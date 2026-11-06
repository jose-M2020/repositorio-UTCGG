import { Form, Link, usePage } from '@inertiajs/react';
import { useState } from 'react';
import {
    index,
    store,
} from '@/actions/App/Http/Controllers/RepositorioController';
import {
    UserSearchPicker,
    type SearchableUser,
} from '@/shared/components';
import { Button } from '@/shared/components/ui';
import type { RepositoryCatalog } from '@/shared/data/catalog';
import { RepositoryFormFields } from '../components/RepositoryFormFields';

type RepositoryCreateContainerProps = {
    catalog?: RepositoryCatalog;
};

export const RepositoryCreateContainer = ({
    catalog,
}: RepositoryCreateContainerProps) => {
    const { auth } = usePage().props;
    const currentUser = auth.user;

    const [collaborators, setCollaborators] = useState<SearchableUser[]>(
        currentUser
            ? [
                  {
                      id: currentUser.id,
                      nombre: currentUser.nombre,
                      apellido: currentUser.apellido,
                      email: currentUser.email,
                  },
              ]
            : [],
    );

    return (
        <main className="mx-auto w-full max-w-3xl space-y-6 px-4 py-8">
            <header>
                <h1 className="text-2xl font-semibold text-primary">
                    Nuevo repositorio
                </h1>
                <p className="text-sm text-muted-foreground">
                    Agrega colaboradores por correo (máximo 8).
                </p>
            </header>

            <Form
                {...store.form()}
                className="space-y-6 rounded-xl border border-border bg-card p-6"
            >
                {({ errors, processing }) => (
                    <>
                        <RepositoryFormFields
                            errors={errors}
                            catalog={catalog}
                        />
                        <UserSearchPicker
                            mode="email"
                            selected={collaborators}
                            onChange={setCollaborators}
                            max={8}
                            label="Colaboradores"
                        />
                        {errors.usuario ? (
                            <p className="text-sm text-destructive">
                                {errors.usuario}
                            </p>
                        ) : null}
                        <div className="flex justify-end gap-2">
                            <Link href={index.url()}>
                                <Button type="button" variant="outline">
                                    Cancelar
                                </Button>
                            </Link>
                            <Button type="submit" disabled={processing}>
                                {processing ? 'Guardando...' : 'Crear'}
                            </Button>
                        </div>
                    </>
                )}
            </Form>
        </main>
    );
};
