import { useState } from "react";
import { Form } from "@inertiajs/react";
import { KeyRound, Mail } from "lucide-react";
import { sendPasswordLink } from "@/actions/App/Http/Controllers/UserController";
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

type UserSendPasswordLinkDialogProps = {
  user: UserListItem;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
};

export const UserSendPasswordLinkDialog = ({
  user,
  open: openProp,
  onOpenChange,
}: UserSendPasswordLinkDialogProps) => {
  const [uncontrolledOpen, setUncontrolledOpen] = useState(false);
  const isControlled = openProp !== undefined;
  const open = isControlled ? openProp : uncontrolledOpen;
  const userName = `${user.nombre} ${user.apellido}`.trim();
  const isActivation = user.status === "pending_activation";
  const actionLabel = isActivation
    ? "Reenviar activación"
    : "Restablecer contraseña";
  const Icon = isActivation ? Mail : KeyRound;

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
          <AlertDialogMedia className="bg-primary/10 text-primary">
            <Icon aria-hidden="true" />
          </AlertDialogMedia>
          <AlertDialogTitle className="font-normal">
            ¿{actionLabel} para{" "}
            <span className="font-semibold text-foreground">{userName}</span>?
          </AlertDialogTitle>
          <AlertDialogDescription>
            {isActivation
              ? "Se enviará un enlace al correo del usuario para que active su cuenta y elija su contraseña."
              : "Se enviará un enlace al correo del usuario para que elija una nueva contraseña. Tú no verás ni definirás la contraseña."}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          <Form {...sendPasswordLink.form(user.id)} onSuccess={handleSuccess}>
            {({ processing }) => (
              <AlertDialogAction type="submit" disabled={processing}>
                {processing ? "Enviando..." : "Enviar enlace"}
              </AlertDialogAction>
            )}
          </Form>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
