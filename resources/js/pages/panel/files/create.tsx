import { Head } from '@inertiajs/react';
import {
    FileUploadContainer,
    type RepositoryUploadTarget,
} from '@/features/files';

type PageProps = {
    repository: RepositoryUploadTarget;
};

const FilesCreatePage = ({ repositorio }: PageProps) => {
    return (
        <>
            <Head title="Subir archivos" />
            <FileUploadContainer repositorio={repository} />
        </>
    );
};

export default FilesCreatePage;
