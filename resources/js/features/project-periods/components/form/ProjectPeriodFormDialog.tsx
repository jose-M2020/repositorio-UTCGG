import { useState, type ReactElement, type ReactNode } from 'react';
import { Form } from '@inertiajs/react';
import {
  store,
  update,
} from '@/actions/App/Http/Controllers/ProjectPeriodController';
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
import { ProjectPeriodFormFields } from './ProjectPeriodFormFields';
import type { ProjectPeriodItem, ProjectTypeOption } from '../../types';

type ProjectPeriodFormDialogProps = {
  trigger: ReactElement;
  triggerContent: ReactNode;
  projectTypes: ProjectTypeOption[];
  defaultAdvisorCapacity: number;
} & ({ mode: 'create' } | { mode: 'edit'; period: ProjectPeriodItem });

export const ProjectPeriodFormDialog = (
  props: ProjectPeriodFormDialogProps,
) => {
  const {
    trigger,
    triggerContent,
    projectTypes,
    defaultAdvisorCapacity,
    mode,
  } = props;
  const [open, setOpen] = useState(false);
  const isEdit = mode === 'edit';
  const period = isEdit ? props.period : null;
  const formProps = isEdit && period ? update.form(period.id) : store.form();

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger render={trigger}>{triggerContent}</DialogTrigger>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>
            {isEdit ? 'Editar periodo' : 'Nuevo periodo'}
          </DialogTitle>
          <DialogDescription>
            Define temporada, fechas y capacidad por defecto de asesores.
          </DialogDescription>
        </DialogHeader>
        <Form
          {...formProps}
          className="space-y-6"
          onSuccess={() => setOpen(false)}
        >
          {({ errors, processing }) => (
            <>
              <ProjectPeriodFormFields
                errors={errors}
                projectTypes={projectTypes}
                defaults={period ?? undefined}
                isEdit={isEdit}
                defaultAdvisorCapacity={defaultAdvisorCapacity}
              />
              <DialogFooter>
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
                      : 'Crear'}
                </Button>
              </DialogFooter>
            </>
          )}
        </Form>
      </DialogContent>
    </Dialog>
  );
};
