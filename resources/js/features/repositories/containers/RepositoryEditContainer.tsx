import { Form, Link } from '@inertiajs/react';
import {
    showByUser,
    update,
} from '@/actions/App/Http/Controllers/RepositorioController';
import { Button } from '@/shared/components/ui';
import type { RepositoryCatalog } from '@/shared/data/catalog';
import { RepositoryFormFields } from '../components/RepositoryFormFields';
import type { Repository } from '../types';

type RepositoryEditContainerProps = {
    repositorio: Repository;
    catalog: RepositoryCatalog;
};

export const RepositoryEditContainer = ({
    repositorio,
    catalog,
}: RepositoryEditContainerProps) => {
    return (
        <main className="mx-auto w-full max-w-3xl space-y-6 px-4 py-8">
            <header>
                <h1 className="text-2xl font-semibold text-primary">
                    Editar repositorio
                </h1>
                <p className="text-sm text-muted-foreground">
                    {repositorio.nombre_rep}
                </p>
            </header>

            <Form
                {...update.form(repositorio.slug)}
                className="space-y-6 rounded-xl border border-border bg-card p-6"
            >
                {({ errors, processing }) => (
                    <>
                        <RepositoryFormFields
                            errors={errors}
                            defaults={repositorio}
                            catalog={catalog}
                        />
                        <div className="flex justify-end gap-2">
                            <Link href={showByUser.url(repositorio.slug)}>
                                <Button type="button" variant="outline">
                                    Cancelar
                                </Button>
                            </Link>
                            <Button type="submit" disabled={processing}>
                                {processing ? 'Guardando...' : 'Actualizar'}
                            </Button>
                        </div>
                    </>
                )}
            </Form>
        </main>
    );
};
