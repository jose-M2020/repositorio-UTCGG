import { usePage } from "@inertiajs/react";
import { Button } from "@/shared/components/ui";
import { RoleFormDialog } from "../components/form/RoleFormDialog";
import { RolesTable } from "../components/list/RolesTable";
import type { PaginatedRoles, PermissionGroups } from "../types";

type RolesIndexContainerProps = {
  roles: PaginatedRoles;
  permissionGroups: PermissionGroups;
};

export const RolesIndexContainer = ({
  roles,
  permissionGroups,
}: RolesIndexContainerProps) => {
  const { flash } = usePage().props;

  return (
    <main className="page-container space-y-6 py-8">
      <header className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-semibold text-slate-900 dark:text-slate-100">
            Roles
          </h1>
          <p className="text-sm text-slate-600 dark:text-slate-400">
            Define roles y asigna permisos Spatie.
          </p>
        </div>
        <RoleFormDialog
          mode="create"
          permissionGroups={permissionGroups}
          trigger={<Button type="button" />}
          triggerContent="Nuevo rol"
        />
      </header>

      {flash.status ? (
        <p className="rounded-lg border border-emerald-200 bg-emerald-50 px-3 py-2 text-sm text-emerald-800 dark:border-emerald-900 dark:bg-emerald-950 dark:text-emerald-200">
          {flash.status}
        </p>
      ) : null}

      {flash.error ? (
        <p className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-800 dark:border-red-900 dark:bg-red-950 dark:text-red-200">
          {flash.error}
        </p>
      ) : null}

      <RolesTable roles={roles} permissionGroups={permissionGroups} />
    </main>
  );
};
