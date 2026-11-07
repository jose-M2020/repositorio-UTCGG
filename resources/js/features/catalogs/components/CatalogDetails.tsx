import type { CatalogItem, CatalogTypesMap } from '../types';

type CatalogDetailsProps = {
    catalog: CatalogItem;
    catalogTypes: CatalogTypesMap;
};

export const CatalogDetails = ({ catalog, catalogTypes }: CatalogDetailsProps) => {
    return (
        <dl className="grid gap-4 rounded-xl border border-border bg-card p-6 sm:grid-cols-2">
            <div>
                <dt className="text-sm text-muted-foreground">Tipo</dt>
                <dd className="font-medium">{catalogTypes[catalog.type]}</dd>
            </div>
            <div>
                <dt className="text-sm text-muted-foreground">Codigo</dt>
                <dd className="font-medium">{catalog.code}</dd>
            </div>
            <div>
                <dt className="text-sm text-muted-foreground">Nombre</dt>
                <dd className="font-medium">{catalog.name}</dd>
            </div>
            <div>
                <dt className="text-sm text-muted-foreground">Orden</dt>
                <dd className="font-medium">{catalog.sort_order}</dd>
            </div>
            <div>
                <dt className="text-sm text-muted-foreground">Estado</dt>
                <dd className="font-medium">
                    {catalog.is_active ? 'Activo' : 'Inactivo'}
                </dd>
            </div>
            {catalog.type === 'career' ? (
                <>
                    <div>
                        <dt className="text-sm text-muted-foreground">
                            Imagen home
                        </dt>
                        <dd className="font-medium">{catalog.meta.image || '—'}</dd>
                    </div>
                    <div>
                        <dt className="text-sm text-muted-foreground">
                            Mostrar en home
                        </dt>
                        <dd className="font-medium">
                            {catalog.meta.show_on_home ? 'Si' : 'No'}
                        </dd>
                    </div>
                </>
            ) : null}
        </dl>
    );
};
