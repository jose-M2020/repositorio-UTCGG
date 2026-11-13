import { Link } from "@inertiajs/react";
import { Eye, Pencil } from "lucide-react";
import { destroy, edit, show } from "@/actions/App/Http/Controllers/UserController";
import { ConfirmDeleteButton } from "@/shared/components/ConfirmDeleteButton";
import { createDataTableColumnHelper } from "@/shared/components/dataTable";
import { Button } from "@/shared/components/ui";
import type { RoleOption, UserListItem } from "../types";

const USERS_DATE_FILTER_PRESETS = [
  { value: "today", label: "Hoy" },
  { value: "week", label: "Esta Semana" },
  { value: "month", label: "Este mes" },
  { value: "year", label: "Este año" },
] as const;

type CreateUsersColumnsOptions = {
  roles: RoleOption[];
  careersOptions: Record<string, string>;
  canFilterCareer: boolean;
};

const columnHelper = createDataTableColumnHelper<UserListItem>();

export const createUsersColumns = ({
  roles,
  careersOptions,
  canFilterCareer,
}: CreateUsersColumnsOptions) => [
  columnHelper.accessor((row) => `${row.nombre} ${row.apellido}`.trim(), {
    id: "nombre",
    header: "Nombre",
    size: 220,
    minSize: 160,
    enableColumnFilter: true,
    cell: ({ row }) => `${row.original.nombre} ${row.original.apellido}`.trim(),
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
  columnHelper.accessor("carrera", {
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
    id: "rol",
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
    size: 120,
    minSize: 120,
    maxSize: 120,
    meta: {
      headerClassName: "text-right",
      cellClassName: "max-w-none overflow-visible text-right",
    },
    cell: ({ row }) => {
      const user = row.original;
      const userName = `${user.nombre} ${user.apellido}`.trim();

      return (
        <div className="flex justify-end gap-1">
          <Link href={show.url(user.id)}>
            <Button
              type="button"
              variant="ghost"
              size="icon-sm"
              aria-label={`Ver ${userName}`}
            >
              <Eye aria-hidden="true" />
            </Button>
          </Link>
          <Link href={edit.url(user.id)}>
            <Button
              type="button"
              variant="ghost"
              size="icon-sm"
              aria-label={`Editar ${userName}`}
            >
              <Pencil aria-hidden="true" />
            </Button>
          </Link>
          <ConfirmDeleteButton
            form={destroy.form(user.id)}
            itemLabel={userName}
          />
        </div>
      );
    },
  }),
];
