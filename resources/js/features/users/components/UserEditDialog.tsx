import { Form } from "@inertiajs/react";
import { Pencil } from "lucide-react";
import { update } from "@/actions/App/Http/Controllers/UserController";
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

type UserEditDialogProps = {
  user: UserListItem;
  roles: RoleOption[];
  careers: Record<string, string>;
  careerPolicy: CareerFormPolicy;
};

export const UserEditDialog = ({
  user,
  roles,
  careers,
  careerPolicy,
}: UserEditDialogProps) => {
  const userName = `${user.nombre} ${user.apellido}`.trim();
  const defaultValues: UserFormValues = {
    id: user.id,
    nombre: user.nombre,
    apellido: user.apellido,
    email: user.email,
    carrera: user.carrera ?? "",
    rol: user.roles[0]?.name ?? null,
  };

  return (
    <Dialog>
      <DialogTrigger
        render={
          <Button
            type="button"
            variant="ghost"
            size="icon-sm"
            aria-label={`Editar ${userName}`}
          />
        }
      >
        <Pencil aria-hidden="true" />
      </DialogTrigger>

      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Editar usuario</DialogTitle>
          <DialogDescription>
            Actualiza los datos de {userName}.
          </DialogDescription>
        </DialogHeader>

        <Form
          {...update.form(user.id)}
          className="space-y-6"
        >
          {({ errors, processing }) => (
            <>
              <UserFormFields
                errors={errors}
                roles={roles}
                careers={careers}
                careerPolicy={careerPolicy}
                defaults={defaultValues}
                requirePassword={false}
              />
              <DialogFooter>
                <DialogClose
                  render={
                    <Button type="button" variant="outline">
                      Cancelar
                    </Button>
                  }
                />
                <Button type="submit" disabled={processing}>
                  {processing ? "Guardando..." : "Actualizar"}
                </Button>
              </DialogFooter>
            </>
          )}
        </Form>
      </DialogContent>
    </Dialog>
  );
};
