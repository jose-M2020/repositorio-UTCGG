import type { PaginationState, Updater } from "@tanstack/react-table";
import { useEffect, useState } from "react";
import { DataTable } from "@/shared/components/dataTable";
import { resolveUpdater } from "@/shared/lib";
import { visitRolesIndex } from "../api/visitRolesIndex";
import { createRolesColumns } from "../columns";
import type { PaginatedRoles, PermissionGroups } from "../types";

type RolesTableProps = {
  roles: PaginatedRoles;
  permissionGroups: PermissionGroups;
};

export const RolesTable = ({ roles, permissionGroups }: RolesTableProps) => {
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: Math.max(0, roles.current_page - 1),
    pageSize: roles.per_page,
  });

  useEffect(() => {
    setPagination({
      pageIndex: Math.max(0, roles.current_page - 1),
      pageSize: roles.per_page,
    });
  }, [roles.current_page, roles.per_page]);

  const handlePaginationChange = (updater: Updater<PaginationState>) => {
    const nextPagination = resolveUpdater(updater, pagination);
    setPagination(nextPagination);

    visitRolesIndex({
      page: nextPagination.pageIndex + 1,
    });
  };

  const columns = createRolesColumns({ permissionGroups });

  return (
    <DataTable
      columns={columns}
      data={roles.data}
      emptyText="No hay roles para mostrar."
      pagination={{
        pageSizeOptions: [roles.per_page],
        hideOnSinglePage: false,
      }}
      tableOptions={{
        getRowId: (row) => String(row.id),
        manualPagination: true,
        manualSorting: true,
        pageCount: roles.last_page,
        rowCount: roles.total,
        state: {
          pagination,
        },
        onPaginationChange: handlePaginationChange,
      }}
    />
  );
};
