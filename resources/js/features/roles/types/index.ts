export type PermissionSection =
    | "management"
    | "action"
    | "assign"
    | "career";

export type RolePermission = {
    id: number;
    name: string;
    description: string | null;
    section?: PermissionSection | string;
};

export type RoleListItem = {
    id: number;
    name: string;
    permissions_count: number;
    users_count: number;
    can_delete: boolean;
    is_system: boolean;
    permissions: RolePermission[];
};

export type RoleFormValues = {
    id?: number;
    name: string;
    permissions: string[];
};

export type PermissionGroups = Record<string, RolePermission[]>;

export type PaginatedRoles = {
    data: RoleListItem[];
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

export type RoleFormErrors = Record<string, string>;
