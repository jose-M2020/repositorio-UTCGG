import {
  useEffect,
  useState,
  type ChangeEvent,
  type ReactElement,
  type ReactNode,
} from "react";
import { Form } from "@inertiajs/react";
import { updateRole } from "@/actions/App/Http/Controllers/UserController";
import {
  Button,
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/shared/components/ui";
import type {
  RoleOption,
  RolePermissionPreview,
  UserListItem,
} from "../types";

type UserChangeRoleDialogProps = {
  user: UserListItem;
  roles: RoleOption[];
  rolePermissions: Record<string, RolePermissionPreview[]>;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  /** When true, caller owns the trigger (e.g. overflow menu item). */
  hideTrigger?: boolean;
  trigger?: ReactElement;
  triggerContent?: ReactNode;
};

export const UserChangeRoleDialog = ({
  user,
  roles,
  rolePermissions,
  open: openProp,
  onOpenChange,
  hideTrigger = false,
  trigger,
  triggerContent,
}: UserChangeRoleDialogProps) => {
  const [uncontrolledOpen, setUncontrolledOpen] = useState(false);
  const isControlled = openProp !== undefined;
  const open = isControlled ? openProp : uncontrolledOpen;
  const currentRole = user.roles[0]?.name ?? "";
  const [selectedRole, setSelectedRole] = useState(currentRole);

  const userName = `${user.nombre} ${user.apellido}`.trim();
  const previewPermissions = rolePermissions[selectedRole] ?? [];

  useEffect(() => {
    if (open) {
      setSelectedRole(currentRole);
    }
  }, [open, currentRole]);

  const handleOpenChange = (nextOpen: boolean) => {
    if (!isControlled) {
      setUncontrolledOpen(nextOpen);
    }
    onOpenChange?.(nextOpen);
  };

  const handleRoleChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setSelectedRole(event.target.value);
  };

  const handleSuccess = () => {
    handleOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      {!hideTrigger && trigger ? (
        <DialogTrigger render={trigger}>{triggerContent}</DialogTrigger>
      ) : null}

      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Cambiar rol</DialogTitle>
          <DialogDescription>
            Elige el nuevo rol de {userName} y revisa los permisos antes de
            confirmar.
          </DialogDescription>
        </DialogHeader>

        <Form
          {...updateRole.form(user.id)}
          className="space-y-6"
          onSuccess={handleSuccess}
        >
          {({ errors, processing }) => (
            <>
              <div className="space-y-4">
                <div className="space-y-1">
                  <label
                    htmlFor="change-role"
                    className="text-sm font-medium text-slate-700 dark:text-slate-300"
                  >
                    Rol
                  </label>
                  <select
                    id="change-role"
                    name="rol"
                    required
                    value={selectedRole}
                    onChange={handleRoleChange}
                    className="h-8 w-full rounded-lg border border-input bg-transparent px-2.5 text-sm outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 dark:bg-input/30"
                    aria-invalid={Boolean(errors.rol)}
                  >
                    <option value="" disabled>
                      Selecciona un rol
                    </option>
                    {roles.map((role) => (
                      <option key={role.value} value={role.value}>
                        {role.label}
                      </option>
                    ))}
                  </select>
                  {errors.rol ? (
                    <p className="text-sm text-red-600">{errors.rol}</p>
                  ) : null}
                </div>

                <div className="space-y-2">
                  <p className="text-sm font-medium text-slate-700 dark:text-slate-300">
                    Permisos de este rol
                  </p>
                  {selectedRole === "" ? (
                    <p className="text-sm text-muted-foreground">
                      Selecciona un rol para ver sus permisos.
                    </p>
                  ) : previewPermissions.length === 0 ? (
                    <p className="text-sm text-muted-foreground">
                      Este rol no tiene permisos asignados.
                    </p>
                  ) : (
                    <ul className="max-h-48 space-y-1.5 overflow-y-auto rounded-lg border border-border bg-muted/30 p-3">
                      {previewPermissions.map((permission) => (
                        <li
                          key={permission.name}
                          className="text-sm text-foreground"
                        >
                          {permission.description?.trim() || permission.name}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>

              <DialogFooter>
                <DialogClose render={<Button type="button" variant="outline" />}>
                  Cancelar
                </DialogClose>
                <Button type="submit" disabled={processing || selectedRole === ""}>
                  {processing ? "Guardando..." : "Confirmar rol"}
                </Button>
              </DialogFooter>
            </>
          )}
        </Form>
      </DialogContent>
    </Dialog>
  );
};
