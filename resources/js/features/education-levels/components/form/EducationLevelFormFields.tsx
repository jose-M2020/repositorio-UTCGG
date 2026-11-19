import {
    FormField,
    InputField,
    fieldDescribedBy,
} from "@/shared/components/form";
import { Input } from "@/shared/components/ui";
import type { EducationLevelFormErrors, EducationLevelFormValues } from "../../types";

type EducationLevelFormFieldsProps = {
    errors: EducationLevelFormErrors;
    defaults?: EducationLevelFormValues;
    isEdit?: boolean;
};

export const EducationLevelFormFields = ({
    errors,
    defaults,
    isEdit = false,
}: EducationLevelFormFieldsProps) => {
    const codeHint = isEdit
        ? "El codigo no se puede cambiar despues de crear el nivel."
        : undefined;

    return (
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
    );
};
