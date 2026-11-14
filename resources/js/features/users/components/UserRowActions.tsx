import { Link, usePage } from "@inertiajs/react";
import {
  Eye,
  MoreHorizontal,
  Pencil,
  Power,
  PowerOff,
  Shield,
  Trash2,
} from "lucide-react";
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
import { UserToggleActiveDialog } from "./UserToggleActiveDialog";
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
  const { auth } = usePage().props;
  const [editOpen, setEditOpen] = useState(false);
  const [roleOpen, setRoleOpen] = useState(false);
  const [toggleActiveOpen, setToggleActiveOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const userName = `${user.nombre} ${user.apellido}`.trim();
  const willActivate = !user.is_active;
  const ToggleIcon = willActivate ? Power : PowerOff;
  const isSelf = auth.user?.id === user.id;

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
          <DropdownMenuItem
            disabled={isSelf}
            onClick={() => {
              if (isSelf) return;
              setToggleActiveOpen(true);
            }}
          >
            <ToggleIcon aria-hidden="true" />
            {willActivate ? "Activar" : "Desactivar"}
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
      <UserToggleActiveDialog
        user={user}
        open={toggleActiveOpen}
        onOpenChange={setToggleActiveOpen}
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
