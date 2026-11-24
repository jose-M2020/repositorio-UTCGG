import { Head } from '@inertiajs/react';
import {
  RepositoriesIndexContainer,
  type PaginatedRepositories,
  type RepositoryFilters,
  type RepositoryLookups,
} from '@/features/repositories';

type PageProps = {
  repositories: PaginatedRepositories;
  filters: RepositoryFilters;
  lookups: RepositoryLookups;
};

const RepositoriesIndexPage = ({
  repositories,
  filters,
  lookups,
}: PageProps) => {
  return (
    <>
      <Head title="Repositorios" />
      <RepositoriesIndexContainer
        repositories={repositories}
        filters={filters}
        lookups={lookups}
      />
    </>
  );
};

export default RepositoriesIndexPage;
