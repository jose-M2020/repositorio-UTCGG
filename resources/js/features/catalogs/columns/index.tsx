import { Link } from "@inertiajs/react";
import { Eye, Pencil } from "lucide-react";
import {
  destroy,
  edit,
  show,
} from "@/actions/App/Http/Controllers/CatalogController";
import { ConfirmDeleteButton } from "@/shared/components/ConfirmDeleteButton";
import { createDataTableColumnHelper } from "@/shared/components/dataTable";
import { Button } from "@/shared/components/ui";
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
    size: 100,
    minSize: 88,
    cell: ({ getValue }) => (getValue() ? "Activo" : "Inactivo"),
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
    cell: ({ row }) => {
      const catalog = row.original;
      const catalogName = catalog.name.trim();

      return (
        <div className="flex justify-end gap-1">
          <Link href={show.url(catalog.id)}>
            <Button
              type="button"
              variant="ghost"
              size="icon-sm"
              aria-label={`Ver ${catalogName}`}
            >
              <Eye aria-hidden="true" />
            </Button>
          </Link>
          <Link href={edit.url(catalog.id)}>
            <Button
              type="button"
              variant="ghost"
              size="icon-sm"
              aria-label={`Editar ${catalogName}`}
            >
              <Pencil aria-hidden="true" />
            </Button>
          </Link>
          <ConfirmDeleteButton
            form={destroy.form(catalog.id)}
            itemLabel={catalogName}
          />
        </div>
      );
    },
  }),
];
