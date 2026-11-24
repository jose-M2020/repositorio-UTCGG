import { usePage } from '@inertiajs/react';
import { Pencil } from 'lucide-react';
import { destroy } from '@/actions/App/Http/Controllers/CareerController';
import { AUTH_ABILITIES } from '@/features/auth';
import { ConfirmDeleteButton } from '@/shared/components/ConfirmDeleteButton';
import { Button } from '@/shared/components/ui';
import { CareerFormDialog } from '../form/CareerFormDialog';
import { CareerToggleActiveButton } from './CareerToggleActiveButton';
import type { CareerItem } from '../../types';

type CareerRowActionsProps = {
  career: CareerItem;
};

export const CareerRowActions = ({ career }: CareerRowActionsProps) => {
  const { auth } = usePage().props;
  const careerName = career.name.trim();
  const canEdit = auth.abilities[AUTH_ABILITIES.CAREERS_EDIT];
  const canToggleActive = auth.abilities[AUTH_ABILITIES.CAREERS_TOGGLE_ACTIVE];
  const canDestroy = auth.abilities[AUTH_ABILITIES.CAREERS_DESTROY];

  if (!canEdit && !canToggleActive && !canDestroy) {
    return null;
  }

  return (
    <div className="flex justify-end gap-1">
      {canEdit ? (
        <CareerFormDialog
          mode="edit"
          career={career}
          trigger={
            <Button
              type="button"
              variant="ghost"
              size="icon-sm"
              aria-label={`Editar ${careerName}`}
            />
          }
          triggerContent={<Pencil aria-hidden="true" />}
        />
      ) : null}
      {canToggleActive ? <CareerToggleActiveButton career={career} /> : null}
      {canDestroy ? (
        <ConfirmDeleteButton
          form={destroy.form(career.id)}
          itemLabel={careerName}
        />
      ) : null}
    </div>
  );
};
