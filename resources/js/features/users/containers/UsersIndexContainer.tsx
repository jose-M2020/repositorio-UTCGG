import { usePage } from "@inertiajs/react";
import { AUTH_ABILITIES } from "@/features/auth";
import { Button } from "@/shared/components/ui";
import { UserFormDialog } from "../components/UserFormDialog";
import { UsersTable } from "../components/UsersTable";
import type {
  CareerFormPolicy,
  CareerOption,
  PaginatedUsers,
  RoleOption,
  RolePermissionPreview,
  UsersFilters,
  UserTypeOption,
} from "../types";

type UsersIndexContainerProps = {
  users: PaginatedUsers;
  filters: UsersFilters;
  roles: RoleOption[];
  assignableRoles: RoleOption[];
  rolePermissions: Record<string, RolePermissionPreview[]>;
  careers: Record<string, string>;
  careerOptions: CareerOption[];
  careerPolicy: CareerFormPolicy;
  userTypes?: UserTypeOption[];
};

export const UsersIndexContainer = ({
  users,
  filters,
  roles,
  assignableRoles,
  rolePermissions,
  careers,
  careerOptions,
  careerPolicy,
  userTypes = [],
}: UsersIndexContainerProps) => {
  const { auth, flash } = usePage().props;
  const canCreate = auth.abilities[AUTH_ABILITIES.USERS_CREATE];

  return (
    <main className="page-container space-y-6 py-8">
      <header className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-semibold text-primary">Usuarios</h1>
          <p className="text-sm text-muted-foreground">
            Usuarios totales: <b>{users.total}</b>
          </p>
        </div>
        {canCreate ? (
          <UserFormDialog
            mode="create"
            roles={assignableRoles}
            careers={careerOptions}
            careerPolicy={careerPolicy}
            userTypes={userTypes}
            trigger={<Button type="button" />}
            triggerContent="Nuevo"
          />
        ) : null}
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
        rolePermissions={rolePermissions}
        careersOptions={careers}
        careerOptions={careerOptions}
        careerPolicy={careerPolicy}
        userTypes={userTypes}
      />
    </main>
  );
};
