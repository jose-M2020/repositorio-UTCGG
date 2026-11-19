import { createDataTableColumnHelper } from "@/shared/components/dataTable";
import { RoleRowActions } from "../components/list/RoleRowActions";
import type { PermissionGroups, RoleListItem } from "../types";

type CreateRolesColumnsOptions = {
  permissionGroups: PermissionGroups;
};

const columnHelper = createDataTableColumnHelper<RoleListItem>();

export const createRolesColumns = ({
  permissionGroups,
}: CreateRolesColumnsOptions) => [
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
    cell: ({ row }) => (
      <RoleRowActions
        role={row.original}
        permissionGroups={permissionGroups}
      />
    ),
  }),
];
