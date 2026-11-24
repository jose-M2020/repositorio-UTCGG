import { useState, type ReactElement, type ReactNode } from 'react';
import { Form } from '@inertiajs/react';
import { store, update } from '@/actions/App/Http/Controllers/RoleController';
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
} from '@/shared/components/ui';
import { RoleFormFields } from './RoleFormFields';
import type { PermissionGroups, RoleListItem } from '../../types';

type RoleFormDialogBaseProps = {
  permissionGroups: PermissionGroups;
  trigger: ReactElement;
  triggerContent: ReactNode;
};

type RoleFormDialogProps = RoleFormDialogBaseProps &
  ({ mode: 'create' } | { mode: 'edit'; role: RoleListItem });

export const RoleFormDialog = (props: RoleFormDialogProps) => {
  const { permissionGroups, trigger, triggerContent, mode } = props;
  const [open, setOpen] = useState(false);
  const isEdit = mode === 'edit';
  const role = isEdit ? props.role : null;
  const formProps = isEdit && role ? update.form(role.id) : store.form();
  const defaults = role
    ? {
        name: role.name,
        permissions: role.permissions.map((permission) => permission.name),
      }
    : undefined;

  const handleSuccess = () => {
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger render={trigger}>{triggerContent}</DialogTrigger>

      <DialogContent className="flex max-h-[90vh] flex-col gap-0 overflow-hidden p-0 sm:max-w-4xl">
        <DialogHeader className="shrink-0 gap-1.5 border-b border-border px-6 py-5 pr-14">
          <DialogTitle>{isEdit ? 'Editar rol' : 'Nuevo rol'}</DialogTitle>
          <DialogDescription>
            {isEdit
              ? `Actualiza ${role?.name} y elige permisos por módulo.`
              : 'Define el nombre del rol y elige permisos por módulo.'}
          </DialogDescription>
        </DialogHeader>

        <Form
          {...formProps}
          className="flex min-h-0 flex-1 flex-col"
          onSuccess={handleSuccess}
        >
          {({ errors, processing }) => (
            <>
              <div className="flex min-h-0 flex-1 flex-col overflow-hidden px-6 py-5">
                <RoleFormFields
                  key={
                    open ? (isEdit ? `edit-${role?.id}` : 'create') : 'closed'
                  }
                  errors={errors}
                  permissionGroups={permissionGroups}
                  defaults={defaults}
                  nameLocked={Boolean(isEdit && role?.is_system)}
                />
              </div>
              <DialogFooter className="m-0 shrink-0 rounded-none border-t border-border px-6 py-4">
                <DialogClose
                  render={<Button type="button" variant="outline" />}
                >
                  Cancelar
                </DialogClose>
                <Button type="submit" disabled={processing}>
                  {processing
                    ? 'Guardando...'
                    : isEdit
                      ? 'Actualizar'
                      : 'Guardar'}
                </Button>
              </DialogFooter>
            </>
          )}
        </Form>
      </DialogContent>
    </Dialog>
  );
};
