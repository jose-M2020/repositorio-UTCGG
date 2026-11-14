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
  const userName = user
    ? `${user.nombre} ${user.apellido}`.trim()
    : "";

  const defaultValues: UserFormValues | undefined = user
    ? {
        id: user.id,
        nombre: user.nombre,
        apellido: user.apellido,
        email: user.email,
        carrera: user.carrera ?? "",
        rol: user.roles[0]?.name ?? null,
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
              ? <p>Actualiza los datos de <strong>{userName}</strong>.</p>
              : "Completa los datos para registrar una cuenta."}
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
                includePassword={!isEdit}
                requirePassword={!isEdit}
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
