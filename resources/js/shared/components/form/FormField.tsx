import type { ReactNode } from 'react';
import { cn } from 'cn';

export type FormFieldProps = {
  id: string;
  label: string;
  error?: string;
  hint?: string;
  required?: boolean;
  className?: string;
  children: ReactNode;
};

export const fieldDescribedBy = (
  id: string,
  options: { error?: string; hint?: string },
): string | undefined => {
  const parts = [
    options.hint ? `${id}-hint` : null,
    options.error ? `${id}-error` : null,
  ].filter(Boolean);

  return parts.length > 0 ? parts.join(' ') : undefined;
};

export const FormField = ({
  id,
  label,
  error,
  hint,
  required = false,
  className,
  children,
}: FormFieldProps) => {
  return (
    <div className={cn('group/field space-y-2', className)}>
      <label
        htmlFor={id}
        className="text-sm leading-none font-medium text-foreground peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
      >
        {label}
        {required ? (
          <span className="text-destructive" aria-hidden="true">
            {' '}
            *
          </span>
        ) : null}
      </label>
      {children}
      {hint ? (
        <p id={`${id}-hint`} className="text-xs text-muted-foreground">
          {hint}
        </p>
      ) : null}
      {error ? (
        <p
          id={`${id}-error`}
          className="text-[0.8rem] font-medium text-destructive"
          role="alert"
        >
          {error}
        </p>
      ) : null}
    </div>
  );
};
