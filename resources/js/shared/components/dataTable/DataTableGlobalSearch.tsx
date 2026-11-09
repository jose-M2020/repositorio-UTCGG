import { Search, X } from "lucide-react";
import type { RowData, Table } from "@tanstack/react-table";
import { Input } from "@/shared/components/ui/input";
import { cn } from "@/shared/lib";

type DataTableGlobalSearchProps<TData extends RowData> = {
  table: Table<TData>;
  placeholder?: string;
  ariaLabel?: string;
  className?: string;
};

export const DataTableGlobalSearch = <TData extends RowData>({
  table,
  placeholder = "Buscar...",
  ariaLabel = "Buscar en la tabla",
  className,
}: DataTableGlobalSearchProps<TData>) => {
  const value = String(table.getState().globalFilter ?? "");

  return (
    <div className={cn("relative", className)}>
      <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" aria-hidden="true" />
      <Input type="search" placeholder={placeholder} value={value} onChange={(event) => table.setGlobalFilter(event.target.value)} className="h-9 pl-9 pr-9" aria-label={ariaLabel} />
      {value ? (
        <button type="button" className="absolute right-2 top-1.5 inline-flex h-6 w-6 items-center justify-center rounded-md text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-primary/40" onClick={() => table.resetGlobalFilter()} aria-label="Limpiar búsqueda global">
          <X className="h-4 w-4" aria-hidden="true" />
        </button>
      ) : null}
    </div>
  );
};
