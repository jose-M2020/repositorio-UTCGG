import { ChevronLeft, ChevronRight } from "lucide-react";
import type { ReactTable, RowData } from "@tanstack/react-table";
import { Button } from "@/shared/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/shared/components/ui/select";
import { cn } from "@/shared/lib";
import type { DataTableFeatures } from "./features";

type DataTablePaginationProps<TData extends RowData> = {
  table: ReactTable<DataTableFeatures, TData>;
  pageSizeOptions: readonly number[];
  hideOnSinglePage?: boolean;
};

export const DataTablePagination = <TData extends RowData>({ table, pageSizeOptions, hideOnSinglePage }: DataTablePaginationProps<TData>) => {
  const { pageIndex, pageSize } = table.state.pagination;
  const pageCount = table.getPageCount();
  const totalPages = pageCount < 0 ? null : Math.max(1, pageCount);
  const total = table.options.manualPagination ? Math.max(0, table.options.rowCount ?? 0) : table.getFilteredRowModel().rows.length;
  const currentPage = pageIndex + 1;
  const startIndex = total === 0 ? 0 : pageIndex * pageSize + 1;
  const endIndex = Math.min(total, currentPage * pageSize);

  if (hideOnSinglePage && totalPages === 1) return null;

  return (
    <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <div className="text-sm text-gray-600">
        Mostrando <span className="font-medium text-gray-900">{startIndex}</span>-<span className="font-medium text-gray-900">{endIndex}</span> de <span className="font-medium text-gray-900">{total}</span><span className="ml-1 text-gray-500">resultados</span>
      </div>
      <div className="flex flex-wrap items-center gap-2">
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-600">Filas</span>
          <Select value={String(pageSize)} onValueChange={(value) => table.setPageSize(Number(value))}>
            <SelectTrigger size="sm" className="h-8"><SelectValue /></SelectTrigger>
            <SelectContent>
              {pageSizeOptions.map((option) => <SelectItem key={option} value={String(option)}>{option}</SelectItem>)}
            </SelectContent>
          </Select>
        </div>
        <div className="flex items-center gap-2">
          <Button type="button" size="sm" variant="link" className={cn("flex items-center gap-2", !table.getCanPreviousPage() && "pointer-events-none opacity-50")} onClick={() => table.previousPage()} aria-label="Página anterior" disabled={!table.getCanPreviousPage()}>
            <ChevronLeft className="h-5 w-5" aria-hidden="true" />
          </Button>
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600">Página</span>
            {totalPages ? (
              <Select value={String(currentPage)} onValueChange={(value) => table.setPageIndex(Number(value) - 1)}>
                <SelectTrigger size="sm" className="h-8 cursor-pointer rounded-md border border-gray-300"><SelectValue /></SelectTrigger>
                <SelectContent>
                  {Array.from({ length: totalPages }, (_, index) => index + 1).map((page) => <SelectItem key={page} value={String(page)}>{page}</SelectItem>)}
                </SelectContent>
              </Select>
            ) : <span className="text-sm text-gray-600">{currentPage}</span>}
            <span className="text-sm text-gray-600">/ {totalPages ?? "—"}</span>
          </div>
          <Button type="button" size="sm" variant="link" className={cn("flex items-center gap-2", !table.getCanNextPage() && "pointer-events-none opacity-50")} onClick={() => table.nextPage()} aria-label="Página siguiente" disabled={!table.getCanNextPage()}>
            <ChevronRight className="h-5 w-5" aria-hidden="true" />
          </Button>
        </div>
      </div>
    </div>
  );
};
