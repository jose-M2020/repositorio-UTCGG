import { Form, router, usePage } from '@inertiajs/react';
import { useState } from 'react';
import {
  close,
  open,
  proposeDistribution,
} from '@/actions/App/Http/Controllers/ProjectPeriodController';
import { store as enroll } from '@/actions/App/Http/Controllers/ProjectPeriodParticipantController';
import { upsert as upsertCapacity } from '@/actions/App/Http/Controllers/AdvisorCapacityController';
import { applyDistribution } from '@/actions/App/Http/Controllers/RepositoryAdvisorController';
import { AUTH_ABILITIES } from '@/features/auth';
import { InputField, SelectField } from '@/shared/components/form';
import { Button } from '@/shared/components/ui';
import { ProjectPeriodFormDialog } from '../components/form/ProjectPeriodFormDialog';
import type {
  CareerOption,
  DistributionAssignment,
  EligibleAdvisor,
  PeriodCapacity,
  PeriodCoverage,
  PeriodParticipant,
  ProjectPeriodItem,
  ProjectTypeOption,
} from '../types';

type ProjectPeriodShowContainerProps = {
  period: ProjectPeriodItem;
  participants: PeriodParticipant[];
  capacities: PeriodCapacity[];
  eligibleAdvisors: EligibleAdvisor[];
  coverage: PeriodCoverage;
  careers: CareerOption[];
  defaultAdvisorCapacity: number;
};

export const ProjectPeriodShowContainer = ({
  period,
  participants,
  capacities,
  eligibleAdvisors,
  coverage,
  careers,
  defaultAdvisorCapacity,
}: ProjectPeriodShowContainerProps) => {
  const { auth, flash } = usePage().props;
  const canEdit = auth.abilities[AUTH_ABILITIES.PROJECT_PERIODS_EDIT];
  const canManageCapacity =
    auth.abilities[AUTH_ABILITIES.ADVISORS_CAPACITY_MANAGE];
  const canDistribute = auth.abilities[AUTH_ABILITIES.ADVISORS_DISTRIBUTE];

  const [proposal, setProposal] = useState<DistributionAssignment[]>(
    (flash.distribution_proposal as DistributionAssignment[] | undefined) ?? [],
  );

  const handlePropose = () => {
    router.post(
      proposeDistribution.url(period.id),
      {},
      {
        preserveScroll: true,
        onSuccess: (page) => {
          const next =
            (
              page.props.flash as {
                distribution_proposal?: DistributionAssignment[];
              }
            )?.distribution_proposal ?? [];
          setProposal(next);
        },
      },
    );
  };

  return (
    <main className="page-container space-y-8 py-8">
      <header className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h1 className="text-2xl font-semibold">{period.name}</h1>
          <p className="text-sm text-muted-foreground">
            {period.project_type} · {period.status_label} · {period.starts_at} —{' '}
            {period.ends_at}
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          {canEdit ? (
            <ProjectPeriodFormDialog
              mode="edit"
              period={period}
              projectTypes={
                [
                  {
                    id: period.project_type_id,
                    code: period.project_type_code ?? '',
                    name: period.project_type ?? '',
                  },
                ] satisfies ProjectTypeOption[]
              }
              defaultAdvisorCapacity={defaultAdvisorCapacity}
              trigger={<Button type="button" variant="outline" />}
              triggerContent="Editar"
            />
          ) : null}
          {canEdit && period.status === 'draft' ? (
            <Form {...open.form(period.id)}>
              {({ processing }) => (
                <Button type="submit" disabled={processing}>
                  Abrir periodo
                </Button>
              )}
            </Form>
          ) : null}
          {canEdit && period.status === 'open' ? (
            <Form {...close.form(period.id)}>
              {({ processing }) => (
                <Button type="submit" variant="outline" disabled={processing}>
                  Cerrar periodo
                </Button>
              )}
            </Form>
          ) : null}
        </div>
      </header>

      {flash.status ? (
        <p className="rounded-lg border border-emerald-200 bg-emerald-50 px-3 py-2 text-sm text-emerald-800">
          {flash.status}
        </p>
      ) : null}
      {flash.error ? (
        <p className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-800">
          {flash.error}
        </p>
      ) : null}

      <section className="space-y-3">
        <h2 className="text-lg font-semibold">Cobertura</h2>
        {coverage.alerts.length > 0 ? (
          <ul className="space-y-1 rounded-lg border border-amber-200 bg-amber-50 p-3 text-sm text-amber-900">
            {coverage.alerts.map((alert) => (
              <li key={alert}>{alert}</li>
            ))}
          </ul>
        ) : null}
        <p className="text-sm text-muted-foreground">
          Capacidad sugerida: {coverage.suggested_capacity}
        </p>
        <div className="overflow-hidden rounded-xl border">
          <table className="min-w-full divide-y text-sm">
            <thead className="bg-muted/40">
              <tr>
                <th className="px-3 py-2 text-left">Carrera</th>
                <th className="px-3 py-2 text-left">Demanda</th>
                <th className="px-3 py-2 text-left">Proyectos</th>
                <th className="px-3 py-2 text-left">Con asesor</th>
                <th className="px-3 py-2 text-left">Sin asesor</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {coverage.by_career.map((row) => (
                <tr key={row.career_id}>
                  <td className="px-3 py-2">{row.career_name}</td>
                  <td className="px-3 py-2">{row.demand}</td>
                  <td className="px-3 py-2">{row.repositories}</td>
                  <td className="px-3 py-2">{row.with_advisor}</td>
                  <td className="px-3 py-2">{row.without_advisor}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="space-y-3">
        <div className="flex items-center justify-between gap-3">
          <h2 className="text-lg font-semibold">Participantes</h2>
          <span className="text-sm text-muted-foreground">
            {participants.length} inscritos
          </span>
        </div>
        {canEdit ? (
          <Form
            {...enroll.form(period.id)}
            className="grid gap-3 rounded-xl border p-4 sm:grid-cols-2"
          >
            {({ errors, processing }) => (
              <>
                <SelectField
                  id="career_filter"
                  name="career_id_filter"
                  label="Carrera (filtro visual)"
                  options={careers.map((career) => ({
                    value: String(career.id),
                    label: `${career.code} — ${career.name}`,
                  }))}
                  placeholder="Opcional"
                />
                <InputField
                  id="user_ids"
                  name="user_ids[]"
                  label="ID de alumno"
                  required
                  error={errors.user_ids}
                  hint="Inscripcion individual por ID. Usa varios campos en el futuro para lote."
                />
                <div className="sm:col-span-2">
                  <Button type="submit" disabled={processing}>
                    Inscribir alumno
                  </Button>
                </div>
              </>
            )}
          </Form>
        ) : null}
        <ul className="divide-y rounded-xl border">
          {participants.map((participant) => (
            <li
              key={participant.id}
              className="flex flex-wrap items-center justify-between gap-2 px-4 py-3 text-sm"
            >
              <span>
                {participant.name} · {participant.email}
              </span>
              <span className="text-muted-foreground">
                {participant.career}
              </span>
            </li>
          ))}
          {participants.length === 0 ? (
            <li className="px-4 py-6 text-center text-sm text-muted-foreground">
              Sin alumnos inscritos.
            </li>
          ) : null}
        </ul>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-semibold">Capacidad de asesores</h2>
        <div className="overflow-hidden rounded-xl border">
          <table className="min-w-full divide-y text-sm">
            <thead className="bg-muted/40">
              <tr>
                <th className="px-3 py-2 text-left">Asesor</th>
                <th className="px-3 py-2 text-left">Carga</th>
                <th className="px-3 py-2 text-left">Capacidad</th>
                <th className="px-3 py-2 text-left">Ratio</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {eligibleAdvisors.map((advisor) => (
                <tr key={advisor.user_id}>
                  <td className="px-3 py-2">{advisor.name}</td>
                  <td className="px-3 py-2">{advisor.load}</td>
                  <td className="px-3 py-2">{advisor.capacity}</td>
                  <td className="px-3 py-2">
                    {advisor.ratio === Number.POSITIVE_INFINITY
                      ? '—'
                      : advisor.ratio.toFixed(2)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {canManageCapacity ? (
          <Form
            {...upsertCapacity.form(period.id)}
            className="grid gap-3 rounded-xl border p-4 sm:grid-cols-2"
          >
            {({ errors, processing }) => (
              <>
                <SelectField
                  id="user_id"
                  name="user_id"
                  label="Asesor"
                  required
                  error={errors.user_id}
                  options={eligibleAdvisors.map((advisor) => ({
                    value: String(advisor.user_id),
                    label: advisor.name,
                  }))}
                  placeholder="Selecciona"
                />
                <InputField
                  id="max_projects"
                  name="max_projects"
                  label="Tope"
                  type="number"
                  min={0}
                  error={errors.max_projects}
                />
                <SelectField
                  id="is_available"
                  name="is_available"
                  label="Disponible"
                  required
                  defaultValue="1"
                  options={[
                    { value: '1', label: 'Si' },
                    { value: '0', label: 'No' },
                  ]}
                />
                <InputField
                  id="notes"
                  name="notes"
                  label="Notas"
                  error={errors.notes}
                />
                <div className="sm:col-span-2">
                  <Button type="submit" disabled={processing}>
                    Guardar capacidad
                  </Button>
                </div>
              </>
            )}
          </Form>
        ) : null}

        {capacities.length > 0 ? (
          <ul className="text-sm text-muted-foreground">
            {capacities.map((capacity) => (
              <li key={capacity.id}>
                {capacity.name}: tope {capacity.max_projects ?? 'default'},{' '}
                {capacity.is_available ? 'disponible' : 'no disponible'}
              </li>
            ))}
          </ul>
        ) : null}
      </section>

      {canDistribute ? (
        <section className="space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h2 className="text-lg font-semibold">Reparto automatico</h2>
            <Button type="button" variant="outline" onClick={handlePropose}>
              Proponer reparto
            </Button>
          </div>
          {proposal.length > 0 ? (
            <>
              <ul className="divide-y rounded-xl border text-sm">
                {proposal.map((row) => (
                  <li
                    key={row.repository_id}
                    className="flex justify-between gap-2 px-4 py-2"
                  >
                    <span>Repo #{row.repository_id}</span>
                    <span>
                      {row.uncovered || row.advisor_id === null
                        ? 'Sin cobertura'
                        : `Asesor #${row.advisor_id}`}
                    </span>
                  </li>
                ))}
              </ul>
              <Form
                {...applyDistribution.form(period.id)}
                className="space-y-3"
              >
                {({ processing }) => (
                  <>
                    {proposal.map((row, index) => (
                      <div key={row.repository_id}>
                        <input
                          type="hidden"
                          name={`assignments[${index}][repository_id]`}
                          value={row.repository_id}
                        />
                        <input
                          type="hidden"
                          name={`assignments[${index}][advisor_id]`}
                          value={row.advisor_id ?? ''}
                        />
                        <input
                          type="hidden"
                          name={`assignments[${index}][uncovered]`}
                          value={row.uncovered ? '1' : '0'}
                        />
                      </div>
                    ))}
                    <Button type="submit" disabled={processing}>
                      Confirmar reparto
                    </Button>
                  </>
                )}
              </Form>
            </>
          ) : (
            <p className="text-sm text-muted-foreground">
              Genera una propuesta para revisar antes de aplicar.
            </p>
          )}
        </section>
      ) : null}
    </main>
  );
};
