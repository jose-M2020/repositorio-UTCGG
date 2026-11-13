import { Link } from "@inertiajs/react";
import { Eye, Pencil } from "lucide-react";
import { destroy, edit, show } from "@/actions/App/Http/Controllers/UserController";
import { ConfirmDeleteButton } from "@/shared/components/ConfirmDeleteButton";
import { Button } from "@/shared/components/ui";
import type { UserListItem } from "../types";

type UserRowActionsProps = {
  user: UserListItem;
};

export const UserRowActions = ({ user }: UserRowActionsProps) => {
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
      <Link href={edit.url(user.id)}>
        <Button
          type="button"
          variant="ghost"
          size="icon-sm"
          aria-label={`Editar ${userName}`}
        >
          <Pencil aria-hidden="true" />
        </Button>
      </Link>
      <ConfirmDeleteButton
        form={destroy.form(user.id)}
        itemLabel={userName}
      />
    </div>
  );
};
