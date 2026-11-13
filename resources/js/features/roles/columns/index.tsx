import { Link } from "@inertiajs/react";
import { Eye, Pencil } from "lucide-react";
import {
  destroy,
  edit,
  show,
} from "@/actions/App/Http/Controllers/RoleController";
import { ConfirmDeleteButton } from "@/shared/components/ConfirmDeleteButton";
import { createDataTableColumnHelper } from "@/shared/components/dataTable";
import { Button } from "@/shared/components/ui";
import type { RoleListItem } from "../types";

const columnHelper = createDataTableColumnHelper<RoleListItem>();

export const createRolesColumns = () => [
  columnHelper.accessor("name", {
    header: "Rol",
    size: 280,
    minSize: 180,
    cell: ({ getValue }) => getValue(),
  }),
  columnHelper.accessor("users_count", {
    header: "Usuarios",
    size: 110,
    minSize: 96,
    cell: ({ getValue }) => getValue(),
  }),
  columnHelper.accessor("permissions_count", {
    header: "Permisos",
    size: 110,
    minSize: 96,
    cell: ({ getValue }) => getValue(),
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
      const role = row.original;
      const roleName = role.name.trim();
      const disabledReason = role.can_delete
        ? undefined
        : role.users_count > 0
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
          <ConfirmDeleteButton
            form={destroy.form(role.id)}
            itemLabel={roleName}
            disabledReason={disabledReason}
          />
        </div>
      );
    },
  }),
];
