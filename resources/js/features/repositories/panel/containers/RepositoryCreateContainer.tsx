import { Form, Link, usePage } from '@inertiajs/react';
import { useState } from 'react';
import {
    index,
    store,
} from '@/actions/App/Http/Controllers/RepositoryController';
import { type SearchableUser } from '@/shared/components';
import { Button } from '@/shared/components/ui';
import type { RepositoryLookups } from '../../shared/types';
import { RepositoryCreateStepMembers } from '../components/RepositoryCreateStepMembers';
import { RepositoryCreateStepNav } from '../components/RepositoryCreateStepNav';
import { RepositoryCreateStepProject } from '../components/RepositoryCreateStepProject';
import { RepositoryCreateStepRepository } from '../components/RepositoryCreateStepRepository';
import { RepositoryCreateStepSettings } from '../components/RepositoryCreateStepSettings';
import {
    REPOSITORY_CREATE_STEPS,
    type RepositoryCreateStepId,
    getStepByIndex,
    getStepIndex,
} from '../constants/repositoryCreateSteps';

type RepositoryCreateContainerProps = {
    lookups: RepositoryLookups;
};

export const RepositoryCreateContainer = ({
    lookups,
}: RepositoryCreateContainerProps) => {
    const { auth } = usePage().props;
    const currentUser = auth.user;
    const [step, setStep] = useState<RepositoryCreateStepId>('repository');
    const stepIndex = getStepIndex(step);
    const isFirstStep = stepIndex === 0;
    const isLastStep = stepIndex === REPOSITORY_CREATE_STEPS.length - 1;
    const [collaborators, setCollaborators] = useState<SearchableUser[]>(
        currentUser
            ? [
                  {
                      id: currentUser.id,
                      first_name: currentUser.first_name,
                      last_name: currentUser.last_name,
                      second_last_name: currentUser.second_last_name,
                      email: currentUser.email,
                  },
              ]
            : [],
    );

    const handleNext = () => {
        const nextStep = getStepByIndex(stepIndex + 1);
        setStep(nextStep.id);
    };

    const handlePrevious = () => {
        const previousStep = getStepByIndex(stepIndex - 1);
        setStep(previousStep.id);
    };

    const handleStepSelect = (stepId: RepositoryCreateStepId) => {
        if (getStepIndex(stepId) <= stepIndex) {
            setStep(stepId);
        }
    };

    return (
        <main className="page-container space-y-6 py-8">
            <header>
                <h1 className="text-2xl font-semibold tracking-tight text-foreground">
                    Crear nuevo repositorio
                </h1>
                <p className="mt-1 text-sm text-muted-foreground">
                    Completa los pasos para registrar tu proyecto.
                </p>
            </header>

            <Form
                {...store.form()}
                className="overflow-hidden rounded-xl border border-border bg-card shadow-sm"
            >
                {({ errors, processing }) => (
                    <div className="grid md:grid-cols-[14rem_1fr]">
                        <RepositoryCreateStepNav
                            currentStep={step}
                            onStepSelect={handleStepSelect}
                        />

                        <div className="flex min-w-0 flex-col">
                            <div className="flex-1 space-y-6 p-6">
                                <RepositoryCreateStepRepository
                                    errors={errors}
                                    isActive={step === 'repository'}
                                />
                                <RepositoryCreateStepProject
                                    errors={errors}
                                    isActive={step === 'project'}
                                    lookups={lookups}
                                    defaultCareer={
                                        currentUser?.career ?? undefined
                                    }
                                />
                                <RepositoryCreateStepMembers
                                    errors={errors}
                                    isActive={step === 'members'}
                                    collaborators={collaborators}
                                    onCollaboratorsChange={setCollaborators}
                                />
                                <RepositoryCreateStepSettings
                                    errors={errors}
                                    isActive={step === 'settings'}
                                />
                            </div>

                            <div className="flex flex-wrap items-center justify-end gap-2 border-t border-border bg-muted/20 px-6 py-4">
                                {isFirstStep ? (
                                    <Link href={index.url()}>
                                        <Button type="button" variant="outline">
                                            Cancelar
                                        </Button>
                                    </Link>
                                ) : (
                                    <Button
                                        type="button"
                                        variant="outline"
                                        onClick={handlePrevious}
                                    >
                                        Anterior
                                    </Button>
                                )}

                                {!isLastStep ? (
                                    <Button type="button" onClick={handleNext}>
                                        Siguiente
                                    </Button>
                                ) : (
                                    <Button type="submit" disabled={processing}>
                                        {processing
                                            ? 'Guardando...'
                                            : 'Crear'}
                                    </Button>
                                )}
                            </div>
                        </div>
                    </div>
                )}
            </Form>
        </main>
    );
};
