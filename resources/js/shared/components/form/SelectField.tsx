import { useState } from "react";
import { cn } from "cn";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/shared/components/ui";
import { FormField, fieldDescribedBy } from "./FormField";

export type SelectOption = {
    value: string;
    label: string;
    disabled?: boolean;
};

export type SelectFieldProps = {
    id: string;
    name?: string;
    label: string;
    options: SelectOption[];
    placeholder?: string;
    error?: string;
    hint?: string;
    required?: boolean;
    disabled?: boolean;
    /** Controlled value. Use `null` or `""` for placeholder. */
    value?: string | null;
    /** Uncontrolled initial value. */
    defaultValue?: string | null;
    onValueChange?: (value: string | null) => void;
    fieldClassName?: string;
    triggerClassName?: string;
    "aria-label"?: string;
};

const toSelectValue = (value: string | null | undefined): string | null => {
    if (value === undefined || value === null || value === "") {
        return null;
    }

    return value;
};

export const SelectField = ({
    id,
    name,
    label,
    options,
    placeholder = "Seleccionar",
    error,
    hint,
    required = false,
    disabled = false,
    value,
    defaultValue = null,
    onValueChange,
    fieldClassName,
    triggerClassName,
    "aria-label": ariaLabel,
}: SelectFieldProps) => {
    const isControlled = value !== undefined;
    const [uncontrolledValue, setUncontrolledValue] = useState<string | null>(
        toSelectValue(defaultValue),
    );

    const selectedValue = isControlled
        ? toSelectValue(value)
        : uncontrolledValue;

    const describedBy = fieldDescribedBy(id, { error, hint });

    const handleValueChange = (nextValue: string | null) => {
        if (!isControlled) {
            setUncontrolledValue(nextValue);
        }
        onValueChange?.(nextValue);
    };

    return (
        <FormField
            id={id}
            label={label}
            error={error}
            hint={hint}
            required={required}
            className={fieldClassName}
        >
            <Select
                name={name}
                required={required}
                items={options}
                value={selectedValue}
                onValueChange={handleValueChange}
                disabled={disabled}
            >
                <SelectTrigger
                    id={id}
                    className={cn("w-full", triggerClassName)}
                    aria-invalid={Boolean(error) || undefined}
                    aria-describedby={describedBy}
                    aria-label={ariaLabel}
                >
                    <SelectValue placeholder={placeholder} />
                </SelectTrigger>
                <SelectContent alignItemWithTrigger={false}>
                    {options.map((option) => (
                        <SelectItem
                            key={option.value}
                            value={option.value}
                            disabled={option.disabled}
                        >
                            {option.label}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
        </FormField>
    );
};
