import { usePage } from '@inertiajs/react';
import { AUTH_ABILITIES } from '@/features/auth';
import { Button } from '@/shared/components/ui';
import { CareerFormDialog } from '../components/form/CareerFormDialog';
import { CareersTable } from '../components/list/CareersTable';
import type { PaginatedCareers } from '../types';

type CareersIndexContainerProps = {
  careers: PaginatedCareers;
};

export const CareersIndexContainer = ({
  careers,
}: CareersIndexContainerProps) => {
  const { auth, flash } = usePage().props;
  const canCreate = auth.abilities[AUTH_ABILITIES.CAREERS_CREATE];

  return (
    <main className="page-container space-y-6 py-8">
      <header className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-semibold text-slate-900 dark:text-slate-100">
            Carreras
          </h1>
          <p className="text-sm text-slate-600 dark:text-slate-400">
            Administra las carreras academicas y su visibilidad en el inicio.
          </p>
        </div>
        {canCreate ? (
          <CareerFormDialog
            mode="create"
            trigger={<Button type="button" />}
            triggerContent="Nueva carrera"
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

      <CareersTable careers={careers} />
    </main>
  );
};
