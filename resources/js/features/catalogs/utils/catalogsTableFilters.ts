import type { ColumnFiltersState } from "@tanstack/react-table";
import type { VisitCatalogsIndexParams } from "../api/visitCatalogsIndex";
import type { CatalogFilters, CatalogType } from "../types";

export const buildColumnFilters = (
  filters: CatalogFilters,
): ColumnFiltersState => {
  if (filters.type === "all") return [];

  return [{ id: "type", value: [filters.type] }];
};

export const readFiltersFromColumnState = (
  columnFilters: ColumnFiltersState,
): Omit<VisitCatalogsIndexParams, "page"> => {
  const typeFilter = columnFilters.find((filter) => filter.id === "type");
  const type = Array.isArray(typeFilter?.value)
    ? ((typeFilter.value[0] as CatalogType | undefined) ?? "all")
    : "all";

  return {
    type,
  };
};
