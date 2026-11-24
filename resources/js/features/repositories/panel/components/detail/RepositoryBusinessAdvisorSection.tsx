import { Form, Link, router, usePage } from '@inertiajs/react';
import { Building2Icon, SearchIcon, UserPlusIcon } from 'lucide-react';
import { useEffect, useState } from 'react';
import {
    destroy as destroyAssignment,
    resend,
    store as storeAssignment,
} from '@/actions/App/Http/Controllers/RepositoryBusinessAdvisorController';
import {
    duplicates as advisorDuplicates,
    search as searchAdvisors,
} from '@/routes/business-advisors';
import {
    duplicates as companyDuplicates,
    search as searchCompanies,
} from '@/routes/companies';
import { AUTH_ABILITIES } from '@/features/auth';
import { InputField } from '@/shared/components/form';
import { Button, Input } from '@/shared/components/ui';
import { cn } from '@/shared/lib/cn';
import { show as privacyNotice } from '@/routes/privacy-notice';
import { postJson } from '@/shared/lib/csrf';
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

type PersonDuplicateHit = {
    id: number;
    full_name: string;
    strength: string;
    reason: string;
    company_name: string | null;
};

type CompanyDuplicateHit = {
    id: number;
    name: string;
    strength: string;
    reason: string;
    rfc: string | null;
};

type DraftAdvisor = {
    first_name: string;
    last_name: string;
    second_last_name: string;
    email: string;
    phone: string;
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
    const [draftAdvisor, setDraftAdvisor] = useState<DraftAdvisor>({
        first_name: '',
        last_name: '',
        second_last_name: '',
        email: '',
        phone: '',
    });
    const [draftCompanyName, setDraftCompanyName] = useState('');
    const [draftCompanyRfc, setDraftCompanyRfc] = useState('');
    const [personDuplicates, setPersonDuplicates] = useState<
        PersonDuplicateHit[]
    >([]);
    const [companyDuplicateHits, setCompanyDuplicateHits] = useState<
        CompanyDuplicateHit[]
    >([]);
    const [dismissedDuplicates, setDismissedDuplicates] = useState(false);

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

    useEffect(() => {
        if (mode !== 'create' || !canCreate) {
            setPersonDuplicates([]);
            return;
        }

        if (
            draftAdvisor.first_name.trim().length < 2 ||
            draftAdvisor.last_name.trim().length < 2
        ) {
            setPersonDuplicates([]);
            return;
        }

        const timeout = window.setTimeout(async () => {
            try {
                const payload = await postJson<{ data: PersonDuplicateHit[] }>(
                    advisorDuplicates.url(),
                    {
                        first_name: draftAdvisor.first_name,
                        last_name: draftAdvisor.last_name,
                        second_last_name:
                            draftAdvisor.second_last_name || null,
                        email: draftAdvisor.email || null,
                        phone: draftAdvisor.phone || null,
                        company_id: selectedCompany?.id ?? null,
                    },
                );
                setPersonDuplicates(payload.data);
                setDismissedDuplicates(false);
            } catch {
                setPersonDuplicates([]);
            }
        }, 400);

        return () => window.clearTimeout(timeout);
    }, [mode, canCreate, draftAdvisor, selectedCompany?.id]);

    useEffect(() => {
        if (
            mode !== 'create' ||
            selectedCompany ||
            draftCompanyName.trim().length < 3
        ) {
            setCompanyDuplicateHits([]);
            return;
        }

        const timeout = window.setTimeout(async () => {
            try {
                const payload = await postJson<{ data: CompanyDuplicateHit[] }>(
                    companyDuplicates.url(),
                    {
                        name: draftCompanyName,
                        rfc: draftCompanyRfc || null,
                    },
                );
                setCompanyDuplicateHits(payload.data);
            } catch {
                setCompanyDuplicateHits([]);
            }
        }, 400);

        return () => window.clearTimeout(timeout);
    }, [mode, selectedCompany, draftCompanyName, draftCompanyRfc]);

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
                        {canAttach && advisor.id != null ? (
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
                                        <div className="space-y-3">
                                            <div className="grid gap-3 sm:grid-cols-3">
                                                <InputField
                                                    id="advisor_first_name"
                                                    name="advisor[first_name]"
                                                    label="Nombre"
                                                    required
                                                    value={
                                                        draftAdvisor.first_name
                                                    }
                                                    onChange={(event) =>
                                                        setDraftAdvisor(
                                                            (current) => ({
                                                                ...current,
                                                                first_name:
                                                                    event.target
                                                                        .value,
                                                            }),
                                                        )
                                                    }
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
                                                    value={
                                                        draftAdvisor.last_name
                                                    }
                                                    onChange={(event) =>
                                                        setDraftAdvisor(
                                                            (current) => ({
                                                                ...current,
                                                                last_name:
                                                                    event.target
                                                                        .value,
                                                            }),
                                                        )
                                                    }
                                                    error={
                                                        errors[
                                                            'advisor.last_name'
                                                        ]
                                                    }
                                                />
                                                <InputField
                                                    id="advisor_second_last_name"
                                                    name="advisor[second_last_name]"
                                                    label="Apellido materno"
                                                    value={
                                                        draftAdvisor.second_last_name
                                                    }
                                                    onChange={(event) =>
                                                        setDraftAdvisor(
                                                            (current) => ({
                                                                ...current,
                                                                second_last_name:
                                                                    event.target
                                                                        .value,
                                                            }),
                                                        )
                                                    }
                                                    error={
                                                        errors[
                                                            'advisor.second_last_name'
                                                        ]
                                                    }
                                                />
                                            </div>

                                            {!dismissedDuplicates &&
                                            personDuplicates.length > 0 ? (
                                                <div className="space-y-2 rounded-md border border-amber-500/40 bg-amber-500/5 p-3">
                                                    <p className="text-sm font-medium">
                                                        ¿Es alguien de estos?
                                                    </p>
                                                    <p className="text-xs text-muted-foreground">
                                                        Coincidencias posibles.
                                                        Puedes reutilizar o
                                                        continuar con el alta
                                                        nueva.
                                                    </p>
                                                    <ul className="space-y-1">
                                                        {personDuplicates.map(
                                                            (hit) => (
                                                                <li key={hit.id}>
                                                                    <button
                                                                        type="button"
                                                                        className="w-full rounded-md border px-3 py-2 text-left text-sm hover:bg-muted"
                                                                        onClick={() => {
                                                                            setSelectedAdvisor(
                                                                                {
                                                                                    id: hit.id,
                                                                                    full_name:
                                                                                        hit.full_name,
                                                                                    job_title:
                                                                                        null,
                                                                                    company_name:
                                                                                        hit.company_name,
                                                                                    email_masked:
                                                                                        null,
                                                                                    affiliation_id:
                                                                                        null,
                                                                                },
                                                                            );
                                                                            setMode(
                                                                                'change',
                                                                            );
                                                                        }}
                                                                    >
                                                                        <span className="font-medium">
                                                                            {
                                                                                hit.full_name
                                                                            }
                                                                        </span>
                                                                        <span className="block text-muted-foreground">
                                                                            {[
                                                                                hit.company_name,
                                                                                hit.reason,
                                                                                hit.strength,
                                                                            ]
                                                                                .filter(
                                                                                    Boolean,
                                                                                )
                                                                                .join(
                                                                                    ' · ',
                                                                                )}
                                                                        </span>
                                                                    </button>
                                                                </li>
                                                            ),
                                                        )}
                                                    </ul>
                                                    <button
                                                        type="button"
                                                        className="text-xs underline text-muted-foreground"
                                                        onClick={() =>
                                                            setDismissedDuplicates(
                                                                true,
                                                            )
                                                        }
                                                    >
                                                        No es ninguna; continuar
                                                        con alta nueva
                                                    </button>
                                                </div>
                                            ) : null}
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
                                                        value={draftCompanyName}
                                                        onChange={(event) =>
                                                            setDraftCompanyName(
                                                                event.target
                                                                    .value,
                                                            )
                                                        }
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
                                                        value={draftCompanyRfc}
                                                        onChange={(event) =>
                                                            setDraftCompanyRfc(
                                                                event.target
                                                                    .value,
                                                            )
                                                        }
                                                        error={
                                                            errors[
                                                                'company.rfc'
                                                            ]
                                                        }
                                                    />
                                                </div>
                                                {companyDuplicateHits.length >
                                                0 ? (
                                                    <div className="space-y-1 rounded-md border p-2 text-sm">
                                                        <p className="font-medium">
                                                            Empresas similares
                                                        </p>
                                                        {companyDuplicateHits.map(
                                                            (hit) => (
                                                                <button
                                                                    key={hit.id}
                                                                    type="button"
                                                                    className="block w-full rounded px-2 py-1 text-left hover:bg-muted"
                                                                    onClick={() => {
                                                                        setSelectedCompany(
                                                                            {
                                                                                id: hit.id,
                                                                                name: hit.name,
                                                                                rfc: hit.rfc,
                                                                                sector: null,
                                                                            },
                                                                        );
                                                                        setDraftCompanyName(
                                                                            '',
                                                                        );
                                                                        setCompanyDuplicateHits(
                                                                            [],
                                                                        );
                                                                    }}
                                                                >
                                                                    {hit.name}
                                                                    {hit.rfc
                                                                        ? ` · ${hit.rfc}`
                                                                        : ''}
                                                                </button>
                                                            ),
                                                        )}
                                                    </div>
                                                ) : null}
                                            </>
                                        )}
                                    </div>

                                    <div className="grid gap-3 sm:grid-cols-2">
                                        <InputField
                                            id="affiliation_email"
                                            name="affiliation[email]"
                                            label="Correo de contacto"
                                            type="email"
                                            value={draftAdvisor.email}
                                            onChange={(event) =>
                                                setDraftAdvisor((current) => ({
                                                    ...current,
                                                    email: event.target.value,
                                                }))
                                            }
                                            error={
                                                errors['affiliation.email']
                                            }
                                        />
                                        <InputField
                                            id="affiliation_phone"
                                            name="affiliation[phone]"
                                            label="Telefono"
                                            value={draftAdvisor.phone}
                                            onChange={(event) =>
                                                setDraftAdvisor((current) => ({
                                                    ...current,
                                                    phone: event.target.value,
                                                }))
                                            }
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

            <p className="text-xs text-muted-foreground">
                Al registrar datos de contacto aplica el{' '}
                <Link href={privacyNotice.url()} className="underline">
                    aviso de privacidad
                </Link>
                .
            </p>
        </section>
    );
};
