import { usePage } from '@inertiajs/react';
import { AUTH_ABILITIES } from '@/features/auth';
import type {
    EligibleAdvisorOption,
    Repository,
} from '../../shared/types';
import { RepositoryAdvisorSection } from '../components/detail/RepositoryAdvisorSection';
import { RepositoryBusinessAdvisorSection } from '../components/detail/RepositoryBusinessAdvisorSection';
import { RepositoryDetails } from '../components/detail/RepositoryDetails';

type RepositoryManageContainerProps = {
    repository: Repository;
    eligibleAdvisors?: EligibleAdvisorOption[];
};

export const RepositoryManageContainer = ({
    repository,
    eligibleAdvisors = [],
}: RepositoryManageContainerProps) => {
    const { flash, auth } = usePage().props;
    const canManageAdvisors =
        auth.abilities[AUTH_ABILITIES.ADVISORS_ASSIGN] ||
        auth.abilities[AUTH_ABILITIES.BUSINESS_ADVISORS_ATTACH];
    const showAdvisorsBlock =
        canManageAdvisors ||
        repository.requires_academic_advisor ||
        repository.requires_business_advisor ||
        Boolean(repository.active_advisor) ||
        Boolean(repository.business_advisor);

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

            {showAdvisorsBlock ? (
                <div className="space-y-4">
                    <div>
                        <h2 className="text-xl font-semibold tracking-tight">
                            Asesores
                        </h2>
                        <p className="text-sm text-muted-foreground">
                            Academico (docente) y empresarial se gestionan por
                            separado. Busca en el catalogo antes de registrar uno
                            nuevo.
                        </p>
                    </div>

                    <div className="space-y-4">
                        <RepositoryAdvisorSection
                            repository={repository}
                            eligibleAdvisors={eligibleAdvisors}
                        />
                        <RepositoryBusinessAdvisorSection
                            repository={repository}
                        />
                    </div>
                </div>
            ) : null}

            <RepositoryDetails repository={repository} />
        </main>
    );
};
