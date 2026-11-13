import { ArrowDown, ArrowUp } from "lucide-react";
import { flexRender } from "@tanstack/react-table";
import type { Column, ReactTable, RowData } from "@tanstack/react-table";
import { TableHead, TableHeader, TableRow } from "@/shared/components/ui/table";
import { cn } from "@/shared/lib";
import type { DataTableFeatures } from "./features";
import { DataTableHeaderFilters } from "./DataTableHeaderFilters";

type DataTableHeaderProps<TData extends RowData> = {
  table: ReactTable<DataTableFeatures, TData>;
};

const getPinnedColumnStyle = <TData extends RowData>(
  pinned: "start" | "end" | false,
  column: Column<DataTableFeatures, TData, unknown>,
) => {
  if (pinned === "start") {
    return { insetInlineStart: column.getStart("start") };
  }

  if (pinned === "end") {
    return { insetInlineEnd: column.getAfter("end") };
  }

  return undefined;
};

export const DataTableHeader = <TData extends RowData>({ table }: DataTableHeaderProps<TData>) => (
  <TableHeader className="bg-gray-100">
    {table.getHeaderGroups().map((headerGroup) => (
      <TableRow key={headerGroup.id}>
        {headerGroup.headers.map((header) => {
          const { column } = header;
          const meta = column.columnDef.meta;
          const pinned = column.getIsPinned();
          const sorted = column.getIsSorted();

          return (
            <TableHead
              key={header.id}
              className={cn(
                "px-2 py-3",
                meta?.headerClassName,
                pinned
                  ? cn(
                      "sticky z-20 bg-gray-100",
                      pinned === "end"
                        ? "border-s border-gray-200 shadow-[-8px_0_12px_-12px_rgba(0,0,0,0.25)]"
                        : "border-e border-gray-200 shadow-[8px_0_12px_-12px_rgba(0,0,0,0.25)]",
                    )
                  : null,
              )}
              style={{
                ...getPinnedColumnStyle(pinned, column),
                width: header.getSize(),
                minWidth: column.columnDef.minSize,
                maxWidth: column.columnDef.maxSize,
              }}
            >
              {header.isPlaceholder ? null : (
                <div className="flex items-center gap-2">
                  <span className="truncate">
                    {flexRender(column.columnDef.header, header.getContext())}
                  </span>

                  {column.getCanSort() ? (
                    <button
                      type="button"
                      className={cn(
                        "inline-flex h-7 w-7 items-center justify-center rounded-md border border-transparent hover:bg-gray-200/60 focus:outline-none focus:ring-2 focus:ring-primary/40",
                        sorted ? "text-primary" : "text-gray-500",
                      )}
                      aria-label="Ordenar"
                      onClick={column.getToggleSortingHandler()}
                    >
                      {sorted === "asc" ? (
                        <ArrowUp className="h-4 w-4" aria-hidden="true" />
                      ) : sorted === "desc" ? (
                        <ArrowDown className="h-4 w-4" aria-hidden="true" />
                      ) : (
                        <ArrowUp className="h-4 w-4 opacity-60" aria-hidden="true" />
                      )}
                    </button>
                  ) : null}

                  <DataTableHeaderFilters table={table} column={column} />
                </div>
              )}
            </TableHead>
          );
        })}
      </TableRow>
    ))}
  </TableHeader>
);
