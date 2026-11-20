import { SelectField } from "@/shared/components/form";
import type { RepositoryLookups } from "../types";

type ProjectPeriodFieldProps = {
    lookups: RepositoryLookups;
    projectTypeCode: string;
    defaultPeriodId?: number | null;
    error?: string;
    required?: boolean;
};

export const ProjectPeriodField = ({
    lookups,
    projectTypeCode,
    defaultPeriodId = null,
    error,
    required = true,
}: ProjectPeriodFieldProps) => {
    const requiresAdvisor = Boolean(
        lookups.project_types_meta?.find((meta) => meta.code === projectTypeCode)
            ?.requires_academic_advisor,
    );

    if (!requiresAdvisor) {
        return null;
    }

    const periodOptions = (lookups.open_periods ?? [])
        .filter((period) => period.project_type_code === projectTypeCode)
        .map((period) => ({
            value: String(period.id),
            label: period.name,
        }));

    return (
        <SelectField
            id="project_period_id"
            name="project_period_id"
            label="Periodo de proyecto"
            required={required}
            defaultValue={defaultPeriodId ? String(defaultPeriodId) : ""}
            error={error}
            placeholder="Selecciona un periodo abierto"
            options={periodOptions}
        />
    );
};
