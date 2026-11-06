import { Form, router } from '@inertiajs/react';
import { index } from '@/actions/App/Http/Controllers/RepositorioController';
import { Button, Input } from '@/shared/components/ui';
import type { RepositoryFilters as RepositoryFiltersType } from '../types';

type RepositoryFiltersProps = {
    filters: RepositoryFiltersType;
};

export const RepositoryFilters = ({ filters }: RepositoryFiltersProps) => {
    return (
        <Form
            {...index.form()}
            className="grid gap-3 rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900 sm:grid-cols-4"
        >
            <Input
                name="query"
                placeholder="Buscar..."
                defaultValue={filters.query}
                aria-label="Buscar repositorios"
            />
            <select
                name="search_field"
                defaultValue={filters.search_field || 'title'}
                className="h-8 rounded-lg border border-input bg-transparent px-2.5 text-sm dark:bg-input/30"
                aria-label="Campo de búsqueda"
            >
                <option value="title">Título</option>
                <option value="description">Descripción</option>
                <option value="author">Autor</option>
            </select>
            <Input
                name="carrera"
                placeholder="Carrera"
                defaultValue={filters.carrera}
                aria-label="Filtrar por carrera"
            />
            <div className="flex gap-2">
                <Button type="submit" className="flex-1">
                    Filtrar
                </Button>
                <Button
                    type="button"
                    variant="outline"
                    className="flex-1"
                    onClick={() => router.get(index.url())}
                >
                    Limpiar
                </Button>
            </div>
        </Form>
    );
};
