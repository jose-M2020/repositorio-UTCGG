import { useState } from "react";
import { cn } from "cn";
import { Checkbox } from "@/shared/components/ui";

export type CheckboxFieldProps = {
    id: string;
    name: string;
    label: string;
    description?: string;
    defaultChecked?: boolean;
    checked?: boolean;
    onCheckedChange?: (checked: boolean) => void;
    error?: string;
    disabled?: boolean;
    className?: string;
};

export const CheckboxField = ({
    id,
    name,
    label,
    description,
    defaultChecked = false,
    checked,
    onCheckedChange,
    error,
    disabled = false,
    className,
}: CheckboxFieldProps) => {
    const isControlled = checked !== undefined;
    const [uncontrolledChecked, setUncontrolledChecked] =
        useState(defaultChecked);

    const isChecked = isControlled ? checked : uncontrolledChecked;
    const errorId = error ? `${id}-error` : undefined;
    const descriptionId = description ? `${id}-description` : undefined;
    const describedBy =
        [descriptionId, errorId].filter(Boolean).join(" ") || undefined;

    const handleCheckedChange = (next: boolean | "indeterminate") => {
        const nextChecked = next === true;
        if (!isControlled) {
            setUncontrolledChecked(nextChecked);
        }
        onCheckedChange?.(nextChecked);
    };

    return (
        <div
            className={cn(
                "rounded-lg border border-border bg-card/40 p-3 transition-colors",
                "hover:bg-muted/30 has-focus-visible:border-ring has-focus-visible:ring-3 has-focus-visible:ring-ring/50",
                error && "border-destructive/40",
                disabled && "opacity-60",
                className,
            )}
        >
            <input type="hidden" name={name} value={isChecked ? "1" : "0"} />

            <div className="flex items-start gap-3">
                <Checkbox
                    id={id}
                    checked={isChecked}
                    disabled={disabled}
                    onCheckedChange={handleCheckedChange}
                    aria-invalid={Boolean(error) || undefined}
                    aria-describedby={describedBy}
                    className="mt-0.5"
                />
                <label
                    htmlFor={id}
                    className={cn(
                        "min-w-0 flex-1 space-y-0.5",
                        disabled ? "cursor-not-allowed" : "cursor-pointer",
                    )}
                >
                    <span className="block text-sm font-medium leading-none text-foreground">
                        {label}
                    </span>
                    {description ? (
                        <span
                            id={descriptionId}
                            className="block text-xs leading-relaxed text-muted-foreground"
                        >
                            {description}
                        </span>
                    ) : null}
                </label>
            </div>

            {error ? (
                <p
                    id={errorId}
                    className="mt-2 text-[0.8rem] font-medium text-destructive"
                    role="alert"
                >
                    {error}
                </p>
            ) : null}
        </div>
    );
};
