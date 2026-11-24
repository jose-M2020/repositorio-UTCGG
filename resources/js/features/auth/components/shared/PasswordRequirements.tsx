import { Check, Circle } from 'lucide-react';
import { cn } from 'cn';
import { PASSWORD_REQUIREMENTS } from '../../utils/passwordRequirements';

type PasswordRequirementsProps = {
  password: string;
};

export const PasswordRequirements = ({
  password,
}: PasswordRequirementsProps) => {
  return (
    <ul
      className="space-y-1.5 rounded-lg border border-border bg-muted/40 px-3 py-2.5"
      aria-label="Requisitos de la contraseña"
    >
      {PASSWORD_REQUIREMENTS.map((requirement) => {
        const isMet = requirement.test(password);

        return (
          <li
            key={requirement.id}
            className={cn(
              'flex items-center gap-2 text-sm transition-colors',
              isMet
                ? 'text-emerald-700 dark:text-emerald-400'
                : 'text-muted-foreground',
            )}
          >
            {isMet ? (
              <span className="flex size-4 shrink-0 items-center justify-center rounded-full bg-emerald-500/15 text-emerald-600 dark:bg-emerald-400/15 dark:text-emerald-400">
                <Check className="size-2.5 stroke-[3]" aria-hidden="true" />
              </span>
            ) : (
              <Circle
                className="size-4 shrink-0 opacity-50"
                aria-hidden="true"
              />
            )}
            <span>{requirement.label}</span>
            <span className="sr-only">
              {isMet ? ', cumplido' : ', pendiente'}
            </span>
          </li>
        );
      })}
    </ul>
  );
};
