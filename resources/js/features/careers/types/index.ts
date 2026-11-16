export type CareerItem = {
    id: number;
    code: string;
    name: string;
    slug: string;
    description: string;
    image_path: string;
    show_on_home: boolean;
    sort_order: number;
    is_active: boolean;
};

export type CareerFormValues = {
    id?: number;
    code: string;
    name: string;
    description: string;
    image_path: string;
    show_on_home: boolean;
    sort_order: number;
};

export type PaginatedCareers = {
    data: CareerItem[];
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

export type CareerFormErrors = Record<string, string>;