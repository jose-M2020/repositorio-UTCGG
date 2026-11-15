import { Form, Link } from '@inertiajs/react';
import {
    showByUser,
    update,
} from '@/actions/App/Http/Controllers/RepositoryController';
import { Button } from '@/shared/components/ui';
import type { RepositoryCatalog } from '@/shared/data/catalog';
import { RepositoryFormFields } from '../../shared/components/RepositoryFormFields';
import type { Repository } from '../../shared/types';

type RepositoryEditContainerProps = {
    repository: Repository;
    catalog: RepositoryCatalog;
};

export const RepositoryEditContainer = ({
    repository,
    catalog,
}: RepositoryEditContainerProps) => {
    return (
        <main className="page-container space-y-6 py-8">
            <header>
                <h1 className="text-2xl font-semibold text-primary">
                    Editar repositorio
                </h1>
                <p className="text-sm text-muted-foreground">
                    {repository.title}
                </p>
            </header>

            <Form
                {...update.form(repository.slug)}
                className="space-y-6 rounded-xl border border-border bg-card p-6"
            >
                {({ errors, processing }) => (
                    <>
                        <RepositoryFormFields
                            errors={errors}
                            defaults={repository}
                            catalog={catalog}
                        />
                        <div className="flex justify-end gap-2">
                            <Link href={showByUser.url(repository.slug)}>
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
