import { useState } from "react";
import { Form } from "@inertiajs/react";
import { Power, PowerOff } from "lucide-react";
import { toggleActive } from "@/actions/App/Http/Controllers/UserController";
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
} from "@/shared/components/ui";
import type { UserListItem } from "../types";

type UserToggleActiveDialogProps = {
  user: UserListItem;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
};

export const UserToggleActiveDialog = ({
  user,
  open: openProp,
  onOpenChange,
}: UserToggleActiveDialogProps) => {
  const [uncontrolledOpen, setUncontrolledOpen] = useState(false);
  const isControlled = openProp !== undefined;
  const open = isControlled ? openProp : uncontrolledOpen;
  const userName = `${user.nombre} ${user.apellido}`.trim();
  const willActivate = !user.is_active;
  const actionLabel = willActivate ? "Activar" : "Desactivar";
  const Icon = willActivate ? Power : PowerOff;

  const handleOpenChange = (nextOpen: boolean) => {
    if (!isControlled) {
      setUncontrolledOpen(nextOpen);
    }
    onOpenChange?.(nextOpen);
  };

  const handleSuccess = () => {
    handleOpenChange(false);
  };

  return (
    <AlertDialog open={open} onOpenChange={handleOpenChange}>
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
            <span className="font-semibold text-foreground">{userName}</span>?
          </AlertDialogTitle>
          <AlertDialogDescription>
            {willActivate
              ? "El usuario podrá iniciar sesión nuevamente."
              : "El usuario dejará de poder iniciar sesión. Sus sesiones activas se cerrarán."}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          <Form {...toggleActive.form(user.id)} onSuccess={handleSuccess}>
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
