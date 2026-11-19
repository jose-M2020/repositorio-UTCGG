import type { ComponentProps } from "react";
import { cn } from "cn";
import { Textarea } from "@/shared/components/ui";
import { FormField, fieldDescribedBy } from "./FormField";

export type TextareaFieldProps = Omit<ComponentProps<"textarea">, "id"> & {
    id: string;
    label: string;
    error?: string;
    hint?: string;
    fieldClassName?: string;
};

export const TextareaField = ({
    id,
    label,
    error,
    hint,
    required,
    fieldClassName,
    className,
    "aria-describedby": ariaDescribedBy,
    ...textareaProps
}: TextareaFieldProps) => {
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
            <Textarea
                id={id}
                required={required}
                {...textareaProps}
                className={cn(className)}
                aria-invalid={Boolean(error) || undefined}
                aria-describedby={describedBy}
            />
        </FormField>
    );
};
