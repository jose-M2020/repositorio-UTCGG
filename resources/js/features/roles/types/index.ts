export type RolePermission = {
    id: number;
    name: string;
    description: string | null;
};

export type RoleListItem = {
    id: number;
    name: string;
    permissions_count: number;
    permissions: RolePermission[];
};

export type RoleDetails = {
    id: number;
    name: string;
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
