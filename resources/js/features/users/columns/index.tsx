import { Link } from "@inertiajs/react";
import { show } from "@/actions/App/Http/Controllers/UserController";
import { createDataTableColumnHelper } from "@/shared/components/dataTable";
import { UserRowActions } from "../components/UserRowActions";
import { UserStatusBadge } from "../components/UserStatusBadge";
import type {
  CareerFormPolicy,
  CareerOption,
  RoleOption,
  RolePermissionPreview,
  UserListItem,
  UserTypeOption,
} from "../types";
import { formatUserName } from "../utils/formatUserName";

const USERS_DATE_FILTER_PRESETS = [
  { value: "today", label: "Hoy" },
  { value: "week", label: "Esta Semana" },
  { value: "month", label: "Este mes" },
  { value: "year", label: "Este año" },
] as const;

type CreateUsersColumnsOptions = {
  roles: RoleOption[];
  assignableRoles: RoleOption[];
  rolePermissions: Record<string, RolePermissionPreview[]>;
  careersOptions: Record<string, string>;
  careerOptions: CareerOption[];
  canFilterCareer: boolean;
  careerPolicy: CareerFormPolicy;
  userTypes?: UserTypeOption[];
};

const columnHelper = createDataTableColumnHelper<UserListItem>();

export const createUsersColumns = ({
  roles,
  assignableRoles,
  rolePermissions,
  careersOptions,
  careerOptions,
  canFilterCareer,
  careerPolicy,
  userTypes = [],
}: CreateUsersColumnsOptions) => [
  columnHelper.accessor((row) => formatUserName(row), {
    id: "name",
    header: "Nombre",
    size: 220,
    minSize: 160,
    enableColumnFilter: true,
    cell: ({ row }) => {
      const fullName = formatUserName(row.original);
      return (
        <Link
          href={show.url(row.original.id)}
          className="font-medium text-foreground underline-offset-4 hover:underline"
        >
          {fullName}
        </Link>
      );
    },
    meta: {
      filter: {
        search: {
          placeholder: "Buscar nombre...",
          ariaLabel: "Buscar por nombre",
          clearAriaLabel: "Limpiar búsqueda de nombre",
        },
      },
    },
  }),
  columnHelper.accessor("email", {
    header: "Correo",
    size: 240,
    minSize: 180,
    enableColumnFilter: true,
    meta: {
      filter: {
        search: {
          placeholder: "Buscar correo...",
          ariaLabel: "Buscar por correo",
          clearAriaLabel: "Limpiar búsqueda de correo",
        },
      },
    },
  }),
  columnHelper.accessor("career", {
    header: "Carrera",
    size: 200,
    minSize: 140,
    cell: ({ getValue }) => getValue() ?? "—",
    enableColumnFilter: canFilterCareer,
    meta: canFilterCareer
      ? {
          filter: {
            multiple: true,
            items: Object.entries(careersOptions).map(([value, text]) => ({
              text: `${value} · ${text}`,
              value,
            })),
          },
        }
      : undefined,
  }),
  columnHelper.accessor((row) => row.roles.map((role) => role.name).join(", "), {
    id: "role",
    header: "Rol",
    size: 120,
    minSize: 96,
    cell: ({ getValue }) => getValue() || "—",
    enableColumnFilter: true,
    meta: {
      filter: {
        multiple: true,
        items: roles.map((role) => ({
          text: role.label,
          value: role.value,
        })),
      },
    },
  }),
  columnHelper.accessor("status", {
    header: "Estado",
    size: 120,
    minSize: 104,
    cell: ({ getValue }) => <UserStatusBadge status={getValue()} />,
    enableColumnFilter: true,
    meta: {
      filter: {
        multiple: true,
        items: [
          { text: "Activo", value: "active" },
          { text: "Pendiente", value: "pending_activation" },
          { text: "Inactivo", value: "inactive" },
        ],
      },
    },
  }),
  columnHelper.accessor("created_at", {
    header: "Fecha",
    size: 120,
    minSize: 104,
    cell: ({ getValue }) => {
      const value = getValue();
      if (!value) return "—";
      const date = new Date(value);
      if (Number.isNaN(date.getTime())) return value;
      return date.toLocaleDateString("es-MX");
    },
    enableColumnFilter: true,
    meta: {
      filter: {
        mode: "date",
        date: {
          presets: USERS_DATE_FILTER_PRESETS,
          modes: ["range"],
          disabledDates: {
            future: true,
          },
        },
      },
    },
  }),
  columnHelper.display({
    id: "actions",
    header: "",
    size: 56,
    minSize: 56,
    maxSize: 56,
    meta: {
      headerClassName: "text-right",
      cellClassName: "max-w-none overflow-visible text-right",
    },
    cell: ({ row }) => (
      <UserRowActions
        user={row.original}
        roles={assignableRoles}
        rolePermissions={rolePermissions}
        careers={careerOptions}
        careerPolicy={careerPolicy}
        userTypes={userTypes}
      />
    ),
  }),
];
