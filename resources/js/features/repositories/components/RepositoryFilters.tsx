import { Form, router } from '@inertiajs/react';
import type { ReactNode } from 'react';
import { index } from '@/actions/App/Http/Controllers/RepositorioController';
import { Button, Checkbox, Input } from '@/shared/components/ui';
import type { RepositoryCatalog } from '@/shared/data/catalog';
import type { RepositoryFilters as RepositoryFiltersType } from '../types';

type RepositoryFiltersProps = {
    filters: RepositoryFiltersType;
    catalog: RepositoryCatalog;
    children?: ReactNode;
};

const CheckboxGroup = ({
    title,
    name,
    options,
    selected,
}: {
    title: string;
    name: string;
    options: Array<{ value: string; label: string }>;
    selected: string[];
}) => {
    return (
        <fieldset className="space-y-2">
            <legend className="text-sm font-semibold text-foreground">
                {title}
            </legend>
            <ul className="space-y-1.5">
                {options.map((option) => (
                    <li key={option.value}>
                        <label className="flex items-center gap-2 text-sm text-foreground">
                            <Checkbox
                                name={`${name}[]`}
                                value={option.value}
                                defaultChecked={selected.includes(option.value)}
                            />
                            <span>{option.label}</span>
                        </label>
                    </li>
                ))}
            </ul>
        </fieldset>
    );
};

export const RepositoryFilters = ({
    filters,
    catalog,
    children,
}: RepositoryFiltersProps) => {
    const careerOptions = Object.entries(catalog.careers).map(
        ([value, label]) => ({ value, label: `${value} — ${label}` }),
    );
    const typeOptions = catalog.types.map((value) => ({
        value,
        label: value,
    }));
    const levelOptions = Object.entries(catalog.levels).map(
        ([value, label]) => ({ value, label }),
    );

    return (
        <Form
            {...index.form()}
            className="grid items-start gap-6 lg:grid-cols-[260px_minmax(0,1fr)]"
        >
            <aside className="sticky top-4 flex max-h-[calc(100vh-2rem)] flex-col overflow-hidden rounded-xl border border-border bg-card">
                <div className="shrink-0 border-b border-border px-4 py-3">
                    <h2 className="text-base font-semibold text-primary">
                        Filtros
                    </h2>
                </div>

                <div className="min-h-0 flex-1 space-y-5 overflow-y-auto px-4 py-4">
                    <CheckboxGroup
                        title="Carrera"
                        name="carrera"
                        options={careerOptions}
                        selected={filters.carrera}
                    />
                    <CheckboxGroup
                        title="Tipo"
                        name="tipo"
                        options={typeOptions}
                        selected={filters.tipo}
                    />
                    <CheckboxGroup
                        title="Nivel"
                        name="nivel"
                        options={levelOptions}
                        selected={filters.nivel}
                    />

                    <fieldset className="space-y-2">
                        <legend className="text-sm font-semibold text-foreground">
                            Fecha
                        </legend>
                        <Input
                            type="date"
                            name="year[]"
                            defaultValue={filters.year[0] ?? ''}
                            aria-label="Fecha inicial"
                        />
                        <Input
                            type="date"
                            name="year[]"
                            defaultValue={filters.year[1] ?? ''}
                            aria-label="Fecha final"
                        />
                    </fieldset>
                </div>

                <div className="sticky bottom-0 shrink-0 space-y-2 border-t border-border bg-card px-4 py-3">
                    <Button type="submit" className="w-full">
                        Aplicar filtros
                    </Button>
                    <Button
                        type="button"
                        variant="outline"
                        className="w-full"
                        onClick={() => router.get(index.url())}
                    >
                        Limpiar
                    </Button>
                </div>
            </aside>

            <div className="min-w-0 space-y-4">
                <div className="rounded-xl border border-border bg-card p-4">
                    <div className="grid gap-3 sm:grid-cols-[minmax(0,1fr)_180px_auto]">
                        <Input
                            name="query"
                            placeholder="Buscar..."
                            defaultValue={filters.query}
                            aria-label="Buscar repositorios"
                        />
                        <select
                            name="search_field"
                            defaultValue={filters.search_field || 'title'}
                            className="h-8 rounded-lg border border-input bg-card px-2.5 text-sm"
                            aria-label="Campo de búsqueda"
                        >
                            <option value="title">Título</option>
                            <option value="description">Descripción</option>
                            <option value="author">Autor</option>
                        </select>
                        <Button type="submit">Buscar</Button>
                    </div>
                </div>

                {children}
            </div>
        </Form>
    );
};
