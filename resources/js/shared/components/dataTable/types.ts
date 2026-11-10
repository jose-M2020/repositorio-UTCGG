import type { ColumnDef, ReactTable, Row, RowData, TableFeatures, TableOptions } from "@tanstack/react-table";
import type { ReactNode } from "react";

export interface ColumnFilterItem<TValue extends string = string> {
  text: string;
  value: TValue;
  children?: ColumnFilterItem<TValue>[];
}

export type ColumnFilterMode = "default" | "tree" | "date";

export interface ColumnFilterSearchConfig {
  placeholder: string;
  ariaLabel: string;
  clearAriaLabel?: string;
}

export interface CompoundColumnFilterValue {
  search: string;
  values: string[];
}

export type DateColumnFilterMode = "single" | "range";

export type DateColumnFilterPreset = {
  value: string;
  label: string;
};

/** Shared date filter value — map to API params in the feature table. */
export type DateColumnFilterValue = {
  preset: string;
  from: string;
  to: string;
};

export type ColumnFilterDateConfig = {
  presets?: readonly DateColumnFilterPreset[];
  /** Calendar modes to offer. Defaults to `["single", "range"]`. */
  modes?: readonly DateColumnFilterMode[];
  defaultMode?: DateColumnFilterMode;
  numberOfMonths?: number;
  captionLayout?: "label" | "dropdown" | "dropdown-months" | "dropdown-years";
  labels?: {
    title?: string;
    calendar?: string;
    single?: string;
    range?: string;
    noPreset?: string;
    apply?: string;
    reset?: string;
  };
};

export interface ColumnFilterDropdownContext {
  table: unknown;
  column: unknown;
  selectedValues: string[];
  setFilterValue: (values: string[] | null) => void;
}

export interface ColumnFilterConfig<TData extends RowData = RowData> {
  items?: ColumnFilterItem[];
  mode?: ColumnFilterMode;
  multiple?: boolean;
  label?: string;
  search?: ColumnFilterSearchConfig;
  date?: ColumnFilterDateConfig;
  dropdown?: ReactNode | ((context: ColumnFilterDropdownContext) => ReactNode);
  active?: boolean | ((context: ColumnFilterDropdownContext) => boolean);
  treeDefaultExpanded?: boolean;
}

export interface DataTableColumnMeta<TData extends RowData> {
  headerClassName?: string;
  cellClassName?: string;
  filter?: ColumnFilterConfig<TData>;
  renderGroupHeader?: (params: {
    groupKey: string;
    records: TData[];
    isExpanded: boolean;
  }) => ReactNode;
}

export interface DataTablePaginationOptions {
  pageSizeOptions?: readonly number[];
  hideOnSinglePage?: boolean;
}

export type DataTableProps<TFeatures extends TableFeatures, TData extends RowData> = {
  columns: ColumnDef<TFeatures, TData, any>[];
  data: TData[];
  tableOptions?: Omit<TableOptions<TFeatures, TData>, "columns" | "data" | "features">;
  emptyText?: string;
  loading?: boolean;
  pagination?: false | DataTablePaginationOptions;
  toolbar?: (table: ReactTable<TFeatures, TData>) => ReactNode;
  renderSubComponent?: (props: { row: Row<TFeatures, TData> }) => ReactNode;
};
