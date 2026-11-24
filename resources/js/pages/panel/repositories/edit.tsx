import { Head } from '@inertiajs/react';
import {
  RepositoryEditContainer,
  type Repository,
  type RepositoryLookups,
} from '@/features/repositories';

type PageProps = {
  repository: Repository;
  lookups: RepositoryLookups;
};

const RepositoriesEditPage = ({ repository, lookups }: PageProps) => {
  return (
    <>
      <Head title="Editar repositorio" />
      <RepositoryEditContainer repository={repository} lookups={lookups} />
    </>
  );
};

export default RepositoriesEditPage;
