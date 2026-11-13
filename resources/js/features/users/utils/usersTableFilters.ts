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
  preset: filters.fecha,
  from: filters.rango_fecha[0] ?? "",
  to: filters.rango_fecha[1] ?? "",
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

  if (canFilterCareer && filters.carrera.length > 0) {
    next.push({ id: "carrera", value: filters.carrera });
  }

  if (filters.rol.length > 0) {
    next.push({ id: "rol", value: filters.rol });
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
  const carreraFilter = nextColumnFilters.find((filter) => filter.id === "carrera");
  const rolFilter = nextColumnFilters.find((filter) => filter.id === "rol");
  const dateFilter = nextColumnFilters.find((filter) => filter.id === "created_at");
  const dateValue = parseDateColumnFilterValue(dateFilter?.value);

  const carrera = Array.isArray(carreraFilter?.value)
    ? (carreraFilter.value as string[])
    : [];
  const rol = Array.isArray(rolFilter?.value)
    ? (rolFilter.value as string[])
    : [];

  return {
    nombre: readSearchFilterValue(nombreFilter?.value),
    email: readSearchFilterValue(emailFilter?.value),
    carrera: canFilterCareer ? carrera : [],
    rol,
    fecha: dateValue.preset,
    rango_fecha: [dateValue.from, dateValue.to],
  };
};
