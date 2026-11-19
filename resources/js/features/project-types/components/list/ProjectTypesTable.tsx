import type { PaginationState, Updater } from "@tanstack/react-table";
import { useEffect, useState } from "react";
import { DataTable } from "@/shared/components/dataTable";
import { resolveUpdater } from "@/shared/lib";
import { visitProjectTypesIndex } from "../../api/visitProjectTypesIndex";
import { createProjectTypesColumns } from "../../columns";
import type { PaginatedProjectTypes } from "../../types";

type ProjectTypesTableProps = {
    projectTypes: PaginatedProjectTypes;
};

export const ProjectTypesTable = ({ projectTypes }: ProjectTypesTableProps) => {
    const [pagination, setPagination] = useState<PaginationState>({
        pageIndex: Math.max(0, projectTypes.current_page - 1),
        pageSize: projectTypes.per_page,
    });

    useEffect(() => {
        setPagination({
            pageIndex: Math.max(0, projectTypes.current_page - 1),
            pageSize: projectTypes.per_page,
        });
    }, [projectTypes.current_page, projectTypes.per_page]);

    const handlePaginationChange = (updater: Updater<PaginationState>) => {
        const nextPagination = resolveUpdater(updater, pagination);
        setPagination(nextPagination);

        visitProjectTypesIndex({
            page: nextPagination.pageIndex + 1,
        });
    };

    const columns = createProjectTypesColumns();

    return (
        <DataTable
            columns={columns}
            data={projectTypes.data}
            emptyText="No hay tipos de proyecto para mostrar."
            pagination={{
                pageSizeOptions: [projectTypes.per_page],
                hideOnSinglePage: false,
            }}
            tableOptions={{
                getRowId: (row) => String(row.id),
                manualPagination: true,
                manualSorting: true,
                pageCount: projectTypes.last_page,
                rowCount: projectTypes.total,
                state: {
                    pagination,
                },
                onPaginationChange: handlePaginationChange,
            }}
        />
    );
};