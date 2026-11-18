import { CheckIcon } from 'lucide-react';
import { cn } from '@/shared/lib';
import {
    REPOSITORY_CREATE_STEPS,
    type RepositoryCreateStepId,
    getStepIndex,
} from '../constants/repositoryCreateSteps';

type RepositoryCreateStepNavProps = {
    currentStep: RepositoryCreateStepId;
    onStepSelect: (stepId: RepositoryCreateStepId) => void;
};

export const RepositoryCreateStepNav = ({
    currentStep,
    onStepSelect,
}: RepositoryCreateStepNavProps) => {
    const currentIndex = getStepIndex(currentStep);

    return (
        <nav
            className="sticky top-0 z-10 flex shrink-0 gap-2 self-start overflow-x-auto border-b border-border bg-muted/20 p-4 md:sticky md:top-0 md:h-full md:flex-col md:self-stretch md:overflow-y-auto md:border-r md:border-b-0"
            aria-label="Pasos para crear repositorio"
        >
            {REPOSITORY_CREATE_STEPS.map((step, index) => {
                const isActive = step.id === currentStep;
                const isCompleted = index < currentIndex;
                const isReachable = index <= currentIndex;

                return (
                    <button
                        key={step.id}
                        type="button"
                        onClick={() => onStepSelect(step.id)}
                        disabled={!isReachable}
                        className={cn(
                            'flex shrink-0 items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm font-medium transition-all md:w-full',
                            isActive
                                ? 'bg-primary/10 text-primary'
                                : isReachable
                                  ? 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'
                                  : 'pointer-events-none text-muted-foreground/40',
                        )}
                        aria-current={isActive ? 'step' : undefined}
                    >
                        <span
                            className={cn(
                                'flex size-7 shrink-0 items-center justify-center rounded-full border text-xs transition-colors',
                                isActive
                                    ? 'border-primary bg-primary text-primary-foreground'
                                    : isCompleted
                                      ? 'border-primary text-primary'
                                      : 'border-border bg-card text-muted-foreground',
                            )}
                        >
                            {isCompleted ? (
                                <CheckIcon className="size-4" />
                            ) : (
                                index + 1
                            )}
                        </span>
                        <span className="truncate whitespace-nowrap">
                            {step.label}
                        </span>
                    </button>
                );
            })}
        </nav>
    );
};
