import { flexRender } from "@tanstack/react-table";
import type { Cell, ReactTable, Row, RowData } from "@tanstack/react-table";
import { Fragment, type ReactNode } from "react";
import { Button, Skeleton } from "@/shared/components/ui";
import { Collapsible, CollapsibleTrigger } from "@/shared/components/ui/collapsible";
import { TableBody, TableCell, TableRow } from "@/shared/components/ui/table";
import { cn } from "@/shared/lib";
import type { DataTableFeatures } from "./features";

const LOADING_ROW_COUNT = 5;

type DataTableBodyProps<TData extends RowData> = {
  table: ReactTable<DataTableFeatures, TData>;
  emptyText?: string;
  loading?: boolean;
  renderSubComponent?: (params: { row: Row<DataTableFeatures, TData> }) => ReactNode;
};

const getPinnedColumnStyle = <TData extends RowData>(
  pinned: "start" | "end" | false,
  cell: Cell<DataTableFeatures, TData, unknown>,
) => {
  if (pinned === "start") {
    return { insetInlineStart: cell.column.getStart("start") };
  }

  if (pinned === "end") {
    return { insetInlineEnd: cell.column.getAfter("end") };
  }

  return undefined;
};

const DataCells = <TData extends RowData>({ row }: { row: Row<DataTableFeatures, TData> }) =>
  row.getVisibleCells().map((cell) => {
    const { column } = cell;
    const meta = column.columnDef.meta;
    const pinned = column.getIsPinned();

    return (
      <TableCell
        key={cell.id}
        className={cn(
          "max-w-0 truncate",
          meta?.cellClassName,
          pinned
            ? cn(
                "sticky z-10 bg-white group-hover:bg-gray-50",
                pinned === "end"
                  ? "border-s border-gray-200 shadow-[-8px_0_12px_-12px_rgba(0,0,0,0.22)]"
                  : "border-e border-gray-200 shadow-[8px_0_12px_-12px_rgba(0,0,0,0.22)]",
              )
            : null,
        )}
        style={{
          ...getPinnedColumnStyle(pinned, cell),
          width: column.getSize(),
          minWidth: column.columnDef.minSize,
          maxWidth: column.columnDef.maxSize,
        }}
      >
        {flexRender(column.columnDef.cell, cell.getContext())}
      </TableCell>
    );
  });

export const DataTableBody = <TData extends RowData>({ table, emptyText, loading = false, renderSubComponent }: DataTableBodyProps<TData>) => {
  const visibleColumns = table.getVisibleLeafColumns();
  const columnCount = Math.max(1, visibleColumns.length);
  const rows = table.getRowModel().rows;
  const state = table.state;
  const pageSize = state.pagination.pageSize;
  const hasActiveFilters = state.columnFilters.length > 0 || Boolean(state.globalFilter);

  if (loading && table.options.data.length === 0) {
    return (
      <TableBody>
        {Array.from({ length: pageSize || LOADING_ROW_COUNT }, (_, rowIndex) => (
          <TableRow key={rowIndex} className="hover:bg-transparent">
            {visibleColumns.map((column) => (
              <TableCell key={column.id} className={column.columnDef.meta?.cellClassName}>
                <Skeleton className="h-5 w-full bg-gray-300" />
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    );
  }

  if (!loading && rows.length === 0) {
    return (
      <TableBody>
        <TableRow>
          <TableCell colSpan={columnCount} className="px-6 py-12 text-center text-gray-500">
            <div className="flex flex-col items-center gap-3">
              <span className="font-medium text-gray-500">{emptyText ?? "No se encontraron resultados"}</span>
              {hasActiveFilters ? (
                <Button
                  type="button"
                  variant="default"
                  size="sm"
                  onClick={() => {
                    table.resetColumnFilters();
                    table.resetGlobalFilter();
                  }}
                  aria-label="Limpiar filtros"
                >
                  Limpiar filtros
                </Button>
              ) : null}
            </div>
          </TableCell>
        </TableRow>
      </TableBody>
    );
  }

  return (
    <TableBody>
      {rows.map((row) => {
        const groupingColumn = row.groupingColumnId ? table.getColumn(row.groupingColumnId) : undefined;
        const renderGroupHeader = groupingColumn?.columnDef.meta?.renderGroupHeader;

        if (row.getIsGrouped() && renderGroupHeader && row.groupingColumnId) {
          const groupKey = String(row.getGroupingValue(row.groupingColumnId));
          const records = row.getLeafRows().map((leafRow) => leafRow.original);

          return (
            <Collapsible key={row.id} open={row.getIsExpanded()} onOpenChange={(open) => row.toggleExpanded(open)}>
              <TableRow className="border-y border-gray-200 bg-gray-50/80">
                <TableCell colSpan={columnCount} className="p-0">
                  <CollapsibleTrigger className="w-full">
                    {renderGroupHeader({ groupKey, records, isExpanded: row.getIsExpanded() })}
                  </CollapsibleTrigger>
                </TableCell>
              </TableRow>
            </Collapsible>
          );
        }

        return (
          <Fragment key={row.id}>
            <TableRow className="group hover:bg-gray-50">
              <DataCells row={row} />
            </TableRow>

            {row.getIsExpanded() && renderSubComponent ? (
              <TableRow className="hover:bg-transparent">
                <TableCell colSpan={columnCount} className="p-0">
                  {renderSubComponent({ row })}
                </TableCell>
              </TableRow>
            ) : null}
          </Fragment>
        );
      })}
    </TableBody>
  );
};
