import { Input } from '@/shared/components/ui';
import type { AuthFieldProps } from '../types';

export const AuthField = ({
    id,
    name,
    label,
    type = 'text',
    error,
    required = false,
    autoComplete,
    maxLength,
    defaultValue,
    value,
    readOnly = false,
    onChange,
}: AuthFieldProps) => {
    return (
        <div className="space-y-1">
            <label
                htmlFor={id}
                className="text-sm font-medium text-foreground"
            >
                {label}
            </label>
            <Input
                id={id}
                name={name}
                type={type}
                required={required}
                autoComplete={autoComplete}
                maxLength={maxLength}
                defaultValue={value === undefined ? defaultValue : undefined}
                value={value}
                readOnly={readOnly}
                onChange={onChange}
                aria-invalid={Boolean(error)}
                aria-describedby={error ? `${id}-error` : undefined}
            />
            {error ? (
                <p
                    id={`${id}-error`}
                    className="text-sm text-destructive"
                >
                    {error}
                </p>
            ) : null}
        </div>
    );
};
