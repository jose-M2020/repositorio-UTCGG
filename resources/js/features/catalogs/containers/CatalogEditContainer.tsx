import { Form, Link } from '@inertiajs/react';
import {
    index,
    update,
} from '@/actions/App/Http/Controllers/CatalogController';
import { Button } from '@/shared/components/ui';
import { CatalogFormFields } from '../components/CatalogFormFields';
import type { CatalogFormValues, CatalogTypesMap } from '../types';

type CatalogEditContainerProps = {
    catalog: CatalogFormValues;
    catalogTypes: CatalogTypesMap;
};

export const CatalogEditContainer = ({
    catalog,
    catalogTypes,
}: CatalogEditContainerProps) => {
    return (
        <main className="mx-auto w-full max-w-3xl space-y-6 px-4 py-8">
            <header className="space-y-1">
                <h1 className="text-2xl font-semibold text-foreground">
                    Editar catalogo
                </h1>
                <p className="text-sm text-muted-foreground">
                    Actualiza la configuracion de {catalog.code}.
                </p>
            </header>

            <Form
                {...update.form(catalog.id!)}
                className="space-y-6 rounded-xl border border-border bg-card p-6 text-card-foreground shadow-sm"
            >
                {({ errors, processing }) => (
                    <>
                        <CatalogFormFields
                            errors={errors}
                            catalogTypes={catalogTypes}
                            defaults={catalog}
                        />
                        <div className="flex justify-end gap-2">
                            <Link href={index.url()}>
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
