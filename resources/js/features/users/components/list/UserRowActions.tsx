import { Link, usePage } from "@inertiajs/react";
import {
  Eye,
  KeyRound,
  Mail,
  MoreHorizontal,
  Pencil,
  Power,
  PowerOff,
  Shield,
  Trash2,
} from "lucide-react";
import { useState } from "react";
import { destroy, show } from "@/actions/App/Http/Controllers/UserController";
import { AUTH_ABILITIES } from "@/features/auth";
import { ConfirmDeleteButton } from "@/shared/components/ConfirmDeleteButton";
import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/shared/components/ui";
import { UserChangeRoleDialog } from "../actions/UserChangeRoleDialog";
import { UserFormDialog } from "../form/UserFormDialog";
import { UserSendPasswordLinkDialog } from "../actions/UserSendPasswordLinkDialog";
import { UserToggleActiveDialog } from "../actions/UserToggleActiveDialog";
import type {
  CareerFormPolicy,
  CareerOption,
  RoleOption,
  RolePermissionPreview,
  UserListItem,
  UserTypeOption,
} from "../../types";
import { formatUserName } from "../../utils/formatUserName";

type UserRowActionsProps = {
  user: UserListItem;
  roles: RoleOption[];
  rolePermissions: Record<string, RolePermissionPreview[]>;
  careers: CareerOption[];
  careerPolicy: CareerFormPolicy;
  userTypes?: UserTypeOption[];
};

export const UserRowActions = ({
  user,
  roles,
  rolePermissions,
  careers,
  careerPolicy,
  userTypes = [],
}: UserRowActionsProps) => {
  const { auth } = usePage().props;
  const [editOpen, setEditOpen] = useState(false);
  const [roleOpen, setRoleOpen] = useState(false);
  const [toggleActiveOpen, setToggleActiveOpen] = useState(false);
  const [passwordLinkOpen, setPasswordLinkOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const userName = formatUserName(user);
  const isSelf = auth.user?.id === user.id;
  const isPending = user.status === "pending_activation";
  const willActivate = user.status === "inactive";
  const canEdit = auth.abilities[AUTH_ABILITIES.USERS_EDIT];
  const canUpdateRole = auth.abilities[AUTH_ABILITIES.USERS_UPDATE_ROLE];
  const canToggleActiveAbility = auth.abilities[AUTH_ABILITIES.USERS_TOGGLE_ACTIVE];
  const canPasswordLink = auth.abilities[AUTH_ABILITIES.USERS_PASSWORD_LINK];
  const canDestroy = auth.abilities[AUTH_ABILITIES.USERS_DESTROY];
  const canToggleActiveStatus = user.status === "active" || user.status === "inactive";
  const canToggleActive = canToggleActiveAbility && canToggleActiveStatus;
  const ToggleIcon = willActivate ? Power : PowerOff;
  const PasswordIcon = isPending ? Mail : KeyRound;
  const passwordActionLabel = isPending
    ? "Reenviar activación"
    : "Restablecer contraseña";
  const showDestructiveSeparator =
    (canEdit || canUpdateRole || canToggleActive || canPasswordLink) &&
    canDestroy;

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
        <DropdownMenuContent align="end" className="min-w-48">
          <DropdownMenuItem render={<Link href={show.url(user.id)} />}>
            <Eye aria-hidden="true" />
            Ver
          </DropdownMenuItem>
          {canEdit ? (
            <DropdownMenuItem onClick={() => setEditOpen(true)}>
              <Pencil aria-hidden="true" />
              Editar
            </DropdownMenuItem>
          ) : null}
          {canUpdateRole ? (
            <DropdownMenuItem onClick={() => setRoleOpen(true)}>
              <Shield aria-hidden="true" />
              Cambiar rol
            </DropdownMenuItem>
          ) : null}
          {canToggleActive ? (
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
          ) : null}
          {canPasswordLink ? (
            <DropdownMenuItem
              disabled={isSelf}
              onClick={() => {
                if (isSelf) return;
                setPasswordLinkOpen(true);
              }}
            >
              <PasswordIcon aria-hidden="true" />
              {passwordActionLabel}
            </DropdownMenuItem>
          ) : null}
          {showDestructiveSeparator ? <DropdownMenuSeparator /> : null}
          {canDestroy ? (
            <DropdownMenuItem
              variant="destructive"
              onClick={() => setDeleteOpen(true)}
            >
              <Trash2 aria-hidden="true" />
              Eliminar
            </DropdownMenuItem>
          ) : null}
        </DropdownMenuContent>
      </DropdownMenu>

      {canEdit ? (
        <UserFormDialog
          mode="edit"
          user={user}
          roles={roles}
          careers={careers}
          careerPolicy={careerPolicy}
          userTypes={userTypes}
          open={editOpen}
          onOpenChange={setEditOpen}
          hideTrigger
        />
      ) : null}
      {canUpdateRole ? (
        <UserChangeRoleDialog
          user={user}
          roles={roles}
          rolePermissions={rolePermissions}
          open={roleOpen}
          onOpenChange={setRoleOpen}
          hideTrigger
        />
      ) : null}
      {canToggleActive ? (
        <UserToggleActiveDialog
          user={user}
          open={toggleActiveOpen}
          onOpenChange={setToggleActiveOpen}
        />
      ) : null}
      {canPasswordLink ? (
        <UserSendPasswordLinkDialog
          user={user}
          open={passwordLinkOpen}
          onOpenChange={setPasswordLinkOpen}
        />
      ) : null}
      {canDestroy ? (
        <ConfirmDeleteButton
          form={destroy.form(user.id)}
          itemLabel={userName}
          open={deleteOpen}
          onOpenChange={setDeleteOpen}
          hideTrigger
        />
      ) : null}
    </>
  );
};
