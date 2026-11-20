import { Link, usePage } from "@inertiajs/react";
import { show } from "@/actions/App/Http/Controllers/ProjectPeriodController";
import { AUTH_ABILITIES } from "@/features/auth";
import { Button } from "@/shared/components/ui";
import { ProjectPeriodFormDialog } from "../components/form/ProjectPeriodFormDialog";
import type { PaginatedProjectPeriods, ProjectTypeOption } from "../types";

type ProjectPeriodsIndexContainerProps = {
    periods: PaginatedProjectPeriods;
    projectTypes: ProjectTypeOption[];
    defaultAdvisorCapacity: number;
};

export const ProjectPeriodsIndexContainer = ({
    periods,
    projectTypes,
    defaultAdvisorCapacity,
}: ProjectPeriodsIndexContainerProps) => {
    const { auth, flash } = usePage().props;
    const canCreate = auth.abilities[AUTH_ABILITIES.PROJECT_PERIODS_CREATE];

    return (
        <main className="page-container space-y-6 py-8">
            <header className="flex flex-wrap items-center justify-between gap-3">
                <div>
                    <h1 className="text-2xl font-semibold text-slate-900 dark:text-slate-100">
                        Periodos de proyecto
                    </h1>
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                        Temporadas de estadia, integradora y asignacion de asesores.
                    </p>
                </div>
                {canCreate ? (
                    <ProjectPeriodFormDialog
                        mode="create"
                        projectTypes={projectTypes}
                        defaultAdvisorCapacity={defaultAdvisorCapacity}
                        trigger={<Button type="button" />}
                        triggerContent="Nuevo periodo"
                    />
                ) : null}
            </header>

            {flash.status ? (
                <p className="rounded-lg border border-emerald-200 bg-emerald-50 px-3 py-2 text-sm text-emerald-800">
                    {flash.status}
                </p>
            ) : null}

            <div className="overflow-hidden rounded-xl border border-border">
                <table className="min-w-full divide-y divide-border text-sm">
                    <thead className="bg-muted/40">
                        <tr>
                            <th className="px-4 py-3 text-left font-medium">Nombre</th>
                            <th className="px-4 py-3 text-left font-medium">Tipo</th>
                            <th className="px-4 py-3 text-left font-medium">Fechas</th>
                            <th className="px-4 py-3 text-left font-medium">Estado</th>
                            <th className="px-4 py-3 text-right font-medium">Acciones</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-border bg-background">
                        {periods.data.map((period) => (
                            <tr key={period.id}>
                                <td className="px-4 py-3">{period.name}</td>
                                <td className="px-4 py-3">{period.project_type}</td>
                                <td className="px-4 py-3">
                                    {period.starts_at} — {period.ends_at}
                                </td>
                                <td className="px-4 py-3">{period.status_label}</td>
                                <td className="px-4 py-3 text-right">
                                    <Button
                                        type="button"
                                        variant="outline"
                                        size="sm"
                                        render={<Link href={show.url(period.id)} />}
                                    >
                                        Abrir
                                    </Button>
                                </td>
                            </tr>
                        ))}
                        {periods.data.length === 0 ? (
                            <tr>
                                <td
                                    colSpan={5}
                                    className="px-4 py-8 text-center text-muted-foreground"
                                >
                                    No hay periodos registrados.
                                </td>
                            </tr>
                        ) : null}
                    </tbody>
                </table>
            </div>
        </main>
    );
};
