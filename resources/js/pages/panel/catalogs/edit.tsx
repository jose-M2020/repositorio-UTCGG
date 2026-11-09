import { Head } from '@inertiajs/react';
import {
    CatalogEditContainer,
    type CatalogFormValues,
    type CatalogTypesMap,
} from '@/features/catalogs';

type CatalogsEditPageProps = {
    catalog: CatalogFormValues;
    catalogTypes: CatalogTypesMap;
};

const CatalogsEditPage = ({ catalog, catalogTypes }: CatalogsEditPageProps) => {
    return (
        <>
            <Head title="Editar catalogo" />
            <CatalogEditContainer catalog={catalog} catalogTypes={catalogTypes} />
        </>
    );
};

export default CatalogsEditPage;
