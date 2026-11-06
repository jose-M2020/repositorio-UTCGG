import { Form, Link } from '@inertiajs/react';
import {
    index,
    store,
} from '@/actions/App/Http/Controllers/RepositorioController';
import { Button } from '@/shared/components/ui';
import { RepositoryFormFields } from '../components/RepositoryFormFields';

export const RepositoryCreateContainer = () => {
    return (
        <main className="mx-auto w-full max-w-3xl space-y-6 px-4 py-8">
            <header>
                <h1 className="text-2xl font-semibold">Nuevo repositorio</h1>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                    Quedarás como miembro automáticamente.
                </p>
            </header>

            <Form
                {...store.form()}
                className="space-y-6 rounded-xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900"
            >
                {({ errors, processing }) => (
                    <>
                        <RepositoryFormFields errors={errors} />
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
