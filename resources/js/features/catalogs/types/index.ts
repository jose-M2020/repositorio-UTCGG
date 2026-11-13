export type CatalogType = 'career' | 'project_type' | 'academic_degree';

export type CatalogMeta = {
    image: string;
    show_on_home: boolean;
};

export type CatalogItem = {
    id: number;
    type: CatalogType;
    code: string;
    name: string;
    sort_order: number;
    is_active: boolean;
    meta: CatalogMeta;
};

export type CatalogFormValues = {
    id?: number;
    type: CatalogType;
    code: string;
    name: string;
    sort_order: number;
    meta: CatalogMeta;
};

export type CatalogFilters = {
    type: CatalogType | 'all';
};

export type PaginatedCatalogs = {
    data: CatalogItem[];
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
    links: Array<{
        url: string | null;
        label: string;
        active: boolean;
    }>;
};

export type CatalogTypesMap = Record<CatalogType, string>;

export type CatalogFormErrors = Record<string, string>;
