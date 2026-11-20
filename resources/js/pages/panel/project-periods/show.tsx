import { Head } from "@inertiajs/react";
import {
    ProjectPeriodShowContainer,
    type CareerOption,
    type EligibleAdvisor,
    type PeriodCapacity,
    type PeriodCoverage,
    type PeriodParticipant,
    type ProjectPeriodItem,
} from "@/features/project-periods";

type PageProps = {
    period: ProjectPeriodItem;
    participants: PeriodParticipant[];
    capacities: PeriodCapacity[];
    eligibleAdvisors: EligibleAdvisor[];
    coverage: PeriodCoverage;
    careers: CareerOption[];
    defaultAdvisorCapacity: number;
};

const ProjectPeriodShowPage = (props: PageProps) => {
    return (
        <>
            <Head title={`Periodo · ${props.period.name}`} />
            <ProjectPeriodShowContainer {...props} />
        </>
    );
};

export default ProjectPeriodShowPage;
