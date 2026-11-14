import { useState, type ReactElement, type ReactNode } from "react";
import { Form } from "@inertiajs/react";
import { store, update } from "@/actions/App/Http/Controllers/UserController";
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
import { UserFormFields } from "./UserFormFields";
import type {
  CareerFormPolicy,
  RoleOption,
  UserFormValues,
  UserListItem,
} from "../types";
import { formatUserName } from "../utils/formatUserName";

type UserFormDialogBaseProps = {
  roles: RoleOption[];
  careers: Record<string, string>;
  careerPolicy: CareerFormPolicy;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  /** When true, caller owns the trigger (e.g. overflow menu item). */
  hideTrigger?: boolean;
  trigger?: ReactElement;
  triggerContent?: ReactNode;
};

type UserFormDialogProps = UserFormDialogBaseProps &
  (
    | { mode: "create" }
    | { mode: "edit"; user: UserListItem }
  );

export const UserFormDialog = (props: UserFormDialogProps) => {
  const {
    roles,
    careers,
    careerPolicy,
    trigger,
    triggerContent,
    mode,
    open: openProp,
    onOpenChange,
    hideTrigger = false,
  } = props;
  const [uncontrolledOpen, setUncontrolledOpen] = useState(false);
  const isControlled = openProp !== undefined;
  const open = isControlled ? openProp : uncontrolledOpen;
  const isEdit = mode === "edit";
  const user = isEdit ? props.user : null;
  const userName = user ? formatUserName(user) : "";

  const defaultValues: UserFormValues | undefined = user
    ? {
        id: user.id,
        first_name: user.first_name,
        last_name: user.last_name,
        second_last_name: user.second_last_name ?? "",
        email: user.email,
        career: user.career ?? "",
        role: user.roles[0]?.name ?? null,
      }
    : undefined;

  const formProps = isEdit && user ? update.form(user.id) : store.form();

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
    <Dialog open={open} onOpenChange={handleOpenChange}>
      {!hideTrigger && trigger ? (
        <DialogTrigger render={trigger}>{triggerContent}</DialogTrigger>
      ) : null}

      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>
            {isEdit ? "Editar usuario" : "Nuevo usuario"}
          </DialogTitle>
          <DialogDescription>
            {isEdit
              ? `Actualiza los datos de ${userName}. El rol se cambia en una acción aparte.`
              : "Registra nombre, correo y rol. El usuario recibirá un enlace para activar la cuenta y elegir su contraseña."}
          </DialogDescription>
        </DialogHeader>

        <Form
          {...formProps}
          className="space-y-6"
          onSuccess={handleSuccess}
        >
          {({ errors, processing }) => (
            <>
              <UserFormFields
                errors={errors}
                roles={roles}
                careers={careers}
                careerPolicy={careerPolicy}
                defaults={defaultValues}
                includeRole={!isEdit}
                includePassword={false}
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
                      : "Registrar"}
                </Button>
              </DialogFooter>
            </>
          )}
        </Form>
      </DialogContent>
    </Dialog>
  );
};
