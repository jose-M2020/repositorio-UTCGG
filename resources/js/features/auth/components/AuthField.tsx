import type { AuthFieldProps } from '../types';

const inputClassName =
    'w-full rounded-md border border-slate-300 px-3 py-2 text-sm text-slate-900 outline-none transition focus:border-slate-500 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100';

export const AuthField = ({
    id,
    name,
    label,
    type = 'text',
    error,
    required = false,
    autoComplete,
    maxLength,
}: AuthFieldProps) => {
    return (
        <div className="space-y-1">
            <label
                htmlFor={id}
                className="text-sm font-medium text-slate-700 dark:text-slate-300"
            >
                {label}
            </label>
            <input
                id={id}
                name={name}
                type={type}
                required={required}
                autoComplete={autoComplete}
                maxLength={maxLength}
                aria-invalid={Boolean(error)}
                aria-describedby={error ? `${id}-error` : undefined}
                className={inputClassName}
            />
            {error ? (
                <p
                    id={`${id}-error`}
                    className="text-sm text-red-600 dark:text-red-400"
                >
                    {error}
                </p>
            ) : null}
        </div>
    );
};
