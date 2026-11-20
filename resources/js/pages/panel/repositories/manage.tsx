import { Head } from '@inertiajs/react';
import {
    RepositoryManageContainer,
    type EligibleAdvisorOption,
    type Repository,
} from '@/features/repositories';

type PageProps = {
    repository: Repository;
    eligibleAdvisors?: EligibleAdvisorOption[];
};

const RepositoriesManagePage = ({
    repository,
    eligibleAdvisors = [],
}: PageProps) => {
    return (
        <>
            <Head title={`Gestionar · ${repository.title}`} />
            <RepositoryManageContainer
                repository={repository}
                eligibleAdvisors={eligibleAdvisors}
            />
        </>
    );
};

export default RepositoriesManagePage;
