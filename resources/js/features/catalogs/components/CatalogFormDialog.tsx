import type { ReactElement, ReactNode } from "react";
import { Form } from "@inertiajs/react";
import { store, update } from "@/actions/App/Http/Controllers/CatalogController";
import {
  Button,
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/shared/components/ui";
import { CatalogFormFields } from "./CatalogFormFields";
import type { CatalogItem, CatalogTypesMap } from "../types";

type CatalogFormDialogBaseProps = {
  catalogTypes: CatalogTypesMap;
  trigger: ReactElement;
  triggerContent: ReactNode;
};

type CatalogFormDialogProps = CatalogFormDialogBaseProps &
  ({ mode: "create" } | { mode: "edit"; catalog: CatalogItem });

export const CatalogFormDialog = (props: CatalogFormDialogProps) => {
  const { catalogTypes, trigger, triggerContent, mode } = props;
  const isEdit = mode === "edit";
  const catalog = isEdit ? props.catalog : null;
  const formProps = isEdit && catalog ? update.form(catalog.id) : store.form();

  return (
    <Dialog>
      <DialogTrigger render={trigger}>{triggerContent}</DialogTrigger>

      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>
            {isEdit ? "Editar catalogo" : "Nuevo catalogo"}
          </DialogTitle>
          <DialogDescription>
            {isEdit
              ? `Actualiza ${catalog?.code} — ${catalog?.name}.`
              : "Crea un elemento para el catalogo del sistema."}
          </DialogDescription>
        </DialogHeader>

        <Form {...formProps} className="space-y-6">
          {({ errors, processing }) => (
            <>
              <CatalogFormFields
                errors={errors}
                catalogTypes={catalogTypes}
                defaults={catalog ?? undefined}
              />
              <DialogFooter>
                <DialogClose render={<Button type="button" variant="outline" />}>
                  Cancelar
                </DialogClose>
                <Button type="submit" disabled={processing}>
                  {processing
                    ? "Guardando..."
                    : isEdit
                      ? "Actualizar"
                      : "Guardar"}
                </Button>
              </DialogFooter>
            </>
          )}
        </Form>
      </DialogContent>
    </Dialog>
  );
};
