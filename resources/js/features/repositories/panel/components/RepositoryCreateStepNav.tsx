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
            className="sticky top-0 z-10 flex shrink-0 gap-1 self-start overflow-x-auto border-b border-border bg-muted/40 p-2 md:sticky md:top-0 md:h-full md:flex-col md:self-stretch md:overflow-y-auto md:border-r md:border-b-0"
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
                            'flex shrink-0 items-center gap-2 rounded-md px-2.5 py-2 text-left text-sm transition-colors md:w-full',
                            isActive
                                ? 'bg-background font-medium text-primary shadow-sm ring-1 ring-border'
                                : isReachable
                                  ? 'text-muted-foreground hover:bg-background/80 hover:text-foreground'
                                  : 'pointer-events-none text-muted-foreground/50',
                        )}
                        aria-current={isActive ? 'step' : undefined}
                    >
                        <span
                            className={cn(
                                'flex size-6 shrink-0 items-center justify-center rounded-full border text-xs font-semibold',
                                isActive || isCompleted
                                    ? 'border-primary bg-primary text-primary-foreground'
                                    : 'border-border bg-card text-muted-foreground',
                            )}
                        >
                            {index + 1}
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
