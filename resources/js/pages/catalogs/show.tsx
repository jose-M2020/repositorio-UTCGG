import { Head } from '@inertiajs/react';
import {
    CatalogShowContainer,
    type CatalogItem,
    type CatalogTypesMap,
} from '@/features/catalogs';

type CatalogsShowPageProps = {
    catalog: CatalogItem;
    catalogTypes: CatalogTypesMap;
};

const CatalogsShowPage = ({ catalog, catalogTypes }: CatalogsShowPageProps) => {
    return (
        <>
            <Head title="Detalle catalogo" />
            <CatalogShowContainer catalog={catalog} catalogTypes={catalogTypes} />
        </>
    );
};

export default CatalogsShowPage;
