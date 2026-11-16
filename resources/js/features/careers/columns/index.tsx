import { createDataTableColumnHelper } from "@/shared/components/dataTable";
import { CareerRowActions } from "../components/CareerRowActions";
import { CareerStatusBadge } from "../components/CareerStatusBadge";
import type { CareerItem } from "../types";

const columnHelper = createDataTableColumnHelper<CareerItem>();

export const createCareersColumns = () => [
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
    columnHelper.accessor("show_on_home", {
        header: "Inicio",
        size: 96,
        minSize: 80,
        cell: ({ getValue }) => (getValue() ? "Si" : "No"),
    }),
    columnHelper.accessor("is_active", {
        header: "Estado",
        size: 110,
        minSize: 96,
        cell: ({ getValue }) => <CareerStatusBadge isActive={getValue()} />,
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
        cell: ({ row }) => <CareerRowActions career={row.original} />,
    }),
];