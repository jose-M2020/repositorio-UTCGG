import type { ColumnFiltersState, PaginationState, Updater } from "@tanstack/react-table";
import { useEffect, useState } from "react";
import { DataTable } from "@/shared/components/dataTable";
import { resolveUpdater } from "@/shared/lib";
import { visitUsersIndex } from "../api/visitUsersIndex";
import { createUsersColumns } from "../columns";
import {
  buildColumnFilters,
  readFiltersFromColumnState,
} from "../utils/usersTableFilters";
import type {
  CareerFormPolicy,
  PaginatedUsers,
  RoleOption,
  UsersFilters,
} from "../types";

type UsersTableProps = {
  users: PaginatedUsers;
  filters: UsersFilters;
  roles: RoleOption[];
  careersOptions: Record<string, string>;
  careerPolicy: CareerFormPolicy;
};

export const UsersTable = ({
  users,
  filters,
  roles,
  careersOptions,
  careerPolicy,
}: UsersTableProps) => {
  const canFilterCareer = careerPolicy.can_select_career;
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>(() =>
    buildColumnFilters(filters, canFilterCareer),
  );
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: Math.max(0, users.current_page - 1),
    pageSize: users.per_page,
  });

  useEffect(() => {
    setColumnFilters(buildColumnFilters(filters, canFilterCareer));
    setPagination({
      pageIndex: Math.max(0, users.current_page - 1),
      pageSize: users.per_page,
    });
  }, [filters, users.current_page, users.per_page, canFilterCareer]);

  const handleColumnFiltersChange = (updater: Updater<ColumnFiltersState>) => {
    const nextColumnFilters = resolveUpdater(updater, columnFilters);
    setColumnFilters(nextColumnFilters);

    visitUsersIndex({
      ...readFiltersFromColumnState(nextColumnFilters, canFilterCareer),
      page: 1,
    });
  };

  const handlePaginationChange = (updater: Updater<PaginationState>) => {
    const nextPagination = resolveUpdater(updater, pagination);
    setPagination(nextPagination);

    visitUsersIndex({
      ...readFiltersFromColumnState(columnFilters, canFilterCareer),
      page: nextPagination.pageIndex + 1,
    });
  };

  const columns = createUsersColumns({
    roles,
    careersOptions,
    canFilterCareer,
  });

  return (
    <DataTable
      columns={columns}
      data={users.data}
      emptyText="No hay usuarios para mostrar."
      pagination={{
        pageSizeOptions: [users.per_page],
        hideOnSinglePage: false,
      }}
      tableOptions={{
        getRowId: (row) => String(row.id),
        manualFiltering: true,
        manualPagination: true,
        manualSorting: true,
        pageCount: users.last_page,
        rowCount: users.total,
        state: {
          columnFilters,
          pagination,
        },
        onColumnFiltersChange: handleColumnFiltersChange,
        onPaginationChange: handlePaginationChange,
      }}
    />
  );
};
