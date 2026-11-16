import type { PaginationState, Updater } from "@tanstack/react-table";
import { useEffect, useState } from "react";
import { DataTable } from "@/shared/components/dataTable";
import { resolveUpdater } from "@/shared/lib";
import { visitEducationLevelsIndex } from "../api/visitEducationLevelsIndex";
import { createEducationLevelsColumns } from "../columns";
import type { PaginatedEducationLevels } from "../types";

type EducationLevelsTableProps = {
    educationLevels: PaginatedEducationLevels;
};

export const EducationLevelsTable = ({
    educationLevels,
}: EducationLevelsTableProps) => {
    const [pagination, setPagination] = useState<PaginationState>({
        pageIndex: Math.max(0, educationLevels.current_page - 1),
        pageSize: educationLevels.per_page,
    });

    useEffect(() => {
        setPagination({
            pageIndex: Math.max(0, educationLevels.current_page - 1),
            pageSize: educationLevels.per_page,
        });
    }, [educationLevels.current_page, educationLevels.per_page]);

    const handlePaginationChange = (updater: Updater<PaginationState>) => {
        const nextPagination = resolveUpdater(updater, pagination);
        setPagination(nextPagination);

        visitEducationLevelsIndex({
            page: nextPagination.pageIndex + 1,
        });
    };

    const columns = createEducationLevelsColumns();

    return (
        <DataTable
            columns={columns}
            data={educationLevels.data}
            emptyText="No hay niveles educativos para mostrar."
            pagination={{
                pageSizeOptions: [educationLevels.per_page],
                hideOnSinglePage: false,
            }}
            tableOptions={{
                getRowId: (row) => String(row.id),
                manualPagination: true,
                manualSorting: true,
                pageCount: educationLevels.last_page,
                rowCount: educationLevels.total,
                state: {
                    pagination,
                },
                onPaginationChange: handlePaginationChange,
            }}
        />
    );
};