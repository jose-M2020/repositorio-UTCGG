import type { ColumnFiltersState, PaginationState, Updater } from "@tanstack/react-table";
import { useEffect, useState } from "react";
import { DataTable } from "@/shared/components/dataTable";
import { resolveUpdater } from "@/shared/lib";
import { visitCatalogsIndex } from "../api/visitCatalogsIndex";
import { createCatalogsColumns } from "../columns";
import {
  buildColumnFilters,
  readFiltersFromColumnState,
} from "../utils/catalogsTableFilters";
import type { CatalogFilters, CatalogTypesMap, PaginatedCatalogs } from "../types";

type CatalogsTableProps = {
  catalogs: PaginatedCatalogs;
  filters: CatalogFilters;
  catalogTypes: CatalogTypesMap;
};

export const CatalogsTable = ({
  catalogs,
  filters,
  catalogTypes,
}: CatalogsTableProps) => {
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>(() =>
    buildColumnFilters(filters),
  );
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: Math.max(0, catalogs.current_page - 1),
    pageSize: catalogs.per_page,
  });

  useEffect(() => {
    setColumnFilters(buildColumnFilters(filters));
    setPagination({
      pageIndex: Math.max(0, catalogs.current_page - 1),
      pageSize: catalogs.per_page,
    });
  }, [filters, catalogs.current_page, catalogs.per_page]);

  const handleColumnFiltersChange = (updater: Updater<ColumnFiltersState>) => {
    const nextColumnFilters = resolveUpdater(updater, columnFilters);
    setColumnFilters(nextColumnFilters);

    visitCatalogsIndex({
      ...readFiltersFromColumnState(nextColumnFilters),
      page: 1,
    });
  };

  const handlePaginationChange = (updater: Updater<PaginationState>) => {
    const nextPagination = resolveUpdater(updater, pagination);
    setPagination(nextPagination);

    visitCatalogsIndex({
      ...readFiltersFromColumnState(columnFilters),
      page: nextPagination.pageIndex + 1,
    });
  };

  const columns = createCatalogsColumns({
    catalogTypes,
  });

  return (
    <DataTable
      columns={columns}
      data={catalogs.data}
      emptyText="No hay elementos de catalogo para mostrar."
      pagination={{
        pageSizeOptions: [catalogs.per_page],
        hideOnSinglePage: false,
      }}
      tableOptions={{
        getRowId: (row) => String(row.id),
        manualFiltering: true,
        manualPagination: true,
        manualSorting: true,
        pageCount: catalogs.last_page,
        rowCount: catalogs.total,
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
