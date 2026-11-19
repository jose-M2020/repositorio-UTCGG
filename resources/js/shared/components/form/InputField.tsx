import type { ComponentProps } from "react";
import { cn } from "cn";
import { Input } from "@/shared/components/ui";
import { FormField, fieldDescribedBy } from "./FormField";

export type InputFieldProps = Omit<ComponentProps<"input">, "id"> & {
    id: string;
    label: string;
    error?: string;
    hint?: string;
    fieldClassName?: string;
};

export const InputField = ({
    id,
    label,
    error,
    hint,
    required,
    fieldClassName,
    className,
    "aria-describedby": ariaDescribedBy,
    ...inputProps
}: InputFieldProps) => {
    const describedBy =
        ariaDescribedBy ?? fieldDescribedBy(id, { error, hint });

    return (
        <FormField
            id={id}
            label={label}
            error={error}
            hint={hint}
            required={required}
            className={fieldClassName}
        >
            <Input
                id={id}
                required={required}
                {...inputProps}
                className={cn(className)}
                aria-invalid={Boolean(error) || undefined}
                aria-describedby={describedBy}
            />
        </FormField>
    );
};
