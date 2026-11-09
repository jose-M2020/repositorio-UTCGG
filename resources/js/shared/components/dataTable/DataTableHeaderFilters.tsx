import { useState } from "react";
import { Filter } from "lucide-react";
import type { Column, ReactTable, RowData } from "@tanstack/react-table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/shared/components/ui/dropdown-menu";
import { cn } from "@/shared/lib";
import { ListFilterDropdown } from "./filters/ListFilterDropdown";
import { TreeFilterDropdown } from "./filters/TreeFilterDropdown";
import { flattenFilterItems } from "./filters/treeFilterUtils";
import { CompoundFilterDropdown } from "./filters/CompoundFilterDropdown";
import type { CompoundColumnFilterValue } from "./types";
import type { DataTableFeatures } from "./features";

type DataTableHeaderFiltersProps<TData extends RowData> = {
  table: ReactTable<DataTableFeatures, TData>;
  column: Column<DataTableFeatures, TData, unknown>;
};

export const DataTableHeaderFilters = <TData extends RowData>({
  table,
  column,
}: DataTableHeaderFiltersProps<TData>) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [filterDraftKey, setFilterDraftKey] = useState(0);
  const filter = column.columnDef.meta?.filter;

  if (!filter?.items?.length && !filter?.search && !filter?.dropdown) return null;

  const columnLabel =
    typeof column.columnDef.header === "string" ? column.columnDef.header : column.id;
  const isTreeFilter = filter.mode === "tree" && Boolean(filter.items?.length);
  const isCompoundFilter = Boolean(filter.search) && !filter.dropdown;
  const isBatchFilter = isTreeFilter || isCompoundFilter || Boolean(filter.items?.length);
  const filterValue = column.getFilterValue();
  const selectedValues = Array.isArray(filterValue) ? (filterValue as string[]) : [];
  const setFilterValue = (values: string[] | null) =>
    column.setFilterValue(values?.length ? values : undefined);
  const filterContext = { table, column, selectedValues, setFilterValue };
  const compoundValue: CompoundColumnFilterValue =
    typeof filterValue === "object" &&
    filterValue !== null &&
    "search" in filterValue &&
    "values" in filterValue
      ? {
          search:
            typeof filterValue.search === "string" ? filterValue.search : "",
          values: Array.isArray(filterValue.values)
            ? filterValue.values.filter(
                (value): value is string => typeof value === "string",
              )
            : [],
        }
      : { search: "", values: [] };
  const isFilterActive = isCompoundFilter
    ? Boolean(compoundValue.search.trim()) || compoundValue.values.length > 0
    : typeof filter.active === "function"
      ? filter.active(filterContext)
      : typeof filter.active === "boolean"
        ? filter.active
        : selectedValues.length > 0;

  const handleMenuOpenChange = (open: boolean) => {
    if (!open) setFilterDraftKey((key) => key + 1);
    setMenuOpen(open);
  };

  const handleApplyValues = (values: string[]) => {
    setFilterValue(values.length ? values : null);
    handleMenuOpenChange(false);
  };

  const filterContent = filter.dropdown
    ? typeof filter.dropdown === "function"
      ? filter.dropdown(filterContext)
      : filter.dropdown
    : isCompoundFilter && filter.search
      ? (
          <CompoundFilterDropdown
            key={filterDraftKey}
            search={filter.search}
            items={flattenFilterItems(filter.items ?? [])}
            label={filter.label}
            multiple={filter.multiple}
            value={compoundValue}
            onApply={(nextValue) => {
              column.setFilterValue(
                nextValue.search.trim() || nextValue.values.length > 0
                  ? nextValue
                  : undefined,
              );
              handleMenuOpenChange(false);
            }}
          />
        )
      : isTreeFilter
        ? (
            <TreeFilterDropdown
              key={filterDraftKey}
              filters={filter.items ?? []}
              appliedValues={selectedValues}
              defaultExpanded={filter.treeDefaultExpanded ?? true}
              filterMultiple={filter.multiple}
              onApply={handleApplyValues}
            />
          )
        : (
            <ListFilterDropdown
              key={filterDraftKey}
              items={flattenFilterItems(filter.items ?? [])}
              appliedValues={selectedValues}
              filterMultiple={filter.multiple}
              columnTitle={columnLabel}
              onApply={handleApplyValues}
            />
          );

  return (
    <DropdownMenu
      open={isBatchFilter ? menuOpen : undefined}
      onOpenChange={isBatchFilter ? handleMenuOpenChange : undefined}
    >
      <DropdownMenuTrigger
        render={
          <button
            type="button"
            className={cn(
              "inline-flex h-7 w-7 cursor-pointer items-center justify-center rounded-md border border-transparent hover:bg-gray-200/60 focus:outline-none focus:ring-2 focus:ring-primary/40",
              isFilterActive ? "text-primary" : "text-gray-500",
            )}
            aria-label={`Filtrar ${columnLabel}`}
          />
        }
      >
        <Filter className="h-4 w-4" aria-hidden="true" />
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className={cn(isBatchFilter || isTreeFilter ? "w-auto p-0" : "w-72")}
      >
        {filterContent}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
