import { InputField, SelectField, TextareaField } from "@/shared/components/form";
import type {
    Repository,
    RepositoryFormErrors,
    RepositoryLookups,
} from "../types";

type RepositoryFormFieldsProps = {
    errors: RepositoryFormErrors;
    defaults?: Partial<Repository> & { visibility?: string };
    lookups: RepositoryLookups;
};

const mapOptions = (options: Record<string, string>, withCode = false) =>
    Object.entries(options).map(([code, label]) => ({
        value: code,
        label: withCode ? `${code} — ${label}` : label,
    }));

export const RepositoryFormFields = ({
    errors,
    defaults,
    lookups,
}: RepositoryFormFieldsProps) => {
    return (
        <div className="space-y-4">
            <InputField
                id="title"
                name="title"
                label="Nombre del repositorio"
                required
                defaultValue={defaults?.title}
                error={errors.title}
            />

            <TextareaField
                id="description"
                name="description"
                label="Descripción"
                required
                rows={4}
                defaultValue={defaults?.description}
                error={errors.description}
            />

            <div className="grid gap-4 sm:grid-cols-2">
                <SelectField
                    id="project_type"
                    name="project_type"
                    label="Tipo de proyecto"
                    required
                    defaultValue={defaults?.project_type ?? ""}
                    error={errors.project_type}
                    placeholder="Selecciona"
                    options={mapOptions(lookups.project_types)}
                />

                <SelectField
                    id="academic_degree"
                    name="academic_degree"
                    label="Nivel"
                    required
                    defaultValue={defaults?.academic_degree ?? ""}
                    error={errors.academic_degree}
                    placeholder="Selecciona"
                    options={mapOptions(lookups.education_levels)}
                />
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
                <SelectField
                    id="career"
                    name="career"
                    label="Carrera"
                    required
                    defaultValue={defaults?.career ?? ""}
                    error={errors.career}
                    placeholder="Selecciona"
                    options={mapOptions(lookups.careers, true)}
                />

                <InputField
                    id="generation"
                    name="generation"
                    label="Generación"
                    required
                    defaultValue={defaults?.generation}
                    error={errors.generation}
                />
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
                <InputField
                    id="company"
                    name="company"
                    label="Empresa"
                    defaultValue={defaults?.company ?? ""}
                    error={errors.company}
                />
                <InputField
                    id="external_advisor"
                    name="external_advisor"
                    label="Asesor externo"
                    defaultValue={defaults?.external_advisor ?? ""}
                    error={errors.external_advisor}
                />
            </div>

            <InputField
                id="keywords"
                name="keywords"
                label="Palabras clave"
                required
                defaultValue={defaults?.keywords}
                error={errors.keywords}
            />

            <SelectField
                id="visibility"
                name="visibility"
                label="Visibilidad"
                required
                defaultValue={defaults?.visibility ?? "private"}
                error={errors.visibility}
                options={[
                    { value: "private", label: "Privado" },
                    { value: "public", label: "Público" },
                ]}
            />
        </div>
    );
};
