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
  trigger: ReactElement;
  triggerContent: ReactNode;
};

type UserFormDialogProps = UserFormDialogBaseProps &
  (
    | { mode: "create" }
    | { mode: "edit"; user: UserListItem }
  );

export const UserFormDialog = (props: UserFormDialogProps) => {
  const { roles, careers, careerPolicy, trigger, triggerContent, mode } = props;
  const [open, setOpen] = useState(false);
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

  const handleSuccess = () => {
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger render={trigger}>{triggerContent}</DialogTrigger>

      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>
            {isEdit ? "Editar usuario" : "Nuevo usuario"}
          </DialogTitle>
          <DialogDescription>
            {isEdit
              ? `Actualiza los datos de ${userName}.`
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
