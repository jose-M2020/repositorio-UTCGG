import { Form, Link } from '@inertiajs/react';
import {
    index,
    store,
} from '@/actions/App/Http/Controllers/CatalogController';
import { Button } from '@/shared/components/ui';
import { CatalogFormFields } from '../components/CatalogFormFields';
import type { CatalogTypesMap } from '../types';

type CatalogCreateContainerProps = {
    catalogTypes: CatalogTypesMap;
};

export const CatalogCreateContainer = ({
    catalogTypes,
}: CatalogCreateContainerProps) => {
    return (
        <main className="mx-auto w-full max-w-3xl space-y-6 px-4 py-8">
            <header className="space-y-1">
                <h1 className="text-2xl font-semibold text-foreground">
                    Nuevo catalogo
                </h1>
                <p className="text-sm text-muted-foreground">
                    Crea un elemento para el catalogo del sistema.
                </p>
            </header>

            <Form
                {...store.form()}
                className="space-y-6 rounded-xl border border-border bg-card p-6 text-card-foreground shadow-sm"
            >
                {({ errors, processing }) => (
                    <>
                        <CatalogFormFields
                            errors={errors}
                            catalogTypes={catalogTypes}
                        />
                        <div className="flex justify-end gap-2">
                            <Link href={index.url()}>
                                <Button type="button" variant="outline">
                                    Cancelar
                                </Button>
                            </Link>
                            <Button type="submit" disabled={processing}>
                                {processing ? 'Guardando...' : 'Guardar'}
                            </Button>
                        </div>
                    </>
                )}
            </Form>
        </main>
    );
};
