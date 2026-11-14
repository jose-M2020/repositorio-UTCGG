export type RepositoryMember = {
    id: number;
    first_name: string;
    last_name: string;
    second_last_name?: string | null;
    email: string;
};

export type RepositoryFileItem = {
    id: number;
    original_name: string;
    file_type: string;
    is_public: boolean;
    url?: string;
};

export type Repository = {
    id: number;
    title: string;
    slug: string;
    description: string;
    project_type: string;
    academic_degree: string;
    keywords: string;
    is_public: boolean;
    career: string;
    external_advisor: string | null;
    company: string;
    generation: string;
    created_by: string;
    users: RepositoryMember[];
    files: RepositoryFileItem[];
    images: string[];
    image_urls?: string[];
    cover_url?: string;
    visibility?: "public" | "private";
};

export type RepositoryListItem = {
    id: number;
    title: string;
    slug: string;
    description: string;
    career: string;
    project_type: string;
    academic_degree: string;
    is_public: boolean;
    created_at?: string;
    cover_url?: string;
    users?: RepositoryMember[];
};

export type RepositoryFilters = {
    query: string;
    search_field: string;
    career: string[];
    project_type: string[];
    academic_degree: string[];
    year: string[];
};

export type PaginatedRepositories = {
    data: RepositoryListItem[];
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

export type RepositoryFormErrors = Record<string, string>;
