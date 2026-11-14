import type { ColumnFiltersState } from "@tanstack/react-table";
import {
  isDateColumnFilterActive,
  parseDateColumnFilterValue,
  type CompoundColumnFilterValue,
  type DateColumnFilterValue,
} from "@/shared/components/dataTable";
import type { VisitUsersIndexParams } from "../api/visitUsersIndex";
import type { UsersFilters } from "../types";

const toDateFilterValue = (
  filters: UsersFilters,
): DateColumnFilterValue => ({
  preset: filters.date,
  from: filters.date_range[0] ?? "",
  to: filters.date_range[1] ?? "",
});

const toSearchFilterValue = (
  search: string,
): CompoundColumnFilterValue | undefined => {
  const trimmed = search.trim();
  return trimmed ? { search: trimmed, values: [] } : undefined;
};

const readSearchFilterValue = (filterValue: unknown): string => {
  if (
    typeof filterValue === "object" &&
    filterValue !== null &&
    "search" in filterValue &&
    typeof filterValue.search === "string"
  ) {
    return filterValue.search;
  }

  return "";
};

export const buildColumnFilters = (
  filters: UsersFilters,
  canFilterCareer: boolean,
): ColumnFiltersState => {
  const next: ColumnFiltersState = [];

  const nombreFilter = toSearchFilterValue(filters.nombre);
  if (nombreFilter) next.push({ id: "nombre", value: nombreFilter });

  const emailFilter = toSearchFilterValue(filters.email);
  if (emailFilter) next.push({ id: "email", value: emailFilter });

  if (canFilterCareer && filters.career.length > 0) {
    next.push({ id: "career", value: filters.career });
  }

  if (filters.role.length > 0) {
    next.push({ id: "role", value: filters.role });
  }

  if (filters.status.length > 0) {
    next.push({ id: "status", value: filters.status });
  }

  const dateFilter = toDateFilterValue(filters);
  if (isDateColumnFilterActive(dateFilter)) {
    next.push({ id: "created_at", value: dateFilter });
  }

  return next;
};

export const readFiltersFromColumnState = (
  nextColumnFilters: ColumnFiltersState,
  canFilterCareer: boolean,
): Omit<VisitUsersIndexParams, "page"> => {
  const nombreFilter = nextColumnFilters.find((filter) => filter.id === "nombre");
  const emailFilter = nextColumnFilters.find((filter) => filter.id === "email");
  const careerFilter = nextColumnFilters.find((filter) => filter.id === "career");
  const roleFilter = nextColumnFilters.find((filter) => filter.id === "role");
  const statusFilter = nextColumnFilters.find((filter) => filter.id === "status");
  const dateFilter = nextColumnFilters.find((filter) => filter.id === "created_at");
  const dateValue = parseDateColumnFilterValue(dateFilter?.value);

  const career = Array.isArray(careerFilter?.value)
    ? (careerFilter.value as string[])
    : [];
  const role = Array.isArray(roleFilter?.value)
    ? (roleFilter.value as string[])
    : [];
  const status = Array.isArray(statusFilter?.value)
    ? (statusFilter.value as string[])
    : [];

  return {
    nombre: readSearchFilterValue(nombreFilter?.value),
    email: readSearchFilterValue(emailFilter?.value),
    career: canFilterCareer ? career : [],
    role,
    status,
    date: dateValue.preset,
    date_range: [dateValue.from, dateValue.to],
  };
};
