import {
    CheckboxField,
    FormField,
    InputField,
    TextareaField,
    fieldDescribedBy,
} from "@/shared/components/form";
import { Input } from "@/shared/components/ui";
import type { ProjectTypeFormErrors, ProjectTypeFormValues } from "../types";

type ProjectTypeFormFieldsProps = {
    errors: ProjectTypeFormErrors;
    defaults?: ProjectTypeFormValues;
    isEdit?: boolean;
};

export const ProjectTypeFormFields = ({
    errors,
    defaults,
    isEdit = false,
}: ProjectTypeFormFieldsProps) => {
    const codeHint = isEdit
        ? "El codigo no se puede cambiar despues de crear el tipo."
        : undefined;

    return (
        <div className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
                <FormField
                    id="code"
                    label="Codigo"
                    error={errors.code}
                    hint={codeHint}
                >
                    {isEdit ? (
                        <Input
                            id="code"
                            readOnly
                            value={defaults?.code ?? ""}
                            className="bg-muted"
                            aria-describedby={fieldDescribedBy("code", {
                                error: errors.code,
                                hint: codeHint,
                            })}
                        />
                    ) : (
                        <Input
                            id="code"
                            name="code"
                            required
                            defaultValue={defaults?.code}
                            aria-invalid={Boolean(errors.code) || undefined}
                            aria-describedby={fieldDescribedBy("code", {
                                error: errors.code,
                            })}
                        />
                    )}
                </FormField>

                <InputField
                    id="name"
                    name="name"
                    label="Nombre"
                    required
                    defaultValue={defaults?.name}
                    error={errors.name}
                />

                <TextareaField
                    id="description"
                    name="description"
                    label="Descripcion"
                    rows={3}
                    defaultValue={defaults?.description}
                    error={errors.description}
                    fieldClassName="sm:col-span-2"
                />

                <InputField
                    id="sort_order"
                    name="sort_order"
                    label="Orden"
                    type="number"
                    min={0}
                    required
                    defaultValue={defaults?.sort_order ?? 0}
                    error={errors.sort_order}
                />
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
                <CheckboxField
                    id="is_team_project"
                    name="is_team_project"
                    label="Proyecto en equipo"
                    description="Permite registrar el proyecto con varios integrantes asignados."
                    defaultChecked={defaults?.is_team_project}
                    error={errors.is_team_project}
                />
                <CheckboxField
                    id="requires_term"
                    name="requires_term"
                    label="Requiere cuatrimestre"
                    description="El proyecto debe vincularse a un periodo o cuatrimestre academico."
                    defaultChecked={defaults?.requires_term}
                    error={errors.requires_term}
                />
                <CheckboxField
                    id="requires_internship_flow"
                    name="requires_internship_flow"
                    label="Flujo de estadía"
                    description="Activa el flujo de estadía o practicas profesionales."
                    defaultChecked={defaults?.requires_internship_flow}
                    error={errors.requires_internship_flow}
                />
                <CheckboxField
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
