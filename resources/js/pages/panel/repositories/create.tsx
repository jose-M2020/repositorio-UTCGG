import { Head } from '@inertiajs/react';
import {
  RepositoryCreateContainer,
  type RepositoryLookups,
} from '@/features/repositories';

type PageProps = {
  lookups: RepositoryLookups;
};

const RepositoriesCreatePage = ({ lookups }: PageProps) => {
  return (
    <>
      <Head title="Nuevo repositorio" />
      <RepositoryCreateContainer lookups={lookups} />
    </>
  );
};

export default RepositoriesCreatePage;
