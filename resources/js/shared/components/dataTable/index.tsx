import {
  getCoreRowModel,
  getExpandedRowModel,
  getFacetedMinMaxValues,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getGroupedRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  type RowData,
} from "@tanstack/react-table";
import { Table } from "@/shared/components/ui/table";
import { DataTableBody } from "./DataTableBody";
import { DataTableHeader } from "./DataTableHeader";
import { DataTablePagination } from "./DataTablePagination";
import type { DataTableProps } from "./types";

export { DataTableGlobalSearch } from "./DataTableGlobalSearch";
export { createExpandColumn } from "./createExpandColumn";

const DEFAULT_PAGINATION_OPTIONS = {
  pageSizeOptions: [10, 20, 50],
  hideOnSinglePage: true,
} as const;

export const DataTable = <TData extends RowData>({
  columns,
  data,
  tableOptions,
  emptyText,
  loading = false,
  pagination = DEFAULT_PAGINATION_OPTIONS,
  toolbar,
  renderSubComponent,
}: DataTableProps<TData>) => {
  const table = useReactTable({
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    getFacetedMinMaxValues: getFacetedMinMaxValues(),
    getGroupedRowModel: getGroupedRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getExpandedRowModel: getExpandedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    defaultColumn: { enableSorting: false },
    ...tableOptions,
    columns,
    data,
  });

  const paginationOptions = pagination === false ? null : { ...DEFAULT_PAGINATION_OPTIONS, ...pagination };

  return (
    <div className="relative w-full">
      {toolbar?.(table)}
      <Table>
        <DataTableHeader table={table} />
        <DataTableBody table={table} emptyText={emptyText} loading={loading} renderSubComponent={renderSubComponent} />
      </Table>

      {paginationOptions ? (
        <DataTablePagination
          table={table}
          pageSizeOptions={paginationOptions.pageSizeOptions}
          hideOnSinglePage={paginationOptions.hideOnSinglePage}
        />
      ) : null}
    </div>
  );
};

export type {
  ColumnFilterConfig,
  ColumnFilterDropdownContext,
  ColumnFilterItem,
  ColumnFilterMode,
  ColumnFilterSearchConfig,
  CompoundColumnFilterValue,
  DataTablePaginationOptions,
  DataTableProps,
} from "./types";
