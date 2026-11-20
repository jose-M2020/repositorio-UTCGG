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
    onProjectTypeChange?: (code: string) => void;
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
    onProjectTypeChange,
}: RepositoryCreateStepProjectProps) => {
    const [projectType, setProjectType] = useState("");
    const resolvedDefaultCareer =
        defaultCareer && defaultCareer in lookups.careers
            ? defaultCareer
            : null;

    const handleProjectTypeChange = (value: string | null) => {
        const next = value ?? "";
        setProjectType(next);
        onProjectTypeChange?.(next);
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
                    Datos académicos del proyecto.
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
