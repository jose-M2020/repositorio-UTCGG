import { Head } from '@inertiajs/react';
import {
    CatalogCreateContainer,
    type CatalogTypesMap,
} from '@/features/catalogs';

type CatalogsCreatePageProps = {
    catalogTypes: CatalogTypesMap;
};

const CatalogsCreatePage = ({ catalogTypes }: CatalogsCreatePageProps) => {
    return (
        <>
            <Head title="Nuevo catalogo" />
            <CatalogCreateContainer catalogTypes={catalogTypes} />
        </>
    );
};

export default CatalogsCreatePage;
