import { Form, router } from '@inertiajs/react';
import { index } from '@/actions/App/Http/Controllers/UserController';
import { Button, Checkbox, Input } from '@/shared/components/ui';
import { careers } from '@/shared/data/catalog';
import type { UsersFilters as UsersFiltersType } from '../types';

type UsersFiltersProps = {
    filters: UsersFiltersType;
    roles: string[];
    careersOptions?: Record<string, string>;
};

const datePresets = [
    { value: 'hoy', label: 'Hoy' },
    { value: 'semana', label: 'Esta Semana' },
    { value: 'mes', label: 'Este mes' },
    { value: 'año', label: 'Este año' },
] as const;

export const UsersFilters = ({
    filters,
    roles,
    careersOptions = careers,
}: UsersFiltersProps) => {
    return (
        <Form
            {...index.form()}
            className="space-y-4 rounded-xl border border-border bg-card p-4"
        >
            <div className="grid gap-3 sm:grid-cols-[minmax(0,1fr)_180px_auto]">
                <Input
                    name="query"
                    placeholder="Buscar usuario..."
                    defaultValue={filters.query}
                    aria-label="Buscar usuarios"
                />
                <select
                    name="rol"
                    defaultValue={filters.rol || 'all'}
                    className="h-8 w-full rounded-lg border border-input bg-card px-2.5 text-sm"
                    aria-label="Filtrar por rol"
                >
                    <option value="all">Todos</option>
                    {roles.map((role) => (
                        <option key={role} value={role}>
                            {role}
                        </option>
                    ))}
                </select>
                <Button type="submit">Aplicar filtros</Button>
            </div>

            <div className="grid gap-4 lg:grid-cols-2">
                <fieldset className="space-y-2">
                    <legend className="text-sm font-semibold text-foreground">
                        Por carrera
                    </legend>
                    <ul className="grid grid-cols-2 gap-1.5 sm:grid-cols-3">
                        {Object.entries(careersOptions).map(([code, label]) => (
                            <li key={code}>
                                <label
                                    className="flex items-center gap-2 text-sm"
                                    title={label}
                                >
                                    <Checkbox
                                        name="carrera[]"
                                        value={code}
                                        defaultChecked={filters.carrera.includes(
                                            code,
                                        )}
                                    />
                                    <span>{code}</span>
                                </label>
                            </li>
                        ))}
                    </ul>
                </fieldset>

                <fieldset className="space-y-2">
                    <legend className="text-sm font-semibold text-foreground">
                        Por fecha
                    </legend>
                    <ul className="space-y-1.5">
                        {datePresets.map((preset) => (
                            <li key={preset.value}>
                                <label className="flex items-center gap-2 text-sm">
                                    <input
                                        type="radio"
                                        name="fecha"
                                        value={preset.value}
                                        defaultChecked={
                                            filters.fecha === preset.value
                                        }
                                        className="size-4 accent-primary"
                                    />
                                    <span>{preset.label}</span>
                                </label>
                            </li>
                        ))}
                    </ul>
                    <p className="pt-2 text-xs text-muted-foreground">
                        Establecer rango
                    </p>
                    <div className="flex items-center gap-2">
                        <Input
                            type="date"
                            name="rango_fecha[]"
                            defaultValue={filters.rango_fecha[0] ?? ''}
                            aria-label="Fecha inicial"
                        />
                        <span className="text-muted-foreground">-</span>
                        <Input
                            type="date"
                            name="rango_fecha[]"
                            defaultValue={filters.rango_fecha[1] ?? ''}
                            aria-label="Fecha final"
                        />
                    </div>
                </fieldset>
            </div>

            <div className="flex justify-end">
                <Button
                    type="button"
                    variant="outline"
                    onClick={() => router.get(index.url())}
                >
                    Resetear
                </Button>
            </div>
        </Form>
    );
};
