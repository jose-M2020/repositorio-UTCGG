import { Form, router } from '@inertiajs/react';
import { index } from '@/actions/App/Http/Controllers/UserController';
import { Button, Input } from '@/shared/components/ui';
import type { UsersFilters as UsersFiltersType } from '../types';

type UsersFiltersProps = {
    filters: UsersFiltersType;
    roles: string[];
};

export const UsersFilters = ({ filters, roles }: UsersFiltersProps) => {
    const handleReset = () => {
        router.get(index.url());
    };

    return (
        <Form
            {...index.form()}
            className="grid gap-3 rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900 sm:grid-cols-4"
        >
            <Input
                name="query"
                placeholder="Buscar por nombre o correo"
                defaultValue={filters.query}
                aria-label="Buscar usuarios"
            />
            <Input
                name="carrera"
                placeholder="Carrera"
                defaultValue={filters.carrera}
                aria-label="Filtrar por carrera"
            />
            <select
                name="rol"
                defaultValue={filters.rol || 'all'}
                className="h-8 w-full rounded-lg border border-input bg-transparent px-2.5 text-sm outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 dark:bg-input/30"
                aria-label="Filtrar por rol"
            >
                <option value="all">Todos los roles</option>
                {roles.map((role) => (
                    <option key={role} value={role}>
                        {role}
                    </option>
                ))}
            </select>
            <div className="flex gap-2">
                <Button type="submit" className="flex-1">
                    Filtrar
                </Button>
                <Button
                    type="button"
                    variant="outline"
                    className="flex-1"
                    onClick={handleReset}
                >
                    Limpiar
                </Button>
            </div>
        </Form>
    );
};
