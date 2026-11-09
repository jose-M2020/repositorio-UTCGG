import { ChevronDown, ChevronRight } from "lucide-react";
import type { ColumnDef, RowData } from "@tanstack/react-table";
import { cn } from "@/shared/lib";
import type { DataTableFeatures } from "./features";

type CreateExpandColumnOptions = {
  id?: string;
  size?: number;
  cellClassName?: string;
};

export const createExpandColumn = <TData extends RowData>({
  id = "expand",
  size = 44,
  cellClassName,
}: CreateExpandColumnOptions = {}): ColumnDef<DataTableFeatures, TData, unknown> => ({
  id,
  size,
  enableSorting: false,
  enableHiding: false,
  header: "",
  meta: {
    headerClassName: "w-11",
    cellClassName: cn("w-11 p-1 text-center", cellClassName),
  },
  cell: ({ row }) => {
    if (!row.getCanExpand()) {
      return null;
    }

    const isExpanded = row.getIsExpanded();

    return (
      <button
        type="button"
        className="inline-flex size-8 items-center justify-center rounded-md text-gray-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-primary/40"
        onClick={row.getToggleExpandedHandler()}
        aria-expanded={isExpanded}
        aria-label={isExpanded ? "Contraer fila" : "Expandir fila"}
      >
        {isExpanded ? <ChevronDown className="h-4 w-4" aria-hidden="true" /> : <ChevronRight className="h-4 w-4" aria-hidden="true" />}
      </button>
    );
  },
});
