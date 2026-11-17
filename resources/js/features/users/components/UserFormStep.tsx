import { Form } from "@inertiajs/react";
import { ArrowLeft } from "lucide-react";
import { store, update } from "@/actions/App/Http/Controllers/UserController";
import {
  Button,
  DialogClose,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/shared/components/ui";
import type {
  CareerFormPolicy,
  CareerOption,
  RoleOption,
  UserListItem,
  UserTypeOption,
} from "../types";
import { formatUserName } from "../utils/formatUserName";
import {
  defaultRoleForType,
  rolesForUserType,
} from "../utils/userTypeDefaults";
import { UserFormFields } from "./UserFormFields";

type UserFormStepProps = {
  mode: "create" | "edit";
  user?: UserListItem | null;
  roles: RoleOption[];
  careers: CareerOption[];
  careerPolicy: CareerFormPolicy;
  userTypes: UserTypeOption[];
  selectedUserType?: string;
  onBackToTypeStep?: () => void;
  onSuccess: () => void;
};

export const UserFormStep = ({
  mode,
  user = null,
  roles,
  careers,
  careerPolicy,
  userTypes,
  selectedUserType = "",
  onBackToTypeStep,
  onSuccess,
}: UserFormStepProps) => {
  const isEdit = mode === "edit";
  const userName = user ? formatUserName(user) : "";
  const selectedTypeLabel =
    userTypes.find((type) => type.value === selectedUserType)?.label ??
    selectedUserType;

  const defaultValues = user
    ? {
        id: user.id,
        first_name: user.first_name,
        last_name: user.last_name,
        second_last_name: user.second_last_name ?? "",
        email: user.email,
        career: user.career?.split(",")[0]?.trim() ?? "",
        career_ids: user.career_ids ?? [],
        role: user.roles[0]?.name ?? null,
        user_type: user.user_type ?? null,
      }
    : {
        user_type: selectedUserType,
        role: defaultRoleForType(selectedUserType) || null,
        career_ids: [] as number[],
      };

  const formProps = isEdit && user ? update.form(user.id) : store.form();
  const formRoles = isEdit
    ? roles
    : rolesForUserType(roles, selectedUserType);

  return (
    <>
      <DialogHeader className="shrink-0 gap-1.5 border-b border-border px-6 py-5 pr-14">
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
        key={isEdit ? `edit-${user?.id}` : `create-${selectedUserType}`}
        className="flex min-h-0 flex-1 flex-col"
        onSuccess={onSuccess}
      >
        {({ errors, processing }) => (
          <>
            <div className="min-h-0 flex-1 space-y-6 overflow-y-auto px-6 py-5">
              {!isEdit && selectedUserType && onBackToTypeStep ? (
                <div className="flex flex-wrap items-center justify-between gap-2 rounded-lg border border-border bg-muted/40 px-3 py-2">
                  <p className="text-sm text-muted-foreground">
                    Tipo:{" "}
                    <span className="font-medium text-foreground">
                      {selectedTypeLabel}
                    </span>
                  </p>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={onBackToTypeStep}
                  >
                    <ArrowLeft className="size-4" aria-hidden="true" />
                    Cambiar
                  </Button>
                </div>
              ) : null}

              <UserFormFields
                errors={errors}
                roles={formRoles}
                careers={careers}
                careerPolicy={careerPolicy}
                userTypes={userTypes}
                defaults={defaultValues}
                includeRole={!isEdit}
                userTypeReadOnly={isEdit}
                showUserTypeField={isEdit}
              />
            </div>

            <DialogFooter className="m-0 shrink-0 rounded-none border-t border-border px-6 py-4">
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
    </>
  );
};
