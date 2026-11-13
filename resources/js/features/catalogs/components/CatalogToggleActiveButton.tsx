import { Form } from "@inertiajs/react";
import { Power, PowerOff } from "lucide-react";
import { toggleActive } from "@/actions/App/Http/Controllers/CatalogController";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogMedia,
  AlertDialogTitle,
  AlertDialogTrigger,
  Button,
} from "@/shared/components/ui";
import type { CatalogItem } from "../types";

type CatalogToggleActiveButtonProps = {
  catalog: CatalogItem;
};

export const CatalogToggleActiveButton = ({
  catalog,
}: CatalogToggleActiveButtonProps) => {
  const catalogName = catalog.name.trim();
  const willActivate = !catalog.is_active;
  const actionLabel = willActivate ? "Activar" : "Desactivar";
  const Icon = willActivate ? Power : PowerOff;

  return (
    <AlertDialog>
      <AlertDialogTrigger
        render={
          <Button
            type="button"
            variant="ghost"
            size="icon-sm"
            aria-label={`${actionLabel} ${catalogName}`}
          />
        }
      >
        <Icon aria-hidden="true" />
      </AlertDialogTrigger>

      <AlertDialogContent size="sm">
        <AlertDialogHeader>
          <AlertDialogMedia
            className={
              willActivate
                ? "bg-emerald-500/10 text-emerald-700 dark:text-emerald-400"
                : "bg-amber-500/10 text-amber-700 dark:text-amber-400"
            }
          >
            <Icon aria-hidden="true" />
          </AlertDialogMedia>
          <AlertDialogTitle className="font-normal">
            ¿{actionLabel}{" "}
            <span className="font-semibold text-foreground">{catalogName}</span>?
          </AlertDialogTitle>
          <AlertDialogDescription>
            {willActivate
              ? "El catalogo quedara disponible para su uso en el sistema."
              : "El catalogo dejara de estar disponible para nuevas asignaciones."}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          <Form {...toggleActive.form(catalog.id)}>
            {({ processing }) => (
              <AlertDialogAction type="submit" disabled={processing}>
                {processing ? "Guardando..." : actionLabel}
              </AlertDialogAction>
            )}
          </Form>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
