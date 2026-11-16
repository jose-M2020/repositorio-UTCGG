import type { ChangeEvent } from 'react';

export type AuthFormErrors = Record<string, string>;

export type SetPasswordLinkStatus = 'valid' | 'invalid';

export type SetPasswordPurpose = 'activation' | 'reset';

export const PASSWORD_SET_STATUS = 'password_set';

export type AuthFieldProps = {
    id: string;
    name: string;
    label: string;
    type?: 'text' | 'email' | 'password';
    error?: string;
    required?: boolean;
    autoComplete?: string;
    maxLength?: number;
    defaultValue?: string;
    value?: string;
    readOnly?: boolean;
    onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
};

export type AuthUser = {
    id: number;
    first_name: string;
    last_name: string;
    second_last_name?: string | null;
    email: string;
    career?: string | null;
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
    'careers.view': boolean;
    'project_types.view': boolean;
    'education_levels.view': boolean;
};

export type Auth = {
    user: AuthUser | null;
    abilities: AuthAbilities;
};
