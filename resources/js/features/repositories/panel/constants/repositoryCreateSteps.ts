export const REPOSITORY_CREATE_STEPS = [
    { id: 'repository', label: 'Informacion' },
    { id: 'project', label: 'Proyecto' },
    { id: 'collaborators', label: 'Colaboradores' },
    { id: 'settings', label: 'Configuración' },
] as const;

export type RepositoryCreateStepId =
    (typeof REPOSITORY_CREATE_STEPS)[number]['id'];

export const getStepIndex = (stepId: RepositoryCreateStepId): number =>
    REPOSITORY_CREATE_STEPS.findIndex((step) => step.id === stepId);

export const getStepByIndex = (index: number) =>
    REPOSITORY_CREATE_STEPS[index] ?? REPOSITORY_CREATE_STEPS[0];
