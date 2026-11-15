import { Input } from "@/shared/components/ui";
import type {
  PermissionGroups,
  RoleFormErrors,
  RoleFormValues,
} from "../types";
import { RolePermissionGroups } from "./RolePermissionGroups";

type RoleFormFieldsProps = {
  errors: RoleFormErrors;
  permissionGroups: PermissionGroups;
  defaults?: Pick<RoleFormValues, "name" | "permissions">;
  nameLocked?: boolean;
};

export const RoleFormFields = ({
  errors,
  permissionGroups,
  defaults,
  nameLocked = false,
}: RoleFormFieldsProps) => {
  return (
    <div className="flex min-h-0 flex-1 flex-col gap-4">
      <div className="shrink-0 space-y-1 space-x-4">
        <label
          htmlFor="name"
          className="text-sm font-medium text-foreground"
        >
          Nombre del rol
        </label>
        {nameLocked ? (
          <>
            <input type="hidden" name="name" value={defaults?.name ?? ""} />
            <Input
              id="name"
              readOnly
              value={defaults?.name ?? ""}
              aria-invalid={Boolean(errors.name)}
              aria-describedby="role-name-locked-hint"
              className="max-w-md bg-muted"
            />
            <p
              id="role-name-locked-hint"
              className="text-xs text-muted-foreground"
            >
              El nombre de los roles del sistema no se puede cambiar.
            </p>
          </>
        ) : (
          <Input
            id="name"
            name="name"
            required
            defaultValue={defaults?.name}
            aria-invalid={Boolean(errors.name)}
            className="max-w-md"
          />
        )}
        {errors.name ? (
          <p className="text-sm text-destructive">{errors.name}</p>
        ) : null}
      </div>

      <RolePermissionGroups
        permissionGroups={permissionGroups}
        selected={defaults?.permissions ?? []}
        errors={errors}
      />
    </div>
  );
};
