import { usePage } from '@inertiajs/react';
import type {
    EligibleAdvisorOption,
    Repository,
} from '../../shared/types';
import { RepositoryAdvisorSection } from '../components/detail/RepositoryAdvisorSection';
import { RepositoryDetails } from '../components/detail/RepositoryDetails';

type RepositoryManageContainerProps = {
    repository: Repository;
    eligibleAdvisors?: EligibleAdvisorOption[];
};

export const RepositoryManageContainer = ({
    repository,
    eligibleAdvisors = [],
}: RepositoryManageContainerProps) => {
    const { flash } = usePage().props;

    return (
        <main className="page-container space-y-6 py-8">
            <header>
                <h1 className="text-2xl font-semibold text-primary">
                    Gestionar repositorio
                </h1>
                <p className="text-sm text-muted-foreground">
                    {repository.title}
                </p>
            </header>

            {flash.status ? (
                <p className="rounded-lg border border-primary/20 bg-accent px-3 py-2 text-sm text-accent-foreground">
                    {flash.status}
                </p>
            ) : null}

            <RepositoryAdvisorSection
                repository={repository}
                eligibleAdvisors={eligibleAdvisors}
            />

            <RepositoryDetails repository={repository} />
        </main>
    );
};
