import { Pencil } from "lucide-react";
import { destroy } from "@/actions/App/Http/Controllers/RoleController";
import { ConfirmDeleteButton } from "@/shared/components/ConfirmDeleteButton";
import { Button } from "@/shared/components/ui";
import { RoleFormDialog } from "./RoleFormDialog";
import type { PermissionGroups, RoleListItem } from "../types";

type RoleRowActionsProps = {
  role: RoleListItem;
  permissionGroups: PermissionGroups;
};

export const RoleRowActions = ({
  role,
  permissionGroups,
}: RoleRowActionsProps) => {
  const roleName = role.name.trim();
  const disabledReason = role.can_delete
    ? undefined
    : role.users_count > 0
      ? `Asignado a ${role.users_count} usuario(s). Reasigna antes de eliminar.`
      : "Rol del sistema: no se puede eliminar.";

  return (
    <div className="flex justify-end gap-1">
      <RoleFormDialog
        mode="edit"
        role={role}
        permissionGroups={permissionGroups}
        trigger={
          <Button
            type="button"
            variant="ghost"
            size="icon-sm"
            aria-label={`Editar ${roleName}`}
          />
        }
        triggerContent={<Pencil aria-hidden="true" />}
      />
      <ConfirmDeleteButton
        form={destroy.form(role.id)}
        itemLabel={roleName}
        disabledReason={disabledReason}
      />
    </div>
  );
};
