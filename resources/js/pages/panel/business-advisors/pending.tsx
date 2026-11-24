import { Form, Head, Link, router, usePage } from '@inertiajs/react';
import { useState } from 'react';
import {
  merge,
  reject,
  verify,
} from '@/actions/App/Http/Controllers/BusinessAdvisorController';
import { AUTH_ABILITIES } from '@/features/auth';
import { Button, Input } from '@/shared/components/ui';
import { formatUserName } from '@/shared/lib';

type PendingAdvisor = {
  id: number;
  first_name: string;
  last_name: string;
  second_last_name?: string | null;
  created_by?: { first_name: string; last_name: string } | null;
  affiliations?: Array<{ company?: { name: string } | null }>;
};

type MergeCandidate = {
  id: number;
  label: string;
};

type PageProps = {
  advisors: {
    data: PendingAdvisor[];
    links?: Array<{ url: string | null; label: string; active: boolean }>;
  };
  merge_candidates: MergeCandidate[];
  can_merge: boolean;
  export_url: string | null;
  privacy_requests_url: string | null;
};

const BusinessAdvisorsPendingPage = ({
  advisors,
  merge_candidates,
  can_merge,
  export_url,
  privacy_requests_url,
}: PageProps) => {
  const { flash, auth } = usePage().props;
  const canVerify = auth.abilities[AUTH_ABILITIES.BUSINESS_ADVISORS_VERIFY];
  const [mergeTargetByAdvisor, setMergeTargetByAdvisor] = useState<
    Record<number, string>
  >({});

  return (
    <>
      <Head title="Asesores pendientes" />
      <main className="page-container space-y-6 py-8">
        <header className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <h1 className="text-2xl font-semibold">Bandeja de verificacion</h1>
            <p className="text-sm text-muted-foreground">
              Revisa asesores empresariales pendientes antes de aprobarlos para
              el catalogo.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            {export_url ? (
              <a href={export_url}>
                <Button type="button" variant="outline" size="sm">
                  Exportar contactos
                </Button>
              </a>
            ) : null}
            {privacy_requests_url ? (
              <Link href={privacy_requests_url}>
                <Button type="button" variant="outline" size="sm">
                  Solicitudes ARCO
                </Button>
              </Link>
            ) : null}
          </div>
        </header>

        {flash.status ? (
          <p className="rounded-lg border border-primary/20 bg-accent px-3 py-2 text-sm">
            {flash.status}
          </p>
        ) : null}

        {advisors.data.length === 0 ? (
          <p className="text-sm text-muted-foreground">
            No hay asesores pendientes de revision.
          </p>
        ) : (
          <ul className="space-y-3">
            {advisors.data.map((advisor) => (
              <li
                key={advisor.id}
                className="space-y-3 rounded-lg border border-border p-4"
              >
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <p className="font-medium">
                      {advisor.first_name} {advisor.last_name}{' '}
                      {advisor.second_last_name}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {advisor.affiliations?.[0]?.company?.name ??
                        'Sin empresa'}
                      {advisor.created_by
                        ? ` · creado por ${formatUserName(advisor.created_by)}`
                        : ''}
                    </p>
                  </div>
                  {canVerify ? (
                    <div className="flex flex-wrap gap-2">
                      <Button
                        type="button"
                        size="sm"
                        onClick={() =>
                          router.post(
                            verify.url(advisor.id),
                            {},
                            {
                              preserveScroll: true,
                            },
                          )
                        }
                      >
                        Verificar
                      </Button>
                      <Button
                        type="button"
                        size="sm"
                        variant="outline"
                        onClick={() =>
                          router.post(
                            reject.url(advisor.id),
                            {},
                            {
                              preserveScroll: true,
                            },
                          )
                        }
                      >
                        Rechazar
                      </Button>
                    </div>
                  ) : null}
                </div>

                {can_merge ? (
                  <Form
                    {...merge.form(advisor.id)}
                    className="flex flex-wrap items-end gap-2"
                    options={{ preserveScroll: true }}
                  >
                    {({ processing }) => (
                      <>
                        <label className="grow space-y-1 text-sm">
                          <span className="font-medium">Fusionar en</span>
                          <Input
                            name="target_id"
                            list={`merge-targets-${advisor.id}`}
                            value={mergeTargetByAdvisor[advisor.id] ?? ''}
                            onChange={(event) =>
                              setMergeTargetByAdvisor((current) => ({
                                ...current,
                                [advisor.id]: event.target.value,
                              }))
                            }
                            placeholder="ID del asesor canonico"
                            required
                          />
                          <datalist id={`merge-targets-${advisor.id}`}>
                            {merge_candidates
                              .filter(
                                (candidate) => candidate.id !== advisor.id,
                              )
                              .map((candidate) => (
                                <option
                                  key={candidate.id}
                                  value={String(candidate.id)}
                                >
                                  {candidate.label}
                                </option>
                              ))}
                          </datalist>
                        </label>
                        <Button
                          type="submit"
                          size="sm"
                          variant="outline"
                          disabled={processing}
                        >
                          Fusionar
                        </Button>
                      </>
                    )}
                  </Form>
                ) : null}
              </li>
            ))}
          </ul>
        )}
      </main>
    </>
  );
};

export default BusinessAdvisorsPendingPage;
