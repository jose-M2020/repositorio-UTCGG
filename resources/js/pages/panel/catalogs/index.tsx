import { Head } from '@inertiajs/react';
import {
    CatalogsIndexContainer,
    type CatalogFilters,
    type CatalogTypesMap,
    type PaginatedCatalogs,
} from '@/features/catalogs';

type CatalogsIndexPageProps = {
    catalogs: PaginatedCatalogs;
    filters: CatalogFilters;
    catalogTypes: CatalogTypesMap;
};

const CatalogsIndexPage = ({
    catalogs,
    filters,
    catalogTypes,
}: CatalogsIndexPageProps) => {
    return (
        <>
            <Head title="Catalogos" />
            <CatalogsIndexContainer
                catalogs={catalogs}
                filters={filters}
                catalogTypes={catalogTypes}
            />
        </>
    );
};

export default CatalogsIndexPage;
