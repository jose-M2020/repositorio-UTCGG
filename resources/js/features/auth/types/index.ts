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

/**
 * Shared ability keys from App\Support\Permissions `shared_as` values.
 * Keep in sync with Permissions::sharedAbilities().
 */
export const AUTH_ABILITIES = {
    USERS_VIEW: 'users.view',
    USERS_CREATE: 'users.create',
    USERS_EDIT: 'users.edit',
    USERS_TOGGLE_ACTIVE: 'users.toggle-active',
    USERS_UPDATE_ROLE: 'users.update-role',
    USERS_PASSWORD_LINK: 'users.password-link',
    USERS_DESTROY: 'users.destroy',
    ROLES_VIEW: 'roles.view',
    CAREERS_VIEW: 'careers.view',
    CAREERS_CREATE: 'careers.create',
    CAREERS_EDIT: 'careers.edit',
    CAREERS_TOGGLE_ACTIVE: 'careers.toggle-active',
    CAREERS_DESTROY: 'careers.destroy',
    PROJECT_TYPES_VIEW: 'project_types.view',
    PROJECT_TYPES_CREATE: 'project_types.create',
    PROJECT_TYPES_EDIT: 'project_types.edit',
    PROJECT_TYPES_TOGGLE_ACTIVE: 'project_types.toggle-active',
    PROJECT_TYPES_DESTROY: 'project_types.destroy',
    EDUCATION_LEVELS_VIEW: 'education_levels.view',
    EDUCATION_LEVELS_CREATE: 'education_levels.create',
    EDUCATION_LEVELS_EDIT: 'education_levels.edit',
    EDUCATION_LEVELS_TOGGLE_ACTIVE: 'education_levels.toggle-active',
    EDUCATION_LEVELS_DESTROY: 'education_levels.destroy',
    REPOSITORIES_CREATE: 'repositories.create',
} as const;

export type AuthAbilityKey = (typeof AUTH_ABILITIES)[keyof typeof AUTH_ABILITIES];

export type AuthAbilities = Record<AuthAbilityKey, boolean>;

export type Auth = {
    user: AuthUser | null;
    abilities: AuthAbilities;
};
