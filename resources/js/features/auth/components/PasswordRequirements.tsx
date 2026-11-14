import { Check, Circle } from 'lucide-react';
import { PASSWORD_REQUIREMENTS } from '../utils/passwordRequirements';

type PasswordRequirementsProps = {
    password: string;
};

export const PasswordRequirements = ({
    password,
}: PasswordRequirementsProps) => {
    return (
        <ul className="space-y-1.5 rounded-lg border border-slate-200 bg-slate-50 px-3 py-2.5 dark:border-slate-800 dark:bg-slate-950/60">
            {PASSWORD_REQUIREMENTS.map((requirement) => {
                const isMet = requirement.test(password);

                return (
                    <li
                        key={requirement.id}
                        className={`flex items-center gap-2 text-sm ${
                            isMet
                                ? 'text-emerald-700 dark:text-emerald-400'
                                : 'text-slate-500 dark:text-slate-400'
                        }`}
                    >
                        {isMet ? (
                            <Check
                                className="size-3.5 shrink-0"
                                aria-hidden="true"
                            />
                        ) : (
                            <Circle
                                className="size-3.5 shrink-0"
                                aria-hidden="true"
                            />
                        )}
                        <span>{requirement.label}</span>
                    </li>
                );
            })}
        </ul>
    );
};
