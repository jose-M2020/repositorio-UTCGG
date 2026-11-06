export type UserListItem = {
    id: number;
    nombre: string;
    apellido: string;
    email: string;
    carrera: string | null;
    created_at: string;
    roles: Array<{ id: number; name: string }>;
};

export type UserFormValues = {
    id?: number;
    nombre: string;
    apellido: string;
    email: string;
    carrera: string;
    rol: string | null;
};

export type UserRepositorySummary = {
    id: number;
    nombre_rep: string;
    slug: string;
    publico: boolean;
};

export type UserDetails = {
    id: number;
    nombre: string;
    apellido: string;
    email: string;
    carrera: string | null;
    roles: string[];
    created_at: string | null;
};

export type UsersFilters = {
    query: string;
    carrera: string;
    rol: string;
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
