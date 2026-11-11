import { Form, Link } from "@inertiajs/react";
import { destroy, edit, show } from "@/actions/App/Http/Controllers/UserController";
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
        },
      },
    },
  }),
  columnHelper.display({
    id: "actions",
    header: "Acciones",
    meta: {
      headerClassName: "text-right",
      cellClassName: "text-right",
    },
    cell: ({ row }) => {
      const user = row.original;

      return (
        <div className="flex justify-end gap-2">
          <Link href={show.url(user.id)}>
            <Button type="button" variant="ghost">
              Ver
            </Button>
          </Link>
          <Link href={edit.url(user.id)}>
            <Button type="button" variant="outline">
              Editar
            </Button>
          </Link>
          <Form {...destroy.form(user.id)}>
            {({ processing }) => (
              <Button type="submit" variant="destructive" disabled={processing}>
                Eliminar
              </Button>
            )}
          </Form>
        </div>
      );
    },
  }),
];
