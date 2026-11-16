import { Head } from '@inertiajs/react';
import {
    ProjectTypesIndexContainer,
    type PaginatedProjectTypes,
} from '@/features/project-types';

type ProjectTypesIndexPageProps = {
    projectTypes: PaginatedProjectTypes;
};

const ProjectTypesIndexPage = ({ projectTypes }: ProjectTypesIndexPageProps) => {
    return (
        <>
            <Head title="Tipos de proyecto" />
            <ProjectTypesIndexContainer projectTypes={projectTypes} />
        </>
    );
};

export default ProjectTypesIndexPage;