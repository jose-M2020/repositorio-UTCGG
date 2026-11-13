import { createDataTableColumnHelper } from "@/shared/components/dataTable";
import { CatalogRowActions } from "../components/CatalogRowActions";
import { CatalogStatusBadge } from "../components/CatalogStatusBadge";
import type { CatalogItem, CatalogTypesMap } from "../types";

type CreateCatalogsColumnsOptions = {
  catalogTypes: CatalogTypesMap;
};

const columnHelper = createDataTableColumnHelper<CatalogItem>();

export const createCatalogsColumns = ({
  catalogTypes,
}: CreateCatalogsColumnsOptions) => [
  columnHelper.accessor("type", {
    header: "Tipo",
    size: 160,
    minSize: 120,
    cell: ({ getValue }) => catalogTypes[getValue()],
    enableColumnFilter: true,
    meta: {
      filter: {
        items: Object.entries(catalogTypes).map(([value, text]) => ({
          value,
          text,
        })),
      },
    },
  }),
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
  columnHelper.accessor("is_active", {
    header: "Estado",
    size: 110,
    minSize: 96,
    cell: ({ getValue }) => <CatalogStatusBadge isActive={getValue()} />,
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
      <CatalogRowActions
        catalog={row.original}
        catalogTypes={catalogTypes}
      />
    ),
  }),
];
