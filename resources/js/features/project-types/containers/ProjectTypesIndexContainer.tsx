import { usePage } from '@inertiajs/react';
import { AUTH_ABILITIES } from '@/features/auth';
import { Button } from '@/shared/components/ui';
import { ProjectTypeFormDialog } from '../components/form/ProjectTypeFormDialog';
import { ProjectTypesTable } from '../components/list/ProjectTypesTable';
import type { PaginatedProjectTypes } from '../types';

type ProjectTypesIndexContainerProps = {
  projectTypes: PaginatedProjectTypes;
};

export const ProjectTypesIndexContainer = ({
  projectTypes,
}: ProjectTypesIndexContainerProps) => {
  const { auth, flash } = usePage().props;
  const canCreate = auth.abilities[AUTH_ABILITIES.PROJECT_TYPES_CREATE];

  return (
    <main className="page-container space-y-6 py-8">
      <header className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-semibold text-slate-900 dark:text-slate-100">
            Tipos de proyecto
          </h1>
          <p className="text-sm text-slate-600 dark:text-slate-400">
            Configura reglas de equipo, cuatrimestre, estadía y asesoría.
          </p>
        </div>
        {canCreate ? (
          <ProjectTypeFormDialog
            mode="create"
            trigger={<Button type="button" />}
            triggerContent="Nuevo tipo"
          />
        ) : null}
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

      <ProjectTypesTable projectTypes={projectTypes} />
    </main>
  );
};
