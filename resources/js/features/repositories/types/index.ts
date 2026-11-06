export type RepositoryMember = {
    id: number;
    nombre: string;
    apellido: string;
    email: string;
};

export type RepositoryFileItem = {
    id: number;
    original_name: string;
    file_type: string;
    is_public: boolean;
};

export type Repository = {
    id: number;
    nombre_rep: string;
    slug: string;
    descripcion: string;
    tipo_proyecto: string;
    nivel_proyecto: string;
    palabras_clave: string;
    publico: boolean;
    carrera: string;
    asesor_externo: string | null;
    empresa: string;
    generacion: string;
    created_by: string;
    users: RepositoryMember[];
    files: RepositoryFileItem[];
    imagenes: string[];
    visibilidad?: 'publico' | 'privado';
};

export type RepositoryListItem = {
    id: number;
    nombre_rep: string;
    slug: string;
    descripcion: string;
    carrera: string;
    tipo_proyecto: string;
    nivel_proyecto: string;
    publico: boolean;
    created_at?: string;
    users?: RepositoryMember[];
};

export type RepositoryFilters = {
    query: string;
    search_field: string;
    carrera: string[];
    tipo: string[];
    nivel: string[];
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
