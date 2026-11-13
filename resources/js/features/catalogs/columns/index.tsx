import { Form, Link } from "@inertiajs/react";
import { Eye, Pencil, Trash2 } from "lucide-react";
import {
  destroy,
  edit,
  show,
} from "@/actions/App/Http/Controllers/CatalogController";
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
    cell: ({ getValue }) => getValue(),
  }),
  columnHelper.accessor("name", {
    header: "Nombre",
    cell: ({ getValue }) => getValue(),
  }),
  columnHelper.accessor("is_active", {
    header: "Estado",
    cell: ({ getValue }) => (getValue() ? "Activo" : "Inactivo"),
  }),
  columnHelper.display({
    id: "actions",
    header: "",
    meta: {
      headerClassName: "w-28 text-right",
      cellClassName: "text-right",
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
          <Form {...destroy.form(catalog.id)}>
            {({ processing }) => (
              <Button
                type="submit"
                variant="ghost"
                size="icon-sm"
                className="text-destructive hover:bg-destructive/10 hover:text-destructive"
                disabled={processing}
                aria-label={`Eliminar ${catalogName}`}
              >
                <Trash2 aria-hidden="true" />
              </Button>
            )}
          </Form>
        </div>
      );
    },
  }),
];
