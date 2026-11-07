import { Form, router } from '@inertiajs/react';
import { index } from '@/actions/App/Http/Controllers/CatalogController';
import { Button } from '@/shared/components/ui';
import type { CatalogFilters, CatalogTypesMap } from '../types';

type CatalogsFiltersProps = {
    filters: CatalogFilters;
    catalogTypes: CatalogTypesMap;
};

export const CatalogsFilters = ({
    filters,
    catalogTypes,
}: CatalogsFiltersProps) => {
    return (
        <Form
            {...index.form()}
            className="space-y-4 rounded-xl border border-border bg-card p-4"
        >
            <div className="grid gap-3 sm:grid-cols-[220px_auto_auto]">
                <select
                    name="type"
                    defaultValue={filters.type}
                    className="h-8 w-full rounded-lg border border-input bg-card px-2.5 text-sm"
                    aria-label="Filtrar por tipo de catalogo"
                >
                    <option value="all">Todos</option>
                    {Object.entries(catalogTypes).map(([value, label]) => (
                        <option key={value} value={value}>
                            {label}
                        </option>
                    ))}
                </select>
                <Button type="submit">Aplicar filtros</Button>
                <Button
                    type="button"
                    variant="outline"
                    onClick={() => router.get(index.url())}
                >
                    Limpiar
                </Button>
            </div>
        </Form>
    );
};
