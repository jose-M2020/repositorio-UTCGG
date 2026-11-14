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
    nombre: string;
    email: string;
    carrera: string[];
    rol: string[];
    fecha: string;
    rango_fecha: string[];
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
