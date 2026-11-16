export type ProjectTypeItem = {
    id: number;
    code: string;
    name: string;
    description: string;
    is_team_project: boolean;
    requires_term: boolean;
    requires_internship_flow: boolean;
    requires_business_advisor: boolean;
    sort_order: number;
    is_active: boolean;
};

export type ProjectTypeFormValues = {
    id?: number;
    code: string;
    name: string;
    description: string;
    is_team_project: boolean;
    requires_term: boolean;
    requires_internship_flow: boolean;
    requires_business_advisor: boolean;
    sort_order: number;
};

export type PaginatedProjectTypes = {
    data: ProjectTypeItem[];
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

export type ProjectTypeFormErrors = Record<string, string>;