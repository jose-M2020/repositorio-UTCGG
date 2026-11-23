import { useState } from "react";
import { InputField, SelectField } from "@/shared/components/form";
import { ProjectPeriodField } from "../../../shared/components/ProjectPeriodField";
import type {
    RepositoryFormErrors,
    RepositoryLookups,
} from "../../../shared/types";

type RepositoryCreateStepProjectProps = {
    errors: RepositoryFormErrors;
    isActive: boolean;
    lookups: RepositoryLookups;
    defaultCareer?: string;
};

const mapOptions = (options: Record<string, string>) =>
    Object.entries(options).map(([code, label]) => ({
        value: code,
        label,
    }));

export const RepositoryCreateStepProject = ({
    errors,
    isActive,
    lookups,
    defaultCareer,
}: RepositoryCreateStepProjectProps) => {
    const [projectType, setProjectType] = useState("");
    const resolvedDefaultCareer =
        defaultCareer && defaultCareer in lookups.careers
            ? defaultCareer
            : null;
    const projectMeta = lookups.project_types_meta?.find(
        (meta) => meta.code === projectType,
    );

    const handleProjectTypeChange = (value: string | null) => {
        setProjectType(value ?? "");
    };

    return (
        <section
            className="animate-in fade-in slide-in-from-right-2 space-y-6 duration-300"
            aria-hidden={!isActive}
            hidden={!isActive}
        >
            <div>
                <h2 className="text-lg font-semibold text-foreground">
                    Proyecto
                </h2>
                <p className="text-[0.8rem] text-muted-foreground">
                    Datos académicos básicos. Los asesores se configuran luego.
                </p>
            </div>

            <div className="grid gap-6 sm:grid-cols-2">
                <SelectField
                    id="project_type"
                    name="project_type"
                    label="Tipo de proyecto"
                    required={isActive}
                    error={errors.project_type}
                    options={mapOptions(lookups.project_types)}
                    onValueChange={handleProjectTypeChange}
                />

                <SelectField
                    id="academic_degree"
                    name="academic_degree"
                    label="Nivel de proyecto"
                    required={isActive}
                    error={errors.academic_degree}
                    options={mapOptions(lookups.education_levels)}
                />
            </div>

            <ProjectPeriodField
                lookups={lookups}
                projectTypeCode={projectType}
                error={errors.project_period_id}
                required={isActive}
            />

            {projectMeta?.requires_academic_advisor ||
            projectMeta?.requires_business_advisor ? (
                <div className="rounded-lg border border-border bg-muted/30 px-3 py-2 text-[0.8rem] text-muted-foreground">
                    {projectMeta.requires_academic_advisor
                        ? 'Este tipo usa asesor academico (docente): se asigna despues segun el periodo y la disponibilidad.'
                        : null}
                    {projectMeta.requires_academic_advisor &&
                    projectMeta.requires_business_advisor
                        ? ' '
                        : null}
                    {projectMeta.requires_business_advisor
                        ? 'Tambien pedira asesor empresarial: lo agregas desde la gestion del proyecto (buscar o registrar).'
                        : null}
                </div>
            ) : null}

            <div className="grid gap-6 sm:grid-cols-2">
                <SelectField
                    id="career"
                    name="career"
                    label="Carrera"
                    required={isActive}
                    defaultValue={resolvedDefaultCareer}
                    error={errors.career}
                    placeholder="Seleccionar carrera"
                    options={mapOptions(lookups.careers)}
                />

                <InputField
                    id="generation"
                    name="generation"
                    label="Generación"
                    required={isActive}
                    error={errors.generation}
                />
            </div>
        </section>
    );
};
