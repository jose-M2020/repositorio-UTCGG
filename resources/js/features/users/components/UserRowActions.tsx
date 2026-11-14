import { Link } from "@inertiajs/react";
import { Eye, MoreHorizontal, Pencil, Shield, Trash2 } from "lucide-react";
import { useState } from "react";
import { destroy, show } from "@/actions/App/Http/Controllers/UserController";
import { ConfirmDeleteButton } from "@/shared/components/ConfirmDeleteButton";
import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/shared/components/ui";
import { UserChangeRoleDialog } from "./UserChangeRoleDialog";
import { UserFormDialog } from "./UserFormDialog";
import type {
  CareerFormPolicy,
  RoleOption,
  RolePermissionPreview,
  UserListItem,
} from "../types";

type UserRowActionsProps = {
  user: UserListItem;
  roles: RoleOption[];
  rolePermissions: Record<string, RolePermissionPreview[]>;
  careers: Record<string, string>;
  careerPolicy: CareerFormPolicy;
};

export const UserRowActions = ({
  user,
  roles,
  rolePermissions,
  careers,
  careerPolicy,
}: UserRowActionsProps) => {
  const [editOpen, setEditOpen] = useState(false);
  const [roleOpen, setRoleOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const userName = `${user.nombre} ${user.apellido}`.trim();

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger
          render={
            <Button
              type="button"
              variant="ghost"
              size="icon-sm"
              aria-label={`Acciones de ${userName}`}
            />
          }
        >
          <MoreHorizontal aria-hidden="true" />
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="min-w-44">
          <DropdownMenuItem render={<Link href={show.url(user.id)} />}>
            <Eye aria-hidden="true" />
            Ver
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setEditOpen(true)}>
            <Pencil aria-hidden="true" />
            Editar
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setRoleOpen(true)}>
            <Shield aria-hidden="true" />
            Cambiar rol
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            variant="destructive"
            onClick={() => setDeleteOpen(true)}
          >
            <Trash2 aria-hidden="true" />
            Eliminar
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <UserFormDialog
        mode="edit"
        user={user}
        roles={roles}
        careers={careers}
        careerPolicy={careerPolicy}
        open={editOpen}
        onOpenChange={setEditOpen}
        hideTrigger
      />
      <UserChangeRoleDialog
        user={user}
        roles={roles}
        rolePermissions={rolePermissions}
        open={roleOpen}
        onOpenChange={setRoleOpen}
        hideTrigger
      />
      <ConfirmDeleteButton
        form={destroy.form(user.id)}
        itemLabel={userName}
        open={deleteOpen}
        onOpenChange={setDeleteOpen}
        hideTrigger
      />
    </>
  );
};
