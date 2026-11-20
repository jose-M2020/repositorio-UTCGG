import { Head } from "@inertiajs/react";
import {
    ProjectPeriodsIndexContainer,
    type PaginatedProjectPeriods,
    type ProjectTypeOption,
} from "@/features/project-periods";

type PageProps = {
    periods: PaginatedProjectPeriods;
    projectTypes: ProjectTypeOption[];
    defaultAdvisorCapacity: number;
};

const ProjectPeriodsIndexPage = ({
    periods,
    projectTypes,
    defaultAdvisorCapacity,
}: PageProps) => {
    return (
        <>
            <Head title="Periodos de proyecto" />
            <ProjectPeriodsIndexContainer
                periods={periods}
                projectTypes={projectTypes}
                defaultAdvisorCapacity={defaultAdvisorCapacity}
            />
        </>
    );
};

export default ProjectPeriodsIndexPage;
