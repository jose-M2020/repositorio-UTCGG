import { Pencil } from "lucide-react";
import { destroy } from "@/actions/App/Http/Controllers/CatalogController";
import { ConfirmDeleteButton } from "@/shared/components/ConfirmDeleteButton";
import { Button } from "@/shared/components/ui";
import { CatalogFormDialog } from "./CatalogFormDialog";
import { CatalogToggleActiveButton } from "./CatalogToggleActiveButton";
import type { CatalogItem, CatalogTypesMap } from "../types";

type CatalogRowActionsProps = {
  catalog: CatalogItem;
  catalogTypes: CatalogTypesMap;
};

export const CatalogRowActions = ({
  catalog,
  catalogTypes,
}: CatalogRowActionsProps) => {
  const catalogName = catalog.name.trim();

  return (
    <div className="flex justify-end gap-1">
      <CatalogFormDialog
        mode="edit"
        catalog={catalog}
        catalogTypes={catalogTypes}
        trigger={
          <Button
            type="button"
            variant="ghost"
            size="icon-sm"
            aria-label={`Editar ${catalogName}`}
          />
        }
        triggerContent={<Pencil aria-hidden="true" />}
      />
      <CatalogToggleActiveButton catalog={catalog} />
      <ConfirmDeleteButton
        form={destroy.form(catalog.id)}
        itemLabel={catalogName}
      />
    </div>
  );
};
