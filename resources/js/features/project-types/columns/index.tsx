import { createDataTableColumnHelper } from "@/shared/components/dataTable";
import { ProjectTypeRowActions } from "../components/ProjectTypeRowActions";
import { ProjectTypeStatusBadge } from "../components/ProjectTypeStatusBadge";
import type { ProjectTypeItem } from "../types";

const columnHelper = createDataTableColumnHelper<ProjectTypeItem>();

export const createProjectTypesColumns = () => [
    columnHelper.accessor("code", {
        header: "Codigo",
        size: 110,
        minSize: 88,
        cell: ({ getValue }) => getValue(),
    }),
    columnHelper.accessor("name", {
        header: "Nombre",
        size: 280,
        minSize: 180,
        cell: ({ getValue }) => getValue(),
    }),
    columnHelper.accessor("sort_order", {
        header: "Orden",
        size: 88,
        minSize: 72,
        cell: ({ getValue }) => getValue(),
    }),
    columnHelper.accessor("is_active", {
        header: "Estado",
        size: 110,
        minSize: 96,
        cell: ({ getValue }) => <ProjectTypeStatusBadge isActive={getValue()} />,
    }),
    columnHelper.display({
        id: "actions",
        header: "",
        size: 120,
        minSize: 120,
        maxSize: 120,
        meta: {
            headerClassName: "text-right",
            cellClassName: "max-w-none overflow-visible text-right",
        },
        cell: ({ row }) => <ProjectTypeRowActions projectType={row.original} />,
    }),
];