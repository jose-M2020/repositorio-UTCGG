import { Form, usePage } from '@inertiajs/react';
import {
  assign,
  reassign,
  release,
} from '@/actions/App/Http/Controllers/RepositoryAdvisorController';
import { AUTH_ABILITIES } from '@/features/auth';
import { InputField, SelectField } from '@/shared/components/form';
import { Button } from '@/shared/components/ui';
import type { EligibleAdvisorOption, Repository } from '../../../shared/types';

type RepositoryAdvisorSectionProps = {
  repository: Repository;
  eligibleAdvisors: EligibleAdvisorOption[];
};

export const RepositoryAdvisorSection = ({
  repository,
  eligibleAdvisors,
}: RepositoryAdvisorSectionProps) => {
  const { auth } = usePage().props;
  const canAssign = auth.abilities[AUTH_ABILITIES.ADVISORS_ASSIGN];
  const canOverride = auth.abilities[AUTH_ABILITIES.ADVISORS_OVERRIDE_CAPACITY];

  if (!repository.requires_academic_advisor) {
    return null;
  }

  const hasActivePrimary = Boolean(repository.active_advisor);
  const coAdvisors = repository.active_co_advisors ?? [];
  const primaryFormAction = hasActivePrimary
    ? reassign.form(repository.slug)
    : assign.form(repository.slug);

  return (
    <section className="space-y-4 rounded-xl border border-border p-4">
      <div>
        <h2 className="text-lg font-semibold">Asesor academico</h2>
        <p className="text-sm text-muted-foreground">
          Docente elegible segun el periodo y la carga disponible. Puedes tener
          un principal y hasta co-asesores de apoyo.
          {repository.project_period
            ? ` Periodo: ${repository.project_period.name}.`
            : ' Repositorio sin periodo (legado).'}
        </p>
      </div>

      <div className="space-y-3">
        <h3 className="text-sm font-medium">Principal</h3>
        {repository.active_advisor ? (
          <div className="flex flex-wrap items-center justify-between gap-3 rounded-lg bg-muted/40 px-3 py-2 text-sm">
            <span>
              {repository.active_advisor.name}
              {repository.active_advisor.override_reason
                ? ' (con excepcion)'
                : ''}
            </span>
            {canAssign ? (
              <Form
                {...release.form([
                  repository.slug,
                  repository.active_advisor.id,
                ])}
              >
                {({ processing }) => (
                  <Button
                    type="submit"
                    variant="outline"
                    size="sm"
                    disabled={processing}
                  >
                    Liberar
                  </Button>
                )}
              </Form>
            ) : null}
          </div>
        ) : (
          <p className="text-sm text-muted-foreground">
            Sin asesor principal asignado.
          </p>
        )}

        {canAssign && repository.project_period_id ? (
          <Form {...primaryFormAction} className="grid gap-3 sm:grid-cols-2">
            {({ errors, processing }) => (
              <>
                <input type="hidden" name="role" value="primary" />
                <SelectField
                  id="advisor_id"
                  name="advisor_id"
                  label="Asesor elegible"
                  required
                  error={errors.advisor_id ?? errors.advisor}
                  options={eligibleAdvisors.map((advisor) => ({
                    value: String(advisor.id),
                    label: advisor.label,
                  }))}
                  placeholder="Selecciona"
                />
                {canOverride ? (
                  <InputField
                    id="override_reason"
                    name="override_reason"
                    label="Motivo de excepcion"
                    error={errors.override_reason}
                  />
                ) : null}
                <div className="sm:col-span-2">
                  <Button type="submit" disabled={processing}>
                    {hasActivePrimary ? 'Reasignar principal' : 'Asignar principal'}
                  </Button>
                </div>
              </>
            )}
          </Form>
        ) : null}
      </div>

      <div className="space-y-3 border-t border-border pt-4">
        <h3 className="text-sm font-medium">Co-asesores</h3>
        {coAdvisors.length > 0 ? (
          <ul className="space-y-2">
            {coAdvisors.map((coAdvisor) => (
              <li
                key={coAdvisor.id}
                className="flex flex-wrap items-center justify-between gap-3 rounded-lg bg-muted/40 px-3 py-2 text-sm"
              >
                <span>
                  {coAdvisor.name}
                  {coAdvisor.override_reason ? ' (con excepcion)' : ''}
                </span>
                {canAssign ? (
                  <Form {...release.form([repository.slug, coAdvisor.id])}>
                    {({ processing }) => (
                      <Button
                        type="submit"
                        variant="outline"
                        size="sm"
                        disabled={processing}
                      >
                        Liberar
                      </Button>
                    )}
                  </Form>
                ) : null}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-sm text-muted-foreground">
            Sin co-asesores activos.
          </p>
        )}

        {canAssign &&
        repository.project_period_id &&
        hasActivePrimary ? (
          <Form
            {...assign.form(repository.slug)}
            className="grid gap-3 sm:grid-cols-2"
          >
            {({ errors, processing }) => (
              <>
                <input type="hidden" name="role" value="co_advisor" />
                <SelectField
                  id="co_advisor_id"
                  name="advisor_id"
                  label="Co-asesor elegible"
                  required
                  error={errors.advisor_id ?? errors.advisor}
                  options={eligibleAdvisors.map((advisor) => ({
                    value: String(advisor.id),
                    label: advisor.label,
                  }))}
                  placeholder="Selecciona"
                />
                {canOverride ? (
                  <InputField
                    id="co_override_reason"
                    name="override_reason"
                    label="Motivo de excepcion"
                    error={errors.override_reason}
                  />
                ) : null}
                <div className="sm:col-span-2">
                  <Button type="submit" disabled={processing}>
                    Agregar co-asesor
                  </Button>
                </div>
              </>
            )}
          </Form>
        ) : null}

        {canAssign && !hasActivePrimary ? (
          <p className="text-sm text-muted-foreground">
            Asigna primero un asesor principal para poder agregar co-asesores.
          </p>
        ) : null}
      </div>

      {(repository.advisor_history?.length ?? 0) > 0 ? (
        <ul className="space-y-1 border-t border-border pt-4 text-sm text-muted-foreground">
          {repository.advisor_history?.map((item) => (
            <li key={item.id}>
              {item.name} · {item.role_label ?? item.role} · asignado{' '}
              {item.assigned_at}
              {item.released_at
                ? ` · liberado ${item.released_at}`
                : ' · activo'}
            </li>
          ))}
        </ul>
      ) : null}
    </section>
  );
};
