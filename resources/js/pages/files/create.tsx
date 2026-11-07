import { Head } from '@inertiajs/react';
import {
    FileUploadContainer,
    type RepositoryUploadTarget,
} from '@/features/files';

type PageProps = {
    repositorio: RepositoryUploadTarget;
};

const FilesCreatePage = ({ repositorio }: PageProps) => {
    return (
        <>
            <Head title="Subir archivos" />
            <FileUploadContainer repositorio={repositorio} />
        </>
    );
};

export default FilesCreatePage;
