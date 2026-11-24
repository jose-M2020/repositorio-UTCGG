import { Head } from '@inertiajs/react';
import {
  FileUploadContainer,
  type RepositoryUploadTarget,
} from '@/features/files';

type PageProps = {
  repository: RepositoryUploadTarget;
};

const FilesCreatePage = ({ repository }: PageProps) => {
  return (
    <>
      <Head title="Subir archivos" />
      <FileUploadContainer repository={repository} />
    </>
  );
};

export default FilesCreatePage;
