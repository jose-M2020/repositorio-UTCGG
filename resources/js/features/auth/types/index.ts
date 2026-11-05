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

export type Auth = {
    user: AuthUser | null;
};
