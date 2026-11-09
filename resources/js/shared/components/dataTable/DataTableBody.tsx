import { flexRender, type Row, type RowData, type Table } from "@tanstack/react-table";
import { Fragment, type ReactNode } from "react";
import { 
  Collapsible, 
  CollapsibleTrigger,
  Button,
  Skeleton,
} from "@/shared/components/ui";
import { TableBody, TableCell, TableRow } from "@/shared/components/ui/table";
import { cn } from "@/shared/lib";

const LOADING_ROW_COUNT = 5;

type DataTableBodyProps<TData extends RowData> = {
  table: Table<TData>;
  emptyText?: string;
  loading?: boolean;
  renderSubComponent?: (params: { row: Row<TData> }) => ReactNode;
};

const DataCells = <TData extends RowData>({ row }: { row: Row<TData> }) =>
  row.getVisibleCells().map((cell) => {
    const { column } = cell;
    const meta = column.columnDef.meta;
    const pinned = column.getIsPinned();

    return (
      <TableCell
        key={cell.id}
        className={cn(
          meta?.cellClassName,
          pinned
            ? cn(
                "sticky z-10 bg-white group-hover:bg-gray-50",
                pinned === "right" ? "right-0 border-l border-gray-200 shadow-[-8px_0_12px_-12px_rgba(0,0,0,0.22)]" : "left-0 border-r border-gray-200 shadow-[8px_0_12px_-12px_rgba(0,0,0,0.22)]",
              )
            : null,
        )}
        style={pinned === "left" ? { left: column.getStart("left") } : pinned === "right" ? { right: column.getAfter("right") } : undefined}
      >
        {flexRender(column.columnDef.cell, cell.getContext())}
      </TableCell>
    );
  });

export const DataTableBody = <TData extends RowData>({ table, emptyText, loading = false, renderSubComponent }: DataTableBodyProps<TData>) => {
  const visibleColumns = table.getVisibleLeafColumns();
  const columnCount = Math.max(1, visibleColumns.length);
  const rows = table.getRowModel().rows;
  const pageSize = table.getState().pagination.pageSize;
  const hasActiveFilters = table.getState().columnFilters.length > 0 || Boolean(table.getState().globalFilter);

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
              <span className="text- font-medium text-gray-500">{emptyText ?? "No se encontraron resultados"}</span>
              {hasActiveFilters ? (
                <Button type="button" variant="default" size="sm" onClick={() => { table.resetColumnFilters(); table.resetGlobalFilter(); }} aria-label="Limpiar filtros">
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
            <Collapsible key={row.id} open={row.getIsExpanded()} onOpenChange={(open) => row.toggleExpanded(open)} asChild>
              <TableRow className="border-y border-gray-200 bg-gray-50/80">
                <TableCell colSpan={columnCount} className="p-0">
                  <CollapsibleTrigger>
                    <button type="button" className="w-full">
                      {renderGroupHeader({ groupKey, records, isExpanded: row.getIsExpanded() })}
                    </button>
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
