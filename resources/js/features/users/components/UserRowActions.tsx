import { Link } from "@inertiajs/react";
import { Eye, Pencil } from "lucide-react";
import { destroy, show } from "@/actions/App/Http/Controllers/UserController";
import { ConfirmDeleteButton } from "@/shared/components/ConfirmDeleteButton";
import { Button } from "@/shared/components/ui";
import { UserFormDialog } from "./UserFormDialog";
import type { CareerFormPolicy, RoleOption, UserListItem } from "../types";

type UserRowActionsProps = {
  user: UserListItem;
  roles: RoleOption[];
  careers: Record<string, string>;
  careerPolicy: CareerFormPolicy;
};

export const UserRowActions = ({
  user,
  roles,
  careers,
  careerPolicy,
}: UserRowActionsProps) => {
  const userName = `${user.nombre} ${user.apellido}`.trim();

  return (
    <div className="flex justify-end gap-1">
      <Link href={show.url(user.id)}>
        <Button
          type="button"
          variant="ghost"
          size="icon-sm"
          aria-label={`Ver ${userName}`}
        >
          <Eye aria-hidden="true" />
        </Button>
      </Link>
      <UserFormDialog
        mode="edit"
        user={user}
        roles={roles}
        careers={careers}
        careerPolicy={careerPolicy}
        trigger={
          <Button
            type="button"
            variant="ghost"
            size="icon-sm"
            aria-label={`Editar ${userName}`}
          />
        }
        triggerContent={<Pencil aria-hidden="true" />}
      />
      <ConfirmDeleteButton
        form={destroy.form(user.id)}
        itemLabel={userName}
      />
    </div>
  );
};
