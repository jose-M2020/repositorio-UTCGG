import { Form, router, usePage } from '@inertiajs/react';
import { Building2Icon, SearchIcon, UserPlusIcon } from 'lucide-react';
import { useEffect, useState } from 'react';
import {
    destroy as destroyAssignment,
    resend,
    store as storeAssignment,
} from '@/actions/App/Http/Controllers/RepositoryBusinessAdvisorController';
import { search as searchAdvisors } from '@/routes/business-advisors';
import { search as searchCompanies } from '@/routes/companies';
import { AUTH_ABILITIES } from '@/features/auth';
import { InputField } from '@/shared/components/form';
import { Button, Input } from '@/shared/components/ui';
import { cn } from '@/shared/lib/cn';
import type { Repository } from '../../../shared/types';

type CatalogAdvisorHit = {
    id: number;
    full_name: string;
    job_title: string | null;
    company_name: string | null;
    email_masked: string | null;
    affiliation_id: number | null;
};

type CatalogCompanyHit = {
    id: number;
    name: string;
    rfc: string | null;
    sector: string | null;
};

type PanelMode = 'idle' | 'search' | 'create' | 'change';

type RepositoryBusinessAdvisorSectionProps = {
    repository: Repository;
};

const fetchJson = async <T,>(url: string): Promise<T> => {
    const response = await fetch(url, {
        headers: {
            Accept: 'application/json',
            'X-Requested-With': 'XMLHttpRequest',
        },
        credentials: 'same-origin',
    });

    if (!response.ok) {
        throw new Error('No se pudo completar la busqueda.');
    }

    return (await response.json()) as T;
};

export const RepositoryBusinessAdvisorSection = ({
    repository,
}: RepositoryBusinessAdvisorSectionProps) => {
    const { auth } = usePage().props;
    const canAttach = auth.abilities[AUTH_ABILITIES.BUSINESS_ADVISORS_ATTACH];
    const canSearch = auth.abilities[AUTH_ABILITIES.BUSINESS_ADVISORS_SEARCH];
    const canCreate = auth.abilities[AUTH_ABILITIES.BUSINESS_ADVISORS_CREATE];
    const canViewContact =
        auth.abilities[AUTH_ABILITIES.BUSINESS_ADVISORS_VIEW_CONTACT];

    const advisor = repository.business_advisor;
    const required = Boolean(repository.requires_business_advisor);

    const [mode, setMode] = useState<PanelMode>('idle');
    const [advisorQuery, setAdvisorQuery] = useState('');
    const [companyQuery, setCompanyQuery] = useState('');
    const [advisorHits, setAdvisorHits] = useState<CatalogAdvisorHit[]>([]);
    const [companyHits, setCompanyHits] = useState<CatalogCompanyHit[]>([]);
    const [selectedAdvisor, setSelectedAdvisor] =
        useState<CatalogAdvisorHit | null>(null);
    const [selectedCompany, setSelectedCompany] =
        useState<CatalogCompanyHit | null>(null);
    const [searchError, setSearchError] = useState<string | null>(null);

    useEffect(() => {
        if (!canSearch || advisorQuery.trim().length < 3) {
            setAdvisorHits([]);
            return;
        }

        const timeout = window.setTimeout(async () => {
            try {
                setSearchError(null);
                const payload = await fetchJson<{ data: CatalogAdvisorHit[] }>(
                    searchAdvisors.url({ query: { q: advisorQuery } }),
                );
                setAdvisorHits(payload.data);
            } catch (error) {
                setSearchError(
                    error instanceof Error
                        ? error.message
                        : 'Error al buscar asesores',
                );
            }
        }, 300);

        return () => window.clearTimeout(timeout);
    }, [advisorQuery, canSearch]);

    useEffect(() => {
        if (!canSearch || companyQuery.trim().length < 3) {
            setCompanyHits([]);
            return;
        }

        const timeout = window.setTimeout(async () => {
            try {
                setSearchError(null);
                const payload = await fetchJson<{ data: CatalogCompanyHit[] }>(
                    searchCompanies.url({ query: { q: companyQuery } }),
                );
                setCompanyHits(payload.data);
            } catch (error) {
                setSearchError(
                    error instanceof Error
                        ? error.message
                        : 'Error al buscar empresas',
                );
            }
        }, 300);

        return () => window.clearTimeout(timeout);
    }, [companyQuery, canSearch]);

    if (!required && !advisor && !canAttach) {
        return null;
    }

    const handleSelectExisting = (hit: CatalogAdvisorHit) => {
        if (!hit.affiliation_id) {
            setSelectedAdvisor(hit);
            setMode('change');
            return;
        }

        router.post(
            storeAssignment.url(repository.slug),
            {
                existing_affiliation_id: hit.affiliation_id,
                is_primary: true,
                send_confirmation: true,
            },
            { preserveScroll: true },
        );
        setMode('idle');
    };

    return (
        <section className="space-y-4 rounded-xl border border-border p-4">
            <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                    <h2 className="text-lg font-semibold">
                        Asesor empresarial
                    </h2>
                    <p className="text-sm text-muted-foreground">
                        Contacto externo de la empresa. Busca en el catalogo o
                        registra uno nuevo.
                        {required
                            ? ' Recomendado para este tipo de proyecto.'
                            : ''}
                    </p>
                </div>
                {canAttach && mode === 'idle' ? (
                    <div className="flex flex-wrap gap-2">
                        {canSearch ? (
                            <Button
                                type="button"
                                size="sm"
                                variant="outline"
                                onClick={() => setMode('search')}
                            >
                                <SearchIcon className="mr-1.5 size-3.5" />
                                Buscar
                            </Button>
                        ) : null}
                        {canCreate ? (
                            <Button
                                type="button"
                                size="sm"
                                onClick={() => {
                                    setSelectedAdvisor(null);
                                    setSelectedCompany(null);
                                    setMode('create');
                                }}
                            >
                                <UserPlusIcon className="mr-1.5 size-3.5" />
                                Registrar
                            </Button>
                        ) : null}
                    </div>
                ) : null}
            </div>

            {advisor ? (
                <div className="space-y-3 rounded-lg bg-muted/40 px-3 py-3 text-sm">
                    <div className="flex flex-wrap items-start justify-between gap-3">
                        <div className="space-y-1">
                            <p className="font-medium text-foreground">
                                {advisor.full_name}
                            </p>
                            <p className="text-muted-foreground">
                                {advisor.job_title ?? 'Sin puesto'}
                                {repository.company?.name
                                    ? ` · ${repository.company.name}`
                                    : ''}
                            </p>
                            {canViewContact ? (
                                <p className="text-muted-foreground">
                                    {[advisor.email, advisor.phone]
                                        .filter(Boolean)
                                        .join(' · ') || 'Sin contacto'}
                                </p>
                            ) : null}
                            <p className="text-[0.75rem] text-muted-foreground">
                                Estado:{' '}
                                {advisor.acceptance_status ?? 'pending'}
                                {advisor.catalog_status
                                    ? ` · catalogo: ${advisor.catalog_status}`
                                    : ''}
                            </p>
                        </div>
                        {canAttach ? (
                            <div className="flex flex-wrap gap-2">
                                <Form
                                    {...resend.form([
                                        repository.slug,
                                        advisor.id,
                                    ])}
                                >
                                    {({ processing }) => (
                                        <Button
                                            type="submit"
                                            size="sm"
                                            variant="outline"
                                            disabled={processing}
                                        >
                                            Reenviar confirmacion
                                        </Button>
                                    )}
                                </Form>
                                <Form
                                    {...destroyAssignment.form([
                                        repository.slug,
                                        advisor.id,
                                    ])}
                                >
                                    {({ processing }) => (
                                        <Button
                                            type="submit"
                                            size="sm"
                                            variant="outline"
                                            disabled={processing}
                                        >
                                            Liberar
                                        </Button>
                                    )}
                                </Form>
                                {advisor.business_advisor_id && canCreate ? (
                                    <Button
                                        type="button"
                                        size="sm"
                                        variant="ghost"
                                        onClick={() => {
                                            setSelectedAdvisor({
                                                id: advisor.business_advisor_id!,
                                                full_name:
                                                    advisor.full_name ?? '',
                                                job_title:
                                                    advisor.job_title ?? null,
                                                company_name:
                                                    repository.company?.name ??
                                                    null,
                                                email_masked: null,
                                                affiliation_id:
                                                    advisor.affiliation_id ??
                                                    null,
                                            });
                                            setMode('change');
                                        }}
                                    >
                                        Sus datos cambiaron
                                    </Button>
                                ) : null}
                            </div>
                        ) : null}
                    </div>
                </div>
            ) : (
                <p className="text-sm text-muted-foreground">
                    Sin asesor empresarial asignado.
                </p>
            )}

            {mode !== 'idle' && canAttach ? (
                <div className="space-y-4 rounded-lg border border-dashed border-border p-4">
                    <div className="flex flex-wrap gap-2">
                        {(
                            [
                                ['search', 'Buscar', canSearch],
                                ['create', 'Registrar nuevo', canCreate],
                                [
                                    'change',
                                    'Cambio de empresa',
                                    canCreate && Boolean(selectedAdvisor),
                                ],
                            ] as const
                        )
                            .filter(([, , visible]) => visible)
                            .map(([value, label]) => (
                                <button
                                    key={value}
                                    type="button"
                                    onClick={() => setMode(value)}
                                    className={cn(
                                        'rounded-md px-3 py-1.5 text-sm font-medium transition-colors',
                                        mode === value
                                            ? 'bg-primary text-primary-foreground'
                                            : 'bg-muted text-muted-foreground hover:text-foreground',
                                    )}
                                >
                                    {label}
                                </button>
                            ))}
                        <Button
                            type="button"
                            size="sm"
                            variant="ghost"
                            className="ml-auto"
                            onClick={() => setMode('idle')}
                        >
                            Cerrar
                        </Button>
                    </div>

                    {searchError ? (
                        <p className="text-sm text-destructive">{searchError}</p>
                    ) : null}

                    {mode === 'search' ? (
                        <div className="space-y-3">
                            <label className="block space-y-1">
                                <span className="text-sm font-medium">
                                    Buscar asesor
                                </span>
                                <Input
                                    value={advisorQuery}
                                    onChange={(event) =>
                                        setAdvisorQuery(event.target.value)
                                    }
                                    placeholder="Minimo 3 caracteres"
                                    aria-label="Buscar asesor empresarial"
                                />
                            </label>
                            <ul className="max-h-56 space-y-1 overflow-y-auto">
                                {advisorHits.map((hit) => (
                                    <li key={hit.id}>
                                        <button
                                            type="button"
                                            className="flex w-full flex-col rounded-md border border-border px-3 py-2 text-left text-sm hover:bg-muted"
                                            onClick={() =>
                                                handleSelectExisting(hit)
                                            }
                                        >
                                            <span className="font-medium">
                                                {hit.full_name}
                                            </span>
                                            <span className="text-muted-foreground">
                                                {[
                                                    hit.job_title,
                                                    hit.company_name,
                                                    hit.email_masked,
                                                ]
                                                    .filter(Boolean)
                                                    .join(' · ')}
                                            </span>
                                        </button>
                                    </li>
                                ))}
                            </ul>
                            {advisorQuery.trim().length >= 3 &&
                            advisorHits.length === 0 ? (
                                <p className="text-sm text-muted-foreground">
                                    Sin coincidencias.{' '}
                                    <button
                                        type="button"
                                        className="underline"
                                        onClick={() => setMode('create')}
                                    >
                                        Registrar nuevo
                                    </button>
                                </p>
                            ) : null}
                        </div>
                    ) : null}

                    {mode === 'create' || mode === 'change' ? (
                        <Form
                            {...storeAssignment.form(repository.slug)}
                            className="space-y-4"
                            options={{ preserveScroll: true }}
                            onSuccess={() => setMode('idle')}
                        >
                            {({ errors, processing }) => (
                                <>
                                    {mode === 'change' && selectedAdvisor ? (
                                        <>
                                            <input
                                                type="hidden"
                                                name="existing_advisor_id"
                                                value={selectedAdvisor.id}
                                            />
                                            <p className="rounded-md bg-muted/50 px-3 py-2 text-sm">
                                                Actualizando afiliacion de{' '}
                                                <strong>
                                                    {selectedAdvisor.full_name}
                                                </strong>
                                                . El proyecto usara los nuevos
                                                datos; los anteriores no se
                                                reescriben.
                                            </p>
                                        </>
                                    ) : null}

                                    {mode === 'create' ? (
                                        <div className="grid gap-3 sm:grid-cols-3">
                                            <InputField
                                                id="advisor_first_name"
                                                name="advisor[first_name]"
                                                label="Nombre"
                                                required
                                                error={
                                                    errors[
                                                        'advisor.first_name'
                                                    ]
                                                }
                                            />
                                            <InputField
                                                id="advisor_last_name"
                                                name="advisor[last_name]"
                                                label="Apellido paterno"
                                                required
                                                error={
                                                    errors['advisor.last_name']
                                                }
                                            />
                                            <InputField
                                                id="advisor_second_last_name"
                                                name="advisor[second_last_name]"
                                                label="Apellido materno"
                                                error={
                                                    errors[
                                                        'advisor.second_last_name'
                                                    ]
                                                }
                                            />
                                        </div>
                                    ) : null}

                                    <div className="space-y-2">
                                        <p className="flex items-center gap-1.5 text-sm font-medium">
                                            <Building2Icon className="size-3.5" />
                                            Empresa
                                        </p>
                                        {selectedCompany ? (
                                            <div className="flex items-center justify-between rounded-md border px-3 py-2 text-sm">
                                                <span>
                                                    {selectedCompany.name}
                                                    {selectedCompany.rfc
                                                        ? ` · ${selectedCompany.rfc}`
                                                        : ''}
                                                </span>
                                                <button
                                                    type="button"
                                                    className="text-muted-foreground underline"
                                                    onClick={() =>
                                                        setSelectedCompany(null)
                                                    }
                                                >
                                                    Cambiar
                                                </button>
                                                <input
                                                    type="hidden"
                                                    name="existing_company_id"
                                                    value={selectedCompany.id}
                                                />
                                            </div>
                                        ) : (
                                            <>
                                                <Input
                                                    value={companyQuery}
                                                    onChange={(event) =>
                                                        setCompanyQuery(
                                                            event.target.value,
                                                        )
                                                    }
                                                    placeholder="Buscar empresa (min. 3 caracteres) o escribe una nueva abajo"
                                                    aria-label="Buscar empresa"
                                                />
                                                {companyHits.length > 0 ? (
                                                    <ul className="max-h-40 overflow-y-auto rounded-md border">
                                                        {companyHits.map(
                                                            (hit) => (
                                                                <li key={hit.id}>
                                                                    <button
                                                                        type="button"
                                                                        className="w-full px-3 py-2 text-left text-sm hover:bg-muted"
                                                                        onClick={() => {
                                                                            setSelectedCompany(
                                                                                hit,
                                                                            );
                                                                            setCompanyQuery(
                                                                                '',
                                                                            );
                                                                            setCompanyHits(
                                                                                [],
                                                                            );
                                                                        }}
                                                                    >
                                                                        {
                                                                            hit.name
                                                                        }
                                                                    </button>
                                                                </li>
                                                            ),
                                                        )}
                                                    </ul>
                                                ) : null}
                                                <div className="grid gap-3 sm:grid-cols-2">
                                                    <InputField
                                                        id="company_name"
                                                        name="company[name]"
                                                        label="Nombre de empresa nueva"
                                                        error={
                                                            errors[
                                                                'company.name'
                                                            ]
                                                        }
                                                    />
                                                    <InputField
                                                        id="company_rfc"
                                                        name="company[rfc]"
                                                        label="RFC (opcional)"
                                                        error={
                                                            errors[
                                                                'company.rfc'
                                                            ]
                                                        }
                                                    />
                                                </div>
                                            </>
                                        )}
                                    </div>

                                    <div className="grid gap-3 sm:grid-cols-2">
                                        <InputField
                                            id="affiliation_email"
                                            name="affiliation[email]"
                                            label="Correo de contacto"
                                            type="email"
                                            error={
                                                errors['affiliation.email']
                                            }
                                        />
                                        <InputField
                                            id="affiliation_phone"
                                            name="affiliation[phone]"
                                            label="Telefono"
                                            error={
                                                errors['affiliation.phone']
                                            }
                                        />
                                        <InputField
                                            id="affiliation_job_title"
                                            name="affiliation[job_title]"
                                            label="Puesto"
                                            error={
                                                errors[
                                                    'affiliation.job_title'
                                                ]
                                            }
                                        />
                                        <InputField
                                            id="affiliation_department"
                                            name="affiliation[department]"
                                            label="Area / departamento"
                                            error={
                                                errors[
                                                    'affiliation.department'
                                                ]
                                            }
                                        />
                                    </div>

                                    <input
                                        type="hidden"
                                        name="is_primary"
                                        value="1"
                                    />
                                    <input
                                        type="hidden"
                                        name="send_confirmation"
                                        value="1"
                                    />

                                    <div className="flex justify-end gap-2">
                                        <Button
                                            type="button"
                                            variant="outline"
                                            onClick={() => setMode('idle')}
                                        >
                                            Cancelar
                                        </Button>
                                        <Button
                                            type="submit"
                                            disabled={processing}
                                        >
                                            {processing
                                                ? 'Guardando...'
                                                : 'Adjuntar al proyecto'}
                                        </Button>
                                    </div>
                                </>
                            )}
                        </Form>
                    ) : null}
                </div>
            ) : null}
        </section>
    );
};
