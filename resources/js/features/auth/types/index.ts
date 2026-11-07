export type AuthFormErrors = Record<string, string>;

export type AuthFieldProps = {
    id: string;
    name: string;
    label: string;
    type?: 'text' | 'email' | 'password';
    error?: string;
    required?: boolean;
    autoComplete?: string;
    maxLength?: number;
};

export type AuthUser = {
    id: number;
    nombre: string;
    apellido: string;
    email: string;
    carrera?: string | null;
    email_verified_at: string | null;
    created_at: string;
    updated_at: string;
    roles?: string[];
};

export type AuthAbilities = {
    'repositories.create': boolean;
    'users.view': boolean;
    'users.create': boolean;
    'roles.view': boolean;
    'catalogs.view': boolean;
};

export type Auth = {
    user: AuthUser | null;
    abilities: AuthAbilities;
};
