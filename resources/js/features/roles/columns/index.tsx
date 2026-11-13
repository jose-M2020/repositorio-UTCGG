import { Form, Link } from "@inertiajs/react";
import { Eye, Pencil, Trash2 } from "lucide-react";
import {
  destroy,
  edit,
  show,
} from "@/actions/App/Http/Controllers/RoleController";
import { createDataTableColumnHelper } from "@/shared/components/dataTable";
import { Button } from "@/shared/components/ui";
import type { RoleListItem } from "../types";

const columnHelper = createDataTableColumnHelper<RoleListItem>();

export const createRolesColumns = () => [
  columnHelper.accessor("name", {
    header: "Rol",
    cell: ({ getValue }) => getValue(),
  }),
  columnHelper.accessor("users_count", {
    header: "Usuarios",
    cell: ({ getValue }) => getValue(),
  }),
  columnHelper.accessor("permissions_count", {
    header: "Permisos",
    cell: ({ getValue }) => getValue(),
  }),
  columnHelper.display({
    id: "actions",
    header: "",
    meta: {
      headerClassName: "w-28 text-right",
      cellClassName: "text-right",
    },
    cell: ({ row }) => {
      const role = row.original;
      const roleName = role.name.trim();

      const deleteTitle = role.users_count > 0
        ? `Asignado a ${role.users_count} usuario(s). Reasigna antes de eliminar.`
        : "Rol del sistema: no se puede eliminar.";

      return (
        <div className="flex justify-end gap-1">
          <Link href={show.url(role.id)}>
            <Button
              type="button"
              variant="ghost"
              size="icon-sm"
              aria-label={`Ver ${roleName}`}
            >
              <Eye aria-hidden="true" />
            </Button>
          </Link>
          <Link href={edit.url(role.id)}>
            <Button
              type="button"
              variant="ghost"
              size="icon-sm"
              aria-label={`Editar ${roleName}`}
            >
              <Pencil aria-hidden="true" />
            </Button>
          </Link>

          {role.can_delete ? (
            <Form {...destroy.form(role.id)}>
              {({ processing }) => (
                <Button
                  type="submit"
                  variant="ghost"
                  size="icon-sm"
                  className="text-destructive hover:bg-destructive/10 hover:text-destructive"
                  disabled={processing}
                  aria-label={`Eliminar ${roleName}`}
                >
                  <Trash2 aria-hidden="true" />
                </Button>
              )}
            </Form>
          ) : (
            <Button
              type="button"
              variant="ghost"
              size="icon-sm"
              className="text-destructive"
              disabled
              title={deleteTitle}
              aria-label={`No se puede eliminar ${roleName}`}
            >
              <Trash2 aria-hidden="true" />
            </Button>
          )}
        </div>
      );
    },
  }),
];
