import { usePage } from "@inertiajs/react";
import { Button } from "@/shared/components/ui";
import { UserFormDialog } from "../components/UserFormDialog";
import { UsersTable } from "../components/UsersTable";
import type {
  CareerFormPolicy,
  PaginatedUsers,
  RoleOption,
  UsersFilters,
} from "../types";

type UsersIndexContainerProps = {
  users: PaginatedUsers;
  filters: UsersFilters;
  roles: RoleOption[];
  assignableRoles: RoleOption[];
  careers: Record<string, string>;
  careerPolicy: CareerFormPolicy;
};

export const UsersIndexContainer = ({
  users,
  filters,
  roles,
  assignableRoles,
  careers,
  careerPolicy,
}: UsersIndexContainerProps) => {
  const { flash } = usePage().props;

  return (
    <main className="mx-auto w-full max-w-6xl space-y-6 px-4 py-8">
      <header className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-semibold text-primary">Usuarios</h1>
          <p className="text-sm text-muted-foreground">
            Usuarios totales: <b>{users.total}</b>
          </p>
        </div>
        <UserFormDialog
          mode="create"
          roles={assignableRoles}
          careers={careers}
          careerPolicy={careerPolicy}
          trigger={<Button type="button" />}
          triggerContent="Nuevo"
        />
      </header>

      {flash.status ? (
        <p className="rounded-lg border border-primary/20 bg-accent px-3 py-2 text-sm text-accent-foreground">
          {flash.status}
        </p>
      ) : null}

      {!careerPolicy.can_select_career && careerPolicy.locked_career_label ? (
        <div className="mb-4 flex flex-wrap items-center justify-end gap-3">
          <p className="text-sm text-muted-foreground">
            Carrera:{" "}
            <span className="font-medium text-foreground">
              {careerPolicy.locked_career_label}
            </span>
          </p>
        </div>
      ) : null}

      <UsersTable
        users={users}
        filters={filters}
        roles={roles}
        assignableRoles={assignableRoles}
        careersOptions={careers}
        careerPolicy={careerPolicy}
      />
    </main>
  );
};
