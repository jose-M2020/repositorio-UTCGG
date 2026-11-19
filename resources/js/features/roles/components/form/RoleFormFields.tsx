import { FormField, InputField, fieldDescribedBy } from "@/shared/components/form";
import { Input } from "@/shared/components/ui";
import type {
    PermissionGroups,
    RoleFormErrors,
    RoleFormValues,
} from "../../types";
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
    const nameHint = nameLocked
        ? "El nombre de los roles del sistema no se puede cambiar."
        : undefined;

    return (
        <div className="flex min-h-0 flex-1 flex-col gap-4">
            {nameLocked ? (
                <FormField
                    id="name"
                    label="Nombre del rol"
                    error={errors.name}
                    hint={nameHint}
                    className="shrink-0"
                >
                    <input type="hidden" name="name" value={defaults?.name ?? ""} />
                    <Input
                        id="name"
                        readOnly
                        value={defaults?.name ?? ""}
                        aria-invalid={Boolean(errors.name) || undefined}
                        aria-describedby={fieldDescribedBy("name", {
                            error: errors.name,
                            hint: nameHint,
                        })}
                        className="max-w-md bg-muted"
                    />
                </FormField>
            ) : (
                <InputField
                    id="name"
                    name="name"
                    label="Nombre del rol"
                    required
                    defaultValue={defaults?.name}
                    error={errors.name}
                    className="max-w-md"
                    fieldClassName="shrink-0"
                />
            )}

            <RolePermissionGroups
                permissionGroups={permissionGroups}
                selected={defaults?.permissions ?? []}
                errors={errors}
            />
        </div>
    );
};
