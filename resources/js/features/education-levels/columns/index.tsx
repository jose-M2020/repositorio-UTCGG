import { createDataTableColumnHelper } from "@/shared/components/dataTable";
import { EducationLevelRowActions } from "../components/list/EducationLevelRowActions";
import { EducationLevelStatusBadge } from "../components/list/EducationLevelStatusBadge";
import type { EducationLevelItem } from "../types";

const columnHelper = createDataTableColumnHelper<EducationLevelItem>();

export const createEducationLevelsColumns = () => [
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
        cell: ({ getValue }) => <EducationLevelStatusBadge isActive={getValue()} />,
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
        cell: ({ row }) => (
            <EducationLevelRowActions educationLevel={row.original} />
        ),
    }),
];