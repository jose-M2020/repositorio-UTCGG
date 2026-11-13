import { createColumnHelper, useTable, type RowData } from "@tanstack/react-table";
import { Table } from "@/shared/components/ui/table";
import { DataTableBody } from "./DataTableBody";
import { DataTableHeader } from "./DataTableHeader";
import { DataTablePagination } from "./DataTablePagination";
import { features, type DataTableFeatures } from "./features";
import type { DataTableProps as BaseDataTableProps } from "./types";

const DEFAULT_PAGINATION_OPTIONS = {
  pageSizeOptions: [10, 20, 50],
  hideOnSinglePage: true,
} as const;

export type DataTableProps<TData extends RowData> = BaseDataTableProps<DataTableFeatures, TData>;

export const createDataTableColumnHelper = <TData extends RowData>() =>
  createColumnHelper<DataTableFeatures, TData>();

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
  const { defaultColumn: tableDefaultColumn, ...restTableOptions } = tableOptions ?? {};

  const table = useTable({
    features,
    // Fallback sizes only; set `size` per column for proportional table-fixed widths.
    defaultColumn: {
      enableSorting: false,
      size: 160,
      minSize: 96,
      ...tableDefaultColumn,
    },
    ...restTableOptions,
    columns,
    data,
  });

  const paginationOptions = pagination === false ? null : { ...DEFAULT_PAGINATION_OPTIONS, ...pagination };

  return (
    <div className="relative w-full">
      {toolbar?.(table)}
      <Table className="table-fixed">
        <DataTableHeader table={table} />
        <DataTableBody
          table={table}
          emptyText={emptyText}
          loading={loading}
          renderSubComponent={renderSubComponent}
        />
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
