import { Input } from "@/shared/components/ui";
import type { EducationLevelFormErrors, EducationLevelFormValues } from "../types";

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
    return (
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
                        aria-describedby="education-level-code-locked-hint"
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
                        id="education-level-code-locked-hint"
                        className="text-xs text-muted-foreground"
                    >
                        El codigo no se puede cambiar despues de crear el nivel.
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
    );
};