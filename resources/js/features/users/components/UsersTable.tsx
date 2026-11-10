import { router } from "@inertiajs/react";
import type { ColumnFiltersState, PaginationState, Updater } from "@tanstack/react-table";
import { useEffect, useState } from "react";
import { index } from "@/actions/App/Http/Controllers/UserController";
import {
  DataTable,
  type CompoundColumnFilterValue,
} from "@/shared/components/dataTable";
import { createUsersColumns } from "../columns";
import type {
  CareerFormPolicy,
  PaginatedUsers,
  RoleOption,
  UsersFilters,
} from "../types";
import {
  isUsersDateFilterActive,
  type UsersDateFilterValue,
} from "./UsersDateFilter";

type UsersTableProps = {
  users: PaginatedUsers;
  filters: UsersFilters;
  roles: RoleOption[];
  careersOptions: Record<string, string>;
  careerPolicy: CareerFormPolicy;
};

const resolveUpdater = <T,>(updater: Updater<T>, previous: T): T =>
  typeof updater === "function" ? (updater as (old: T) => T)(previous) : updater;

const toDateFilterValue = (filters: UsersFilters): UsersDateFilterValue => ({
  fecha: filters.fecha,
  rango_fecha: filters.rango_fecha.length === 2 ? filters.rango_fecha : ["", ""],
});

const toSearchFilterValue = (search: string): CompoundColumnFilterValue | undefined => {
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

const buildColumnFilters = (
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

  if (isUsersDateFilterActive(toDateFilterValue(filters))) {
    next.push({ id: "created_at", value: toDateFilterValue(filters) });
  }

  return next;
};

const visitUsersIndex = (params: {
  nombre: string;
  email: string;
  rol: string[];
  carrera: string[];
  fecha: string;
  rango_fecha: string[];
  page: number;
}) => {
  router.get(
    index.url({
      query: {
        nombre: params.nombre.trim() || undefined,
        email: params.email.trim() || undefined,
        rol: params.rol.length > 0 ? params.rol : undefined,
        carrera: params.carrera.length > 0 ? params.carrera : undefined,
        fecha: params.fecha || undefined,
        rango_fecha:
          params.rango_fecha[0] && params.rango_fecha[1]
            ? params.rango_fecha
            : undefined,
        page: params.page > 1 ? params.page : undefined,
      },
    }),
    {},
    {
      preserveState: true,
      preserveScroll: true,
      replace: true,
    },
  );
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

  const readFiltersFromColumnState = (nextColumnFilters: ColumnFiltersState) => {
    const nombreFilter = nextColumnFilters.find((filter) => filter.id === "nombre");
    const emailFilter = nextColumnFilters.find((filter) => filter.id === "email");
    const carreraFilter = nextColumnFilters.find((filter) => filter.id === "carrera");
    const rolFilter = nextColumnFilters.find((filter) => filter.id === "rol");
    const dateFilter = nextColumnFilters.find((filter) => filter.id === "created_at");

    const carrera = Array.isArray(carreraFilter?.value)
      ? (carreraFilter.value as string[])
      : [];
    const rol = Array.isArray(rolFilter?.value) ? (rolFilter.value as string[]) : [];
    const dateValue =
      dateFilter?.value && typeof dateFilter.value === "object"
        ? (dateFilter.value as UsersDateFilterValue)
        : { fecha: "", rango_fecha: ["", ""] };

    return {
      nombre: readSearchFilterValue(nombreFilter?.value),
      email: readSearchFilterValue(emailFilter?.value),
      carrera: canFilterCareer ? carrera : [],
      rol,
      fecha: dateValue.fecha ?? "",
      rango_fecha: dateValue.rango_fecha?.length === 2 ? dateValue.rango_fecha : ["", ""],
    };
  };

  const handleColumnFiltersChange = (updater: Updater<ColumnFiltersState>) => {
    const nextColumnFilters = resolveUpdater(updater, columnFilters);
    setColumnFilters(nextColumnFilters);

    const next = readFiltersFromColumnState(nextColumnFilters);
    visitUsersIndex({
      ...next,
      page: 1,
    });
  };

  const handlePaginationChange = (updater: Updater<PaginationState>) => {
    const nextPagination = resolveUpdater(updater, pagination);
    setPagination(nextPagination);

    const next = readFiltersFromColumnState(columnFilters);
    visitUsersIndex({
      ...next,
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
