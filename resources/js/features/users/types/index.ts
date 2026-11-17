export type UserAccountStatus =
    | "pending_activation"
    | "active"
    | "inactive";

export type UserTypeOption = {
    value: string;
    label: string;
};

export type CareerOption = {
    id: number;
    code: string;
    name: string;
};

export type UserListItem = {
    id: number;
    first_name: string;
    last_name: string;
    second_last_name: string | null;
    email: string;
    user_type?: string | null;
    career: string | null;
    career_ids?: number[];
    status: UserAccountStatus;
    created_at: string;
    roles: Array<{ id: number; name: string }>;
};

export type UserFormValues = {
    id?: number;
    first_name: string;
    last_name: string;
    second_last_name: string;
    email: string;
    career: string;
    role: string | null;
};

export type UserRepositorySummary = {
    id: number;
    title: string;
    slug: string;
    is_public: boolean;
};

export type UserDetails = {
    id: number;
    first_name: string;
    last_name: string;
    second_last_name: string | null;
    email: string;
    career: string | null;
    status: UserAccountStatus;
    roles: string[];
    created_at: string | null;
};

export type UsersFilters = {
    name: string;
    email: string;
    career: string[];
    role: string[];
    status: string[];
    date: string;
    date_range: string[];
};

export type PaginatedUsers = {
    data: UserListItem[];
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

export type UserFormErrors = Record<string, string>;

export type RoleOption = {
    value: string;
    label: string;
    requires_career?: boolean;
};

export type RolePermissionPreview = {
    name: string;
    description: string | null;
};

export type CareerFormPolicy = {
    can_select_career: boolean;
    locked_career: string | null;
    locked_career_label: string | null;
};
