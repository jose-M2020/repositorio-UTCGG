import type { Column, ColumnDef, Row, RowData, Table, TableOptions } from "@tanstack/react-table";
import type { ReactNode } from "react";

export interface ColumnFilterItem<TValue extends string = string> {
  text: string;
  value: TValue;
  children?: ColumnFilterItem<TValue>[];
}

export type ColumnFilterMode = "default" | "tree";

export interface ColumnFilterSearchConfig {
  placeholder: string;
  ariaLabel: string;
  clearAriaLabel?: string;
}

export interface CompoundColumnFilterValue {
  search: string;
  values: string[];
}

export interface ColumnFilterDropdownContext<TData extends RowData> {
  table: Table<TData>;
  column: Column<TData, unknown>;
  selectedValues: string[];
  setFilterValue: (values: string[] | null) => void;
}

export interface ColumnFilterConfig<TData extends RowData> {
  items?: ColumnFilterItem[];
  mode?: ColumnFilterMode;
  multiple?: boolean;
  label?: string;
  search?: ColumnFilterSearchConfig;
  dropdown?: ReactNode | ((context: ColumnFilterDropdownContext<TData>) => ReactNode);
  active?: boolean | ((context: ColumnFilterDropdownContext<TData>) => boolean);
  treeDefaultExpanded?: boolean;
}

export interface DataTablePaginationOptions {
  pageSizeOptions?: readonly number[];
  hideOnSinglePage?: boolean;
}

export type DataTableProps<TData extends RowData> = {
  columns: ColumnDef<TData, unknown>[];
  data: TData[];
  tableOptions?: Omit<TableOptions<TData>, "columns" | "data" | "getCoreRowModel">;
  emptyText?: string;
  loading?: boolean;
  pagination?: false | DataTablePaginationOptions;
  toolbar?: (table: Table<TData>) => ReactNode;
  renderSubComponent?: (props: { row: Row<TData> }) => ReactNode;
};

declare module "@tanstack/react-table" {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface ColumnMeta<TData extends RowData, TValue> {
    headerClassName?: string;
    cellClassName?: string;
    filter?: ColumnFilterConfig<TData>;
    renderGroupHeader?: (params: {
      groupKey: string;
      records: TData[];
      isExpanded: boolean;
    }) => ReactNode;
  }
}
