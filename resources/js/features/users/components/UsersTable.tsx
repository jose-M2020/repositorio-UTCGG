import { router } from "@inertiajs/react";
import type { ColumnFiltersState, PaginationState, Updater } from "@tanstack/react-table";
import { useEffect, useState } from "react";
import { index } from "@/actions/App/Http/Controllers/UserController";
import { DataTable, DataTableGlobalSearch } from "@/shared/components/dataTable";
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

const buildColumnFilters = (filters: UsersFilters, canFilterCareer: boolean): ColumnFiltersState => {
  const next: ColumnFiltersState = [];

  if (canFilterCareer && filters.carrera.length > 0) {
    next.push({ id: "carrera", value: filters.carrera });
  }

  if (filters.rol && filters.rol !== "all") {
    next.push({ id: "rol", value: [filters.rol] });
  }

  if (isUsersDateFilterActive(toDateFilterValue(filters))) {
    next.push({ id: "created_at", value: toDateFilterValue(filters) });
  }

  return next;
};

const visitUsersIndex = (params: {
  query: string;
  rol: string;
  carrera: string[];
  fecha: string;
  rango_fecha: string[];
  page: number;
}) => {
  router.get(
    index.url({
      query: {
        query: params.query || undefined,
        rol: params.rol && params.rol !== "all" ? params.rol : undefined,
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
  const [globalFilter, setGlobalFilter] = useState(filters.query);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>(() =>
    buildColumnFilters(filters, canFilterCareer),
  );
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: Math.max(0, users.current_page - 1),
    pageSize: users.per_page,
  });

  useEffect(() => {
    setGlobalFilter(filters.query);
    setColumnFilters(buildColumnFilters(filters, canFilterCareer));
    setPagination({
      pageIndex: Math.max(0, users.current_page - 1),
      pageSize: users.per_page,
    });
  }, [filters, users.current_page, users.per_page, canFilterCareer]);

  useEffect(() => {
    if (globalFilter === filters.query) return;

    const timeoutId = window.setTimeout(() => {
      visitUsersIndex({
        query: globalFilter,
        rol: filters.rol,
        carrera: filters.carrera,
        fecha: filters.fecha,
        rango_fecha: filters.rango_fecha,
        page: 1,
      });
    }, 350);

    return () => window.clearTimeout(timeoutId);
  }, [globalFilter, filters]);

  const readFiltersFromColumnState = (nextColumnFilters: ColumnFiltersState) => {
    const carreraFilter = nextColumnFilters.find((filter) => filter.id === "carrera");
    const rolFilter = nextColumnFilters.find((filter) => filter.id === "rol");
    const dateFilter = nextColumnFilters.find((filter) => filter.id === "created_at");

    const carrera = Array.isArray(carreraFilter?.value)
      ? (carreraFilter.value as string[])
      : [];
    const rolValues = Array.isArray(rolFilter?.value) ? (rolFilter.value as string[]) : [];
    const dateValue =
      dateFilter?.value && typeof dateFilter.value === "object"
        ? (dateFilter.value as UsersDateFilterValue)
        : { fecha: "", rango_fecha: ["", ""] };

    return {
      carrera: canFilterCareer ? carrera : [],
      rol: rolValues[0] ?? "all",
      fecha: dateValue.fecha ?? "",
      rango_fecha: dateValue.rango_fecha?.length === 2 ? dateValue.rango_fecha : ["", ""],
    };
  };

  const handleColumnFiltersChange = (updater: Updater<ColumnFiltersState>) => {
    const nextColumnFilters = resolveUpdater(updater, columnFilters);
    setColumnFilters(nextColumnFilters);

    const next = readFiltersFromColumnState(nextColumnFilters);
    visitUsersIndex({
      query: globalFilter,
      ...next,
      page: 1,
    });
  };

  const handlePaginationChange = (updater: Updater<PaginationState>) => {
    const nextPagination = resolveUpdater(updater, pagination);
    setPagination(nextPagination);

    const next = readFiltersFromColumnState(columnFilters);
    visitUsersIndex({
      query: globalFilter,
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
      toolbar={(table) => (
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
          <DataTableGlobalSearch
            table={table}
            placeholder="Buscar usuario..."
            ariaLabel="Buscar usuarios"
            className="w-full max-w-sm"
          />
          {!canFilterCareer && careerPolicy.locked_career_label ? (
            <p className="text-sm text-muted-foreground">
              Carrera:{" "}
              <span className="font-medium text-foreground">{careerPolicy.locked_career_label}</span>
            </p>
          ) : null}
        </div>
      )}
      tableOptions={{
        getRowId: (row) => String(row.id),
        manualFiltering: true,
        manualPagination: true,
        manualSorting: true,
        pageCount: users.last_page,
        rowCount: users.total,
        state: {
          globalFilter,
          columnFilters,
          pagination,
        },
        onGlobalFilterChange: setGlobalFilter,
        onColumnFiltersChange: handleColumnFiltersChange,
        onPaginationChange: handlePaginationChange,
      }}
    />
  );
};
