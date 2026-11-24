import { useState } from 'react';
import { Form } from '@inertiajs/react';
import { GraduationCap } from 'lucide-react';
import { toggleCanBeAdvisor } from '@/actions/App/Http/Controllers/UserController';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogMedia,
  AlertDialogTitle,
} from '@/shared/components/ui';
import type { UserListItem } from '../../types';
import { formatUserName } from '../../utils/formatUserName';

type UserToggleCanBeAdvisorDialogProps = {
  user: UserListItem;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
};

export const UserToggleCanBeAdvisorDialog = ({
  user,
  open: openProp,
  onOpenChange,
}: UserToggleCanBeAdvisorDialogProps) => {
  const [uncontrolledOpen, setUncontrolledOpen] = useState(false);
  const isControlled = openProp !== undefined;
  const open = isControlled ? openProp : uncontrolledOpen;
  const userName = formatUserName(user);
  const willEnable = user.can_be_advisor !== true;
  const actionLabel = willEnable
    ? 'Permitir como asesor'
    : 'Dejar de ser asesor';

  const handleOpenChange = (nextOpen: boolean) => {
    if (!isControlled) {
      setUncontrolledOpen(nextOpen);
    }
    onOpenChange?.(nextOpen);
  };

  const handleSuccess = () => {
    handleOpenChange(false);
  };

  return (
    <AlertDialog open={open} onOpenChange={handleOpenChange}>
      <AlertDialogContent size="sm">
        <AlertDialogHeader>
          <AlertDialogMedia
            className={
              willEnable
                ? 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-400'
                : 'bg-amber-500/10 text-amber-700 dark:text-amber-400'
            }
          >
            <GraduationCap aria-hidden="true" />
          </AlertDialogMedia>
          <AlertDialogTitle className="font-normal">
            ¿{actionLabel} de{' '}
            <span className="font-semibold text-foreground">{userName}</span>?
          </AlertDialogTitle>
          <AlertDialogDescription>
            {willEnable
              ? 'Podra asignarsele proyectos como asesor academico y confirmar asesores empresariales.'
              : 'Ya no se le podran asignar proyectos nuevos como asesor. Los proyectos que ya asesora se mantienen.'}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          <Form
            {...toggleCanBeAdvisor.form(user.id)}
            onSuccess={handleSuccess}
          >
            {({ processing }) => (
              <AlertDialogAction type="submit" disabled={processing}>
                {processing ? 'Guardando...' : actionLabel}
              </AlertDialogAction>
            )}
          </Form>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
