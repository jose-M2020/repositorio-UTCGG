import { Form, Link } from '@inertiajs/react';
import {
    showByUser,
    update,
} from '@/actions/App/Http/Controllers/RepositorioController';
import { Button } from '@/shared/components/ui';
import { RepositoryFormFields } from '../components/RepositoryFormFields';
import type { Repository } from '../types';

type RepositoryEditContainerProps = {
    repositorio: Repository;
};

export const RepositoryEditContainer = ({
    repositorio,
}: RepositoryEditContainerProps) => {
    return (
        <main className="mx-auto w-full max-w-3xl space-y-6 px-4 py-8">
            <header>
                <h1 className="text-2xl font-semibold">Editar repositorio</h1>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                    {repositorio.nombre_rep}
                </p>
            </header>

            <Form
                {...update.form(repositorio.slug)}
                className="space-y-6 rounded-xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900"
            >
                {({ errors, processing }) => (
                    <>
                        <RepositoryFormFields
                            errors={errors}
                            defaults={repositorio}
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
