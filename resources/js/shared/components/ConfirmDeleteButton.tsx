import type { ComponentProps } from "react";
import { Form } from "@inertiajs/react";
import { Trash2 } from "lucide-react";
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
} from "@/shared/components/ui/alert-dialog";
import { Button } from "@/shared/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/shared/components/ui/tooltip";

type ConfirmDeleteButtonProps = {
  form: Omit<ComponentProps<typeof Form>, "children">;
  itemLabel: string;
  disabledReason?: string;
  /** When set, renders a labeled button instead of an icon-only trigger. */
  triggerLabel?: string;
  triggerVariant?: ComponentProps<typeof Button>["variant"];
  triggerSize?: ComponentProps<typeof Button>["size"];
};

export const ConfirmDeleteButton = ({
  form,
  itemLabel,
  disabledReason,
  triggerLabel,
  triggerVariant = triggerLabel ? "destructive" : "ghost",
  triggerSize = triggerLabel ? "default" : "icon-sm",
}: ConfirmDeleteButtonProps) => {
  const ariaLabel = `Eliminar ${itemLabel}`;

  if (disabledReason) {
    return (
      <Tooltip>
        <TooltipTrigger
          render={
            <span className="inline-flex">
              <Button
                type="button"
                variant={triggerVariant}
                size={triggerSize}
                className={
                  triggerLabel
                    ? undefined
                    : "text-destructive"
                }
                disabled
                aria-label={`No se puede eliminar ${itemLabel}. ${disabledReason}`}
              >
                {triggerLabel ? (
                  triggerLabel
                ) : (
                  <Trash2 aria-hidden="true" />
                )}
              </Button>
            </span>
          }
        />
        <TooltipContent>{disabledReason}</TooltipContent>
      </Tooltip>
    );
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger
        render={
          <Button
            type="button"
            variant={triggerVariant}
            size={triggerSize}
            className={
              triggerLabel
                ? undefined
                : "text-destructive hover:bg-destructive/10 hover:text-destructive"
            }
            aria-label={ariaLabel}
          />
        }
      >
        {triggerLabel ? triggerLabel : <Trash2 aria-hidden="true" />}
      </AlertDialogTrigger>
      <AlertDialogContent size="sm">
        <AlertDialogHeader>
          <AlertDialogMedia className="bg-destructive/10 text-destructive">
            <Trash2 aria-hidden="true" />
          </AlertDialogMedia>
          <AlertDialogTitle>¿Eliminar {itemLabel}?</AlertDialogTitle>
          <AlertDialogDescription>
            Esta acción no se puede deshacer. Se eliminará permanentemente.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          <Form {...form}>
            {({ processing }) => (
              <AlertDialogAction
                type="submit"
                variant="destructive"
                disabled={processing}
              >
                Eliminar
              </AlertDialogAction>
            )}
          </Form>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
