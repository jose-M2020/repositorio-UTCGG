import { Form, Head, Link, usePage } from '@inertiajs/react';
import { useState } from 'react';
import { search as searchAdvisors } from '@/actions/App/Http/Controllers/BusinessAdvisorController';
import {
  reject,
  resolve,
  store,
} from '@/actions/App/Http/Controllers/BusinessAdvisorPrivacyRequestController';
import { pending } from '@/routes/business-advisors';
import { SelectField, TextareaField } from '@/shared/components/form';
import { Button, Input } from '@/shared/components/ui';

type PrivacyRequestRow = {
  id: number;
  type: string;
  message?: string | null;
  status: string;
  business_advisor?: {
    id: number;
    first_name: string;
    last_name: string;
    second_last_name?: string | null;
  } | null;
  handled_by?: {
    first_name: string;
    last_name: string;
  } | null;
};

type PageProps = {
  requests: {
    data: PrivacyRequestRow[];
  };
  filters: {
    status: string;
  };
  type_options: Array<{ value: string; label: string }>;
};

const PrivacyRequestsPage = ({
  requests,
  filters,
  type_options,
}: PageProps) => {
  const { flash } = usePage().props;
  const [advisorId, setAdvisorId] = useState('');
  const [advisorQuery, setAdvisorQuery] = useState('');
  const [advisorHits, setAdvisorHits] = useState<
    Array<{ id: number; full_name: string; company_name: string | null }>
  >([]);

  const handleSearchAdvisors = async (query: string) => {
    setAdvisorQuery(query);
    if (query.trim().length < 3) {
      setAdvisorHits([]);
      return;
    }

    const response = await fetch(
      searchAdvisors.url({
        query: { q: query },
      }),
      {
        headers: {
          Accept: 'application/json',
          'X-Requested-With': 'XMLHttpRequest',
        },
        credentials: 'same-origin',
      },
    );

    if (!response.ok) {
      return;
    }

    const payload = (await response.json()) as {
      data: Array<{
        id: number;
        full_name: string;
        company_name: string | null;
      }>;
    };
    setAdvisorHits(payload.data);
  };

  return (
    <>
      <Head title="Solicitudes ARCO" />
      <main className="page-container space-y-6 py-8">
        <header className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <h1 className="text-2xl font-semibold">Solicitudes ARCO</h1>
            <p className="text-sm text-muted-foreground">
              Registra y atiende solicitudes de acceso, rectificacion,
              cancelacion u oposicion sobre asesores empresariales.
            </p>
          </div>
          <Link href={pending.url()}>
            <Button type="button" variant="outline" size="sm">
              Volver a pendientes
            </Button>
          </Link>
        </header>

        {flash.status ? (
          <p className="rounded-lg border border-primary/20 bg-accent px-3 py-2 text-sm">
            {flash.status}
          </p>
        ) : null}

        <section className="space-y-4 rounded-xl border border-border p-4">
          <h2 className="text-lg font-semibold">Nueva solicitud</h2>
          <Form {...store.form()} className="space-y-4">
            {({ errors, processing }) => (
              <>
                <div className="space-y-2">
                  <label className="block space-y-1 text-sm">
                    <span className="font-medium">Buscar asesor</span>
                    <Input
                      value={advisorQuery}
                      onChange={(event) =>
                        void handleSearchAdvisors(event.target.value)
                      }
                      placeholder="Minimo 3 caracteres"
                    />
                  </label>
                  {advisorHits.length > 0 ? (
                    <ul className="max-h-40 overflow-y-auto rounded-md border">
                      {advisorHits.map((hit) => (
                        <li key={hit.id}>
                          <button
                            type="button"
                            className="w-full px-3 py-2 text-left text-sm hover:bg-muted"
                            onClick={() => {
                              setAdvisorId(String(hit.id));
                              setAdvisorQuery(hit.full_name);
                              setAdvisorHits([]);
                            }}
                          >
                            {hit.full_name}
                            {hit.company_name ? ` · ${hit.company_name}` : ''}
                          </button>
                        </li>
                      ))}
                    </ul>
                  ) : null}
                  <input
                    type="hidden"
                    name="business_advisor_id"
                    value={advisorId}
                  />
                  {errors.business_advisor_id ? (
                    <p className="text-sm text-destructive">
                      {errors.business_advisor_id}
                    </p>
                  ) : null}
                </div>

                <SelectField
                  id="type"
                  name="type"
                  label="Tipo ARCO"
                  required
                  options={type_options}
                  error={errors.type}
                />

                <TextareaField
                  id="message"
                  name="message"
                  label="Detalle"
                  rows={3}
                  error={errors.message}
                />

                <Button type="submit" disabled={processing || advisorId === ''}>
                  Registrar
                </Button>
              </>
            )}
          </Form>
        </section>

        <section className="space-y-3">
          <div className="flex flex-wrap gap-2">
            {(['open', 'resolved', 'rejected', 'all'] as const).map(
              (status) => (
                <Link
                  key={status}
                  href={`/business-advisors/privacy-requests?status=${status === 'all' ? '' : status}`}
                  className={
                    filters.status === status
                      ? 'rounded-md bg-primary px-3 py-1.5 text-sm text-primary-foreground'
                      : 'rounded-md bg-muted px-3 py-1.5 text-sm text-muted-foreground'
                  }
                >
                  {status}
                </Link>
              ),
            )}
          </div>

          <ul className="space-y-3">
            {requests.data.map((item) => (
              <li
                key={item.id}
                className="space-y-3 rounded-lg border border-border p-4"
              >
                <div>
                  <p className="font-medium">
                    {item.business_advisor
                      ? `${item.business_advisor.first_name} ${item.business_advisor.last_name}`
                      : `Asesor #${item.id}`}
                    {' · '}
                    {item.type}
                    {' · '}
                    {item.status}
                  </p>
                  {item.message ? (
                    <p className="mt-1 text-sm whitespace-pre-wrap text-muted-foreground">
                      {item.message}
                    </p>
                  ) : null}
                </div>

                {item.status === 'open' ? (
                  <div className="flex flex-wrap gap-2">
                    <Form
                      {...resolve.form(item.id)}
                      options={{ preserveScroll: true }}
                    >
                      {({ processing }) => (
                        <Button type="submit" size="sm" disabled={processing}>
                          Resolver
                        </Button>
                      )}
                    </Form>
                    <Form
                      {...reject.form(item.id)}
                      options={{ preserveScroll: true }}
                    >
                      {({ processing }) => (
                        <Button
                          type="submit"
                          size="sm"
                          variant="outline"
                          disabled={processing}
                        >
                          Rechazar
                        </Button>
                      )}
                    </Form>
                  </div>
                ) : null}
              </li>
            ))}
          </ul>
        </section>
      </main>
    </>
  );
};

export default PrivacyRequestsPage;
