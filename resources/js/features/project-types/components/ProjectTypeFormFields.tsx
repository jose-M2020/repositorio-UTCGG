import { cn } from "cn";
import { Input } from "@/shared/components/ui";
import type { ProjectTypeFormErrors, ProjectTypeFormValues } from "../types";

type ProjectTypeFormFieldsProps = {
    errors: ProjectTypeFormErrors;
    defaults?: ProjectTypeFormValues;
    isEdit?: boolean;
};

const textareaClassName = cn(
    "w-full min-w-0 rounded-lg border border-input bg-transparent px-2.5 py-2 text-base transition-colors outline-none placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 disabled:pointer-events-none disabled:cursor-not-allowed disabled:bg-input/50 disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 md:text-sm dark:bg-input/30",
);

type BooleanFlagFieldProps = {
    id: string;
    name: string;
    label: string;
    description: string;
    defaultChecked?: boolean;
    error?: string;
};

const BooleanFlagField = ({
    id,
    name,
    label,
    description,
    defaultChecked = false,
    error,
}: BooleanFlagFieldProps) => {
    return (
        <div className="space-y-1 rounded-lg border border-border p-3">
            <input type="hidden" name={name} value="0" />
            <label
                htmlFor={id}
                className="flex cursor-pointer items-start gap-3"
            >
                <input
                    id={id}
                    name={name}
                    type="checkbox"
                    value="1"
                    defaultChecked={defaultChecked}
                    aria-invalid={Boolean(error)}
                    className="mt-0.5 size-4 shrink-0 rounded border border-input accent-primary"
                />
                <span className="space-y-0.5">
                    <span className="block text-sm font-medium">{label}</span>
                    <span className="block text-xs text-muted-foreground">
                        {description}
                    </span>
                </span>
            </label>
            {error ? <p className="text-sm text-destructive">{error}</p> : null}
        </div>
    );
};

export const ProjectTypeFormFields = ({
    errors,
    defaults,
    isEdit = false,
}: ProjectTypeFormFieldsProps) => {
    return (
        <div className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-1">
                    <label htmlFor="code" className="text-sm font-medium">
                        Codigo
                    </label>
                    {isEdit ? (
                        <Input
                            id="code"
                            readOnly
                            value={defaults?.code ?? ""}
                            className="bg-muted"
                            aria-describedby="project-type-code-locked-hint"
                        />
                    ) : (
                        <Input
                            id="code"
                            name="code"
                            required
                            defaultValue={defaults?.code}
                            aria-invalid={Boolean(errors.code)}
                        />
                    )}
                    {isEdit ? (
                        <p
                            id="project-type-code-locked-hint"
                            className="text-xs text-muted-foreground"
                        >
                            El codigo no se puede cambiar despues de crear el tipo.
                        </p>
                    ) : null}
                    {errors.code ? (
                        <p className="text-sm text-destructive">{errors.code}</p>
                    ) : null}
                </div>

                <div className="space-y-1">
                    <label htmlFor="name" className="text-sm font-medium">
                        Nombre
                    </label>
                    <Input
                        id="name"
                        name="name"
                        required
                        defaultValue={defaults?.name}
                        aria-invalid={Boolean(errors.name)}
                    />
                    {errors.name ? (
                        <p className="text-sm text-destructive">{errors.name}</p>
                    ) : null}
                </div>

                <div className="space-y-1 sm:col-span-2">
                    <label htmlFor="description" className="text-sm font-medium">
                        Descripcion
                    </label>
                    <textarea
                        id="description"
                        name="description"
                        rows={3}
                        defaultValue={defaults?.description}
                        aria-invalid={Boolean(errors.description)}
                        className={textareaClassName}
                    />
                    {errors.description ? (
                        <p className="text-sm text-destructive">{errors.description}</p>
                    ) : null}
                </div>

                <div className="space-y-1">
                    <label htmlFor="sort_order" className="text-sm font-medium">
                        Orden
                    </label>
                    <Input
                        id="sort_order"
                        name="sort_order"
                        type="number"
                        min={0}
                        required
                        defaultValue={defaults?.sort_order ?? 0}
                        aria-invalid={Boolean(errors.sort_order)}
                    />
                    {errors.sort_order ? (
                        <p className="text-sm text-destructive">{errors.sort_order}</p>
                    ) : null}
                </div>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
                <BooleanFlagField
                    id="is_team_project"
                    name="is_team_project"
                    label="Proyecto en equipo"
                    description="Permite registrar el proyecto con varios integrantes asignados."
                    defaultChecked={defaults?.is_team_project}
                    error={errors.is_team_project}
                />
                <BooleanFlagField
                    id="requires_term"
                    name="requires_term"
                    label="Requiere cuatrimestre"
                    description="El proyecto debe vincularse a un periodo o cuatrimestre academico."
                    defaultChecked={defaults?.requires_term}
                    error={errors.requires_term}
                />
                <BooleanFlagField
                    id="requires_internship_flow"
                    name="requires_internship_flow"
                    label="Flujo de estadía"
                    description="Activa el flujo de estadía o practicas profesionales."
                    defaultChecked={defaults?.requires_internship_flow}
                    error={errors.requires_internship_flow}
                />
                <BooleanFlagField
                    id="requires_business_advisor"
                    name="requires_business_advisor"
                    label="Asesor empresarial"
                    description="Exige asignar un asesor empresarial al proyecto."
                    defaultChecked={defaults?.requires_business_advisor}
                    error={errors.requires_business_advisor}
                />
            </div>
        </div>
    );
};