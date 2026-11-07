import { Link } from '@inertiajs/react';
import {
    edit,
    index,
} from '@/actions/App/Http/Controllers/CatalogController';
import { Button } from '@/shared/components/ui';
import { CatalogDetails } from '../components/CatalogDetails';
import type { CatalogItem, CatalogTypesMap } from '../types';

type CatalogShowContainerProps = {
    catalog: CatalogItem;
    catalogTypes: CatalogTypesMap;
};

export const CatalogShowContainer = ({
    catalog,
    catalogTypes,
}: CatalogShowContainerProps) => {
    return (
        <main className="mx-auto w-full max-w-3xl space-y-6 px-4 py-8">
            <header className="space-y-1">
                <h1 className="text-2xl font-semibold text-foreground">
                    Detalle de catalogo
                </h1>
                <p className="text-sm text-muted-foreground">
                    {catalog.code} — {catalog.name}
                </p>
            </header>

            <CatalogDetails catalog={catalog} catalogTypes={catalogTypes} />

            <div className="flex justify-end gap-2">
                <Link href={index.url()}>
                    <Button type="button" variant="outline">
                        Volver
                    </Button>
                </Link>
                <Link href={edit.url(catalog.id)}>
                    <Button type="button">Editar</Button>
                </Link>
            </div>
        </main>
    );
};
