import type { PaginationState, Updater } from "@tanstack/react-table";
import { useEffect, useState } from "react";
import { DataTable } from "@/shared/components/dataTable";
import { resolveUpdater } from "@/shared/lib";
import { visitCareersIndex } from "../api/visitCareersIndex";
import { createCareersColumns } from "../columns";
import type { PaginatedCareers } from "../types";

type CareersTableProps = {
    careers: PaginatedCareers;
};

export const CareersTable = ({ careers }: CareersTableProps) => {
    const [pagination, setPagination] = useState<PaginationState>({
        pageIndex: Math.max(0, careers.current_page - 1),
        pageSize: careers.per_page,
    });

    useEffect(() => {
        setPagination({
            pageIndex: Math.max(0, careers.current_page - 1),
            pageSize: careers.per_page,
        });
    }, [careers.current_page, careers.per_page]);

    const handlePaginationChange = (updater: Updater<PaginationState>) => {
        const nextPagination = resolveUpdater(updater, pagination);
        setPagination(nextPagination);

        visitCareersIndex({
            page: nextPagination.pageIndex + 1,
        });
    };

    const columns = createCareersColumns();

    return (
        <DataTable
            columns={columns}
            data={careers.data}
            emptyText="No hay carreras para mostrar."
            pagination={{
                pageSizeOptions: [careers.per_page],
                hideOnSinglePage: false,
            }}
            tableOptions={{
                getRowId: (row) => String(row.id),
                manualPagination: true,
                manualSorting: true,
                pageCount: careers.last_page,
                rowCount: careers.total,
                state: {
                    pagination,
                },
                onPaginationChange: handlePaginationChange,
            }}
        />
    );
};